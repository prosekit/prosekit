import { FileSystem, Path } from '@effect/platform'
import type { PlatformError } from '@effect/platform/Error'
import { Effect } from 'effect'
import prettier from 'prettier'
import { IndentationText, Project, VariableDeclarationKind, type SourceFile } from 'ts-morph'

import type { ComponentInfo } from './parse'

export interface GenerateOptions {
  prefix: string
  importSource: string
}

type ComponentMeta = {
  componentName: string
  kebabName: string
  tagName: string
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
  importSource: string
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
  options: GenerateOptions,
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
      yield* writeSourceFile(reactPath, (sourceFile) => generateReactComponentFile(sourceFile, component, options))

      const preactPath = path.join(outputDirs.preact, fileName)
      yield* writeSourceFile(preactPath, (sourceFile) => generatePreactComponentFile(sourceFile, component, options))

      const solidPath = path.join(outputDirs.solid, fileName)
      yield* writeSourceFile(solidPath, (sourceFile) => generateSolidComponentFile(sourceFile, component, options))

      const vuePath = path.join(outputDirs.vue, fileName)
      yield* writeSourceFile(vuePath, (sourceFile) => generateVueComponentFile(sourceFile, component, options))

      const sveltePath = path.join(outputDirs.svelte, fileName)
      yield* writeSourceFile(sveltePath, (sourceFile) => generateSvelteComponentFile(sourceFile, component, options))

      const svelteFileName = getSvelteComponentFileName(component)
      const svelteComponentPath = path.join(outputDirs.svelte, svelteFileName)
      const svelteContents = generateSvelteComponentSvelteFile(component, options)
      yield* writeTextFile(svelteComponentPath, svelteContents)
    }
  })
}

function generateReactComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  options: GenerateOptions,
): void {
  const {
    componentName,
    tagName,
    hasEvents,
    hasProps,
    props,
    eventHandlers,
  } = getComponentMeta(component, options.prefix)

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@aria-ui-v2/integrations/react',
    namedImports: ['ReactWrapper'],
  })

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'react',
    namedImports: [
      'createElement',
      'forwardRef',
      { name: 'ForwardedRef', isTypeOnly: true },
      { name: 'ForwardRefExoticComponent', isTypeOnly: true },
      { name: 'HTMLAttributes', isTypeOnly: true },
      { name: 'ReactElement', isTypeOnly: true },
      { name: 'RefAttributes', isTypeOnly: true },
    ],
  })

  const { propsTypeName, eventsTypeName } = addSourceFileImports({
    sourceFile,
    component,
    importSource: options.importSource,
    order: 'props-first',
    includeRegister: true,
    includeElementType: true,
  })

  addPropsInterface({
    sourceFile,
    component,
    name: `${componentName}Props`,
    docs: [`Props for the {@link ${componentName}} React component.\n\n@public`],
    extendsTypes: [`HTMLAttributes<${componentName}Element>`],
    propsTypeName: hasProps ? propsTypeName : undefined,
    eventsTypeName: hasEvents ? eventsTypeName : undefined,
  })

  const propNames = props.map((prop) => `'${prop.name}'`)
  const eventNameMap = eventHandlers.map(
    (handler) => `${handler.handlerName}: '${handler.eventName}'`,
  )

  addPropNamesVariable(sourceFile, formatArrayInitializer(propNames))
  addEventNameMapVariable(
    sourceFile,
    formatObjectInitializer(eventNameMap),
  )

  sourceFile.addFunction({
    name: `${componentName}Component`,
    parameters: [
      { name: 'props', type: `${componentName}Props` },
      { name: 'forwardedRef', type: `ForwardedRef<${componentName}Element>` },
    ],
    returnType: 'ReactElement',
    statements: [
      `register${componentName}Element();`,
      `return createElement(ReactWrapper, { as: '${tagName}', propNames, eventNameMap, props, forwardedRef });`,
    ],
  })

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    docs: [`A React component that renders an \`${tagName}\` custom element.\n\n@public`],
    declarations: [
      {
        name: componentName,
        type: `ForwardRefExoticComponent<${componentName}Props & RefAttributes<${componentName}Element>>`,
        initializer: `/* @__PURE__ */ forwardRef(${componentName}Component)`,
      },
    ],
  })
}

function generatePreactComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  options: GenerateOptions,
): void {
  const {
    componentName,
    tagName,
    hasEvents,
    hasProps,
    props,
    eventHandlers,
  } = getComponentMeta(component, options.prefix)

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@aria-ui-v2/integrations/preact',
    namedImports: ['PreactWrapper'],
  })

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'preact',
    namedImports: [
      'createElement',
      { name: 'HTMLAttributes', isTypeOnly: true },
      { name: 'Ref', isTypeOnly: true },
      { name: 'VNode', isTypeOnly: true },
    ],
  })

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'preact/compat',
    namedImports: [
      'forwardRef',
      { name: 'ForwardRefExoticComponent', isTypeOnly: true },
      { name: 'RefAttributes', isTypeOnly: true },
    ],
  })

  const { propsTypeName, eventsTypeName } = addSourceFileImports({
    sourceFile,
    component,
    importSource: options.importSource,
    order: 'props-first',
    includeRegister: true,
    includeElementType: true,
  })

  addPropsInterface({
    sourceFile,
    component,
    name: `${componentName}Props`,
    docs: [`Props for the {@link ${componentName}} Preact component.\n\n@public`],
    extendsTypes: [`HTMLAttributes<${componentName}Element>`],
    propsTypeName: hasProps ? propsTypeName : undefined,
    eventsTypeName: hasEvents ? eventsTypeName : undefined,
  })

  const propNames = props.map((prop) => `'${prop.name}'`)
  const eventNameMap = eventHandlers.map(
    (handler) => `${handler.handlerName}: '${handler.eventName}'`,
  )

  addPropNamesVariable(sourceFile, formatArrayInitializer(propNames))
  addEventNameMapVariable(
    sourceFile,
    formatObjectInitializer(eventNameMap),
  )

  sourceFile.addFunction({
    name: `${componentName}Component`,
    parameters: [
      { name: 'props', type: `${componentName}Props` },
      { name: 'forwardedRef', type: `Ref<${componentName}Element>` },
    ],
    returnType: 'VNode<any>',
    statements: [
      `register${componentName}Element();`,
      `return createElement(PreactWrapper, { as: '${tagName}', propNames, eventNameMap, props, forwardedRef });`,
    ],
  })

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    docs: [`A Preact component that renders an \`${tagName}\` custom element.\n\n@public`],
    declarations: [
      {
        name: componentName,
        type: `ForwardRefExoticComponent<${componentName}Props & RefAttributes<${componentName}Element>>`,
        initializer: `/* @__PURE__ */ forwardRef(${componentName}Component)`,
      },
    ],
  })
}

function generateSolidComponentFile(
  sourceFile: SourceFile,
  component: ComponentInfo,
  options: GenerateOptions,
): void {
  const {
    componentName,
    tagName,
    hasEvents,
    hasProps,
    props,
    eventHandlers,
  } = getComponentMeta(component, options.prefix)

  const { propsTypeName, eventsTypeName } = addSourceFileImports({
    sourceFile,
    component,
    importSource: options.importSource,
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
  '${tagName}',
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
  options: GenerateOptions,
): void {
  const {
    componentName,
    tagName,
    hasEvents,
    hasProps,
    props,
    eventHandlers,
  } = getComponentMeta(component, options.prefix)

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
    importSource: options.importSource,
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
      '${tagName}',
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
  options: GenerateOptions,
): void {
  const { componentName, kebabName, hasEvents, hasProps } = getComponentMeta(component, options.prefix)

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${kebabName}.gen.svelte`,
    defaultImport: `${componentName}Component`,
  })

  const { propsTypeName, eventsTypeName } = addSourceFileImports({
    sourceFile,
    component,
    importSource: options.importSource,
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

function generateSvelteComponentSvelteFile(component: ComponentInfo, options: GenerateOptions): string {
  const { componentName, tagName, eventHandlers } = getComponentMeta(component, options.prefix)

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
  const openingTag = `<${tagName} {..._restProps}${eventAttributes ? ` ${eventAttributes}` : ''}`

  return `<script lang="js">
  import { register${componentName}Element } from '${options.importSource}'
  register${componentName}Element()

${destructureProps}
</script>

${openingTag}>{@render children?.()}</${tagName}>
`
}

function getComponentMeta(component: ComponentInfo, prefix: string): ComponentMeta {
  const componentName = component.name
  const kebabName = toKebabCase(componentName)
  return {
    componentName,
    kebabName,
    tagName: `${prefix}-${kebabName}`,
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
    importSource,
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
      moduleSpecifier: importSource,
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

function addEventNameMapVariable(
  sourceFile: SourceFile,
  initializer: string,
): void {
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'eventNameMap',
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
