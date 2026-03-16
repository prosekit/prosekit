import { FileSystem, Path } from '@effect/platform'
import type { PlatformError } from '@effect/platform/Error'
import { Effect } from 'effect'
import prettier from 'prettier'
import { IndentationText, Project, VariableDeclarationKind, type SourceFile } from 'ts-morph'

import type { ComponentInfo } from './parse'

type ComponentMeta = {
  componentName: string
  kebabName: string
  props: ComponentInfo['props']
  events: ComponentInfo['events']
  hasProps: boolean
  hasEvents: boolean
  eventHandlers: Array<{
    eventName: string
    handlerName: string
  }>
}

type PropsInterfaceOptions = {
  sourceFile: SourceFile
  component: ComponentInfo
  name: string
  docs: string[]
  extendsTypes?: string[]
  propsTypeName?: string
  eventsTypeName?: string
  includeChildren?: boolean
}

type ElementTypeImportOrder = 'props-first' | 'events-first'

type SourceImportOptions = {
  sourceFile: SourceFile
  component: ComponentInfo
  relativePathToSource: string
  order: ElementTypeImportOrder
  includeRegister: boolean
  includeElementType: boolean
}

function formatWithPrettier(filePath: string, contents: string) {
  return Effect.promise(async () => {
    const options = (await prettier.resolveConfig(filePath)) ?? {}
    return await prettier.format(contents, {
      ...options,
      filepath: filePath,
    })
  })
}

export function generateFiles(
  components: ComponentInfo[],
  outputDir: string,
): Effect.Effect<void, PlatformError, Path.Path | FileSystem.FileSystem> {
  return Effect.gen(function*() {
    const path = yield* Path.Path
    const fs = yield* FileSystem.FileSystem

    const outputDirs = {
      react: path.join(outputDir, 'react'),
      preact: path.join(outputDir, 'preact'),
      solid: path.join(outputDir, 'solid'),
      vue: path.join(outputDir, 'vue'),
      svelte: path.join(outputDir, 'svelte'),
    }

    for (const dir of Object.values(outputDirs)) {
      yield* fs.makeDirectory(dir, { recursive: true })
    }

    const project = new Project({
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces,
        useTrailingCommas: true,
      },
    })

    const writeFormattedFile = (filePath: string, contents: string) =>
      Effect.gen(function*() {
        const finalContents = filePath.endsWith('.ts')
          ? yield* formatWithPrettier(filePath, contents)
          : contents
        yield* fs.writeFileString(filePath, finalContents)
        yield* Effect.log(`Generated ${filePath}`)
      })

    const writeSourceFile = (
      filePath: string,
      generate: (sourceFile: SourceFile) => void,
    ) =>
      Effect.gen(function*() {
        const sourceFile = project.createSourceFile(filePath, '', {
          overwrite: true,
        })
        generate(sourceFile)
        yield* writeFormattedFile(filePath, sourceFile.getFullText())
      })

    const writeTextFile = (filePath: string, contents: string) => writeFormattedFile(filePath, contents)

    for (const component of components) {
      const fileName = getComponentFileName(component)

      const reactPath = path.join(outputDirs.react, fileName)
      yield* writeSourceFile(reactPath, (sourceFile) => generateReactComponentFile(sourceFile, component, project))

      const preactPath = path.join(outputDirs.preact, fileName)
      yield* writeSourceFile(preactPath, (sourceFile) => generatePreactComponentFile(sourceFile, component, project))

      const solidPath = path.join(outputDirs.solid, fileName)
      yield* writeSourceFile(solidPath, (sourceFile) => generateSolidComponentFile(sourceFile, component, project))

      const vuePath = path.join(outputDirs.vue, fileName)
      yield* writeSourceFile(vuePath, (sourceFile) => generateVueComponentFile(sourceFile, component, project))

      const sveltePath = path.join(outputDirs.svelte, fileName)
      yield* writeSourceFile(sveltePath, (sourceFile) => generateSvelteComponentFile(sourceFile, component, project))

      const svelteFileName = getSvelteComponentFileName(component)
      const svelteComponentPath = path.join(outputDirs.svelte, svelteFileName)
      const svelteContents = generateSvelteComponentSvelteFile(component, project, svelteComponentPath)
      yield* writeTextFile(svelteComponentPath, svelteContents)
    }
  })
}

function generateReactComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  project: Project,
): void {
  const {
    componentName,
    kebabName,
    hasEvents,
    hasProps,
    props,
    eventHandlers,
  } = getComponentMeta(component)
  const relativePathToSource = getRelativePathToSource(
    sourceFile,
    component,
    project,
  )

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@aria-ui-v2/integrations/react',
    namedImports: ['createComponent'],
  })

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'react',
    isTypeOnly: true,
    namedImports: [
      'ForwardRefExoticComponent',
      'HTMLAttributes',
      'RefAttributes',
    ],
  })

  const { propsTypeName, eventsTypeName } = addSourceFileImports({
    sourceFile,
    component,
    relativePathToSource,
    order: 'props-first',
    includeRegister: true,
    includeElementType: true,
  })

  addPropsInterface({
    sourceFile,
    component,
    name: `${componentName}Props`,
    docs: [`Props for the {@link ${componentName}} React component.`],
    extendsTypes: [`HTMLAttributes<${componentName}Element>`],
    propsTypeName: hasProps ? propsTypeName : undefined,
    eventsTypeName: hasEvents ? eventsTypeName : undefined,
  })

  const propNames = props.map((prop) => `'${prop.name}'`)
  const eventHandlersMap = eventHandlers.map(
    (handler) => `${handler.handlerName}: '${handler.eventName}'`,
  )

  addPropNamesVariable(sourceFile, formatArrayInitializer(propNames))
  addEventHandlersMapVariable(
    sourceFile,
    formatObjectInitializer(eventHandlersMap),
  )

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: componentName,
        type: `ForwardRefExoticComponent<${componentName}Props & RefAttributes<${componentName}Element>>`,
        initializer:
          `/* @__PURE__ */ createComponent('aria-ui-${kebabName}', '${componentName}', propNames, eventHandlersMap, register${componentName}Element)`,
      },
    ],
  })
}

function generatePreactComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  project: Project,
): void {
  const {
    componentName,
    kebabName,
    hasEvents,
    hasProps,
    props,
    eventHandlers,
  } = getComponentMeta(component)
  const relativePathToSource = getRelativePathToSource(
    sourceFile,
    component,
    project,
  )

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@aria-ui-v2/integrations/preact',
    namedImports: ['createComponent'],
  })

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'preact',
    isTypeOnly: true,
    namedImports: ['HTMLAttributes'],
  })

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'preact/compat',
    isTypeOnly: true,
    namedImports: ['ForwardRefExoticComponent', 'RefAttributes'],
  })

  const { propsTypeName, eventsTypeName } = addSourceFileImports({
    sourceFile,
    component,
    relativePathToSource,
    order: 'props-first',
    includeRegister: true,
    includeElementType: true,
  })

  addPropsInterface({
    sourceFile,
    component,
    name: `${componentName}Props`,
    docs: [`Props for the {@link ${componentName}} Preact component.`],
    extendsTypes: [`HTMLAttributes<${componentName}Element>`],
    propsTypeName: hasProps ? propsTypeName : undefined,
    eventsTypeName: hasEvents ? eventsTypeName : undefined,
  })

  const propNames = props.map((prop) => `'${prop.name}'`)
  const eventHandlersMap = eventHandlers.map(
    (handler) => `${handler.handlerName}: '${handler.eventName}'`,
  )

  addPropNamesVariable(sourceFile, formatArrayInitializer(propNames))
  addEventHandlersMapVariable(
    sourceFile,
    formatObjectInitializer(eventHandlersMap),
  )

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: componentName,
        type: `ForwardRefExoticComponent<${componentName}Props & RefAttributes<${componentName}Element>>`,
        initializer:
          `/* @__PURE__ */ createComponent('aria-ui-${kebabName}', '${componentName}', propNames, eventHandlersMap, register${componentName}Element)`,
      },
    ],
  })
}

function generateSolidComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  project: Project,
): void {
  const {
    componentName,
    kebabName,
    hasEvents,
    hasProps,
    props,
    eventHandlers,
  } = getComponentMeta(component)
  const relativePathToSource = getRelativePathToSource(
    sourceFile,
    component,
    project,
  )

  const { propsTypeName, eventsTypeName } = addSourceFileImports({
    sourceFile,
    component,
    relativePathToSource,
    order: 'events-first',
    includeRegister: true,
    includeElementType: true,
  })

  const needsSplitProps = hasProps || hasEvents

  if (needsSplitProps) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: 'solid-js',
      namedImports: ['mergeProps', 'splitProps'],
    })
  }

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'solid-js',
    namedImports: ['Component', 'JSX'],
    isTypeOnly: true,
  })

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'solid-js/h',
    defaultImport: 'h',
  })

  addPropsInterface({
    sourceFile,
    component,
    name: `${componentName}Props`,
    docs: [`Props for the {@link ${componentName}} Solid component.`],
    extendsTypes: [`JSX.HTMLAttributes<${componentName}Element>`],
    propsTypeName: hasProps ? propsTypeName : undefined,
    eventsTypeName: hasEvents ? eventsTypeName : undefined,
  })

  const propNames = props.map((prop) => `'${prop.name}'`)
  const eventHandlerNames = eventHandlers.map(
    (handler) => `'${handler.handlerName}'`,
  )
  const splitPropsArgs = [
    ...(propNames.length > 0 ? [formatArrayInitializer(propNames)] : []),
    ...(eventHandlerNames.length > 0
      ? [formatArrayInitializer(eventHandlerNames)]
      : []),
  ]
  const splitPropsTargets = [
    ...(propNames.length > 0 ? ['elementProps'] : []),
    ...(eventHandlerNames.length > 0 ? ['eventHandlers'] : []),
    'restProps',
  ]
  const splitPropsStatement = splitPropsArgs.length > 0
    ? `const [ ${splitPropsTargets.join(', ')} ] = splitProps(props, ${splitPropsArgs.join(', ')})`
    : 'const restProps = props'
  const propEntries = props.map(
    (prop) => `"prop:${prop.name}": () => elementProps.${prop.name}`,
  )
  const eventEntries = eventHandlers.map(
    (handler) =>
      `"on:${handler.eventName}": (event: ${eventsTypeName}['${handler.eventName}']) => eventHandlers.${handler.handlerName}?.(event)`,
  )
  const elementPropsObject = formatObjectInitializer([
    ...propEntries,
    ...eventEntries,
  ])
  const mergedProps = propEntries.length > 0 || eventEntries.length > 0
    ? `mergeProps(restProps, ${elementPropsObject})`
    : 'restProps'

  const componentInitializer = `(props): any => {
register${componentName}Element()

${splitPropsStatement}

return h(
  'aria-ui-${kebabName}',
  ${mergedProps},
)
}`

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: componentName,
        type: `Component<${componentName}Props>`,
        initializer: componentInitializer,
      },
    ],
  })
}

function generateVueComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  project: Project,
): void {
  const {
    componentName,
    kebabName,
    hasEvents,
    hasProps,
    props,
    eventHandlers,
  } = getComponentMeta(component)
  const relativePathToSource = getRelativePathToSource(
    sourceFile,
    component,
    project,
  )

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'vue',
    namedImports: [
      'defineComponent',
      'h',
      { name: 'DefineSetupFnComponent', isTypeOnly: true },
      { name: 'HTMLAttributes', isTypeOnly: true },
    ],
  })

  const { propsTypeName, eventsTypeName } = addSourceFileImports({
    sourceFile,
    component,
    relativePathToSource,
    order: 'events-first',
    includeRegister: true,
    includeElementType: false,
  })

  addPropsInterface({
    sourceFile,
    component,
    name: `${componentName}Props`,
    docs: [`Props for the {@link ${componentName}} Vue component.`],
    propsTypeName: hasProps ? propsTypeName : undefined,
    eventsTypeName: hasEvents ? eventsTypeName : undefined,
  })

  const propNames = props.map((prop) => prop.name)
  const eventHandlerNames = eventHandlers.map((handler) => handler.handlerName)
  const destructureNames = [...propNames, ...eventHandlerNames]
  const componentProps = [
    ...propNames.map((propName) => `'${propName}'`),
    ...eventHandlerNames.map((handlerName) => `'${handlerName}'`),
  ]

  const componentPropsInitializer = formatArrayInitializer(componentProps)
  const destructureBlock = `const { ${[...destructureNames, '..._restProps'].join(', ')} } = _props;`
  const propsObjectEntries = [
    '..._restProps',
    ...propNames.map((propName) => `"${propName}.prop": ${propName}`),
    ...eventHandlers.map(
      (handler) => `"v-on:${handler.eventName}": ${handler.handlerName}`,
    ),
  ]
  const propsObjectBody = propsObjectEntries.join(', ')

  const componentInitializer = `defineComponent<${componentName}Props & HTMLAttributes>(
(_props, { slots: _slots }) => {
  register${componentName}Element()

  return () => {
    ${destructureBlock}
    return h(
      'aria-ui-${kebabName}',
      { ${propsObjectBody} },
      _slots.default?.(),
    )
  }
},
{
  props: ${componentPropsInitializer},
},
)`

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: componentName,
        type: `DefineSetupFnComponent<${componentName}Props & HTMLAttributes>`,
        initializer: componentInitializer,
      },
    ],
  })
}

function generateSvelteComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  project: Project,
): void {
  const { componentName, kebabName, hasEvents, hasProps } = getComponentMeta(component)

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${kebabName}.gen.svelte`,
    defaultImport: `${componentName}Component`,
  })

  const relativePathToSource = getRelativePathToSource(
    sourceFile,
    component,
    project,
  )

  const { propsTypeName, eventsTypeName } = addSourceFileImports({
    sourceFile,
    component,
    relativePathToSource,
    order: 'events-first',
    includeRegister: false,
    includeElementType: false,
  })

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'svelte',
    isTypeOnly: true,
    namedImports: ['Component', 'Snippet'],
  })

  addPropsInterface({
    sourceFile,
    component,
    name: `${componentName}Props`,
    docs: [`Props for the {@link ${componentName}} Svelte component.`],
    propsTypeName: hasProps ? propsTypeName : undefined,
    eventsTypeName: hasEvents ? eventsTypeName : undefined,
    includeChildren: true,
  })

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: componentName,
        type: `Component<${componentName}Props>`,
        initializer: `${componentName}Component`,
      },
    ],
  })
}

function generateSvelteComponentSvelteFile(component: ComponentInfo, project: Project, outputFilePath: string): string {
  const { componentName, kebabName, eventHandlers } = getComponentMeta(component)

  const svelteSourceFile = project.createSourceFile(outputFilePath, '', { overwrite: true })
  const relativePathToSource = getRelativePathToSource(svelteSourceFile, component, project)

  const destructureProps = eventHandlers.length > 0
    ? `  let { ${
      eventHandlers.map((handler) => `${handler.handlerName} = undefined`).join(', ')
    }, children = undefined, ..._restProps } = $props()`
    : '  let { children = undefined, ..._restProps } = $props()'
  const eventAttributes = eventHandlers
    .map(
      (handler) => `${toEventAttributeName(handler.eventName)}={${handler.handlerName}}`,
    )
    .join(' ')
  const openingTag = `<aria-ui-${kebabName} {..._restProps}${eventAttributes ? ` ${eventAttributes}` : ''}`

  return `<script lang="js">
  import { register${componentName}Element } from '${relativePathToSource}'
  register${componentName}Element()

${destructureProps}
</script>

${openingTag}>{@render children?.()}</aria-ui-${kebabName}>
`
}

function getRelativePathToSource(
  sourceFile: SourceFile,
  component: ComponentInfo,
  project: Project,
): string {
  const referencedSourceFile = project.addSourceFileAtPathIfExists(
    component.sourceFilePath,
  )

  if (!referencedSourceFile) {
    throw new Error(`Source file not found: ${component.sourceFilePath}`)
  }

  return sourceFile.getRelativePathAsModuleSpecifierTo(referencedSourceFile)
}

function getComponentMeta(component: ComponentInfo): ComponentMeta {
  const componentName = component.name
  return {
    componentName,
    kebabName: toKebabCase(componentName),
    props: component.props,
    events: component.events,
    hasProps: component.props.length > 0,
    hasEvents: component.events.length > 0,
    eventHandlers: component.events.map((event) => {
      const handlerName = toEventHandlerName(event.name)
      return {
        eventName: event.name,
        handlerName,
      }
    }),
  }
}

function addSourceFileImports(
  options: SourceImportOptions,
): { propsTypeName: string; eventsTypeName: string } {
  const {
    sourceFile,
    component,
    relativePathToSource,
    order,
    includeRegister,
    includeElementType,
  } = options
  const componentName = component.name
  const propsTypeName = `${componentName}ElementProps`
  const eventsTypeName = `${componentName}ElementEvents`

  const namedImports: Array<{ name: string; alias?: string; isTypeOnly?: boolean }> = []

  if (includeRegister) {
    namedImports.push({ name: `register${componentName}Element` })
  }

  if (includeElementType) {
    namedImports.push({ name: `${componentName}Element`, isTypeOnly: true })
  }

  const propsImport = component.props.length > 0
    ? { name: `${componentName}Props`, alias: propsTypeName, isTypeOnly: true }
    : null
  const eventsImport = component.events.length > 0
    ? { name: `${componentName}Events`, alias: eventsTypeName, isTypeOnly: true }
    : null

  if (order === 'props-first') {
    if (propsImport) namedImports.push(propsImport)
    if (eventsImport) namedImports.push(eventsImport)
  } else {
    if (eventsImport) namedImports.push(eventsImport)
    if (propsImport) namedImports.push(propsImport)
  }

  if (namedImports.length > 0) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: relativePathToSource,
      namedImports,
    })
  }

  return { propsTypeName, eventsTypeName }
}

function addPropsInterface(options: PropsInterfaceOptions): void {
  const {
    sourceFile,
    component,
    name,
    docs,
    extendsTypes,
    propsTypeName,
    eventsTypeName,
    includeChildren,
  } = options
  const propsInterface = sourceFile.addInterface({
    name,
    isExported: true,
    extends: extendsTypes,
    docs,
  })

  if (propsTypeName) {
    for (const prop of component.props) {
      propsInterface.addProperty({
        name: prop.name,
        type: `${propsTypeName}['${prop.name}']`,
        hasQuestionToken: true,
        docs: [prop.comment],
      })
    }
  }

  if (eventsTypeName) {
    for (const event of component.events) {
      const eventHandlerName = toEventHandlerName(event.name)
      propsInterface.addProperty({
        name: eventHandlerName,
        type: `(event: ${eventsTypeName}['${event.name}']) => void`,
        hasQuestionToken: true,
        docs: [event.comment],
      })
    }
  }

  if (includeChildren) {
    propsInterface.addProperty({
      name: 'children',
      type: 'Snippet',
      hasQuestionToken: true,
    })
  }
}

function addPropNamesVariable(
  sourceFile: SourceFile,
  initializer: string,
): void {
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'propNames',
        type: 'string[]',
        initializer,
      },
    ],
  })
}

function addEventHandlersMapVariable(
  sourceFile: SourceFile,
  initializer: string,
): void {
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'eventHandlersMap',
        type: 'Record<string, string>',
        initializer,
      },
    ],
  })
}

function formatArrayInitializer(values: string[]): string {
  return values.length > 0 ? `[${values.join(', ')}]` : '[]'
}

function formatObjectInitializer(values: string[]): string {
  return values.length > 0 ? `{${values.join(', ')}}` : '{}'
}

function getComponentFileName(component: ComponentInfo): string {
  return `${toKebabCase(component.name)}.gen.ts`
}

function getSvelteComponentFileName(component: ComponentInfo): string {
  return `${toKebabCase(component.name)}.gen.svelte`
}

function toEventHandlerName(eventName: string): string {
  return `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`
}

function toEventAttributeName(eventName: string): string {
  return `on${eventName}`
}

function toKebabCase(str: string): string {
  return str.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
