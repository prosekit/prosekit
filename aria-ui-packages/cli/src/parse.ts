import {
  type InterfaceDeclaration,
  Project,
  type SourceFile,
  SyntaxKind,
} from 'ts-morph'

/**
 * Information about a component prop or event
 */
export interface PropInfo {
  /** The name of the prop/event */
  name: string
  /** JSDoc comment describing the prop/event */
  comment: string
}

/**
 * Information about a component event
 */
export interface EventInfo {
  /** The name of the event */
  name: string
  /** JSDoc comment describing the event */
  comment: string
}

/**
 * Information about a component
 */
export interface ComponentInfo {
  /** The component name (e.g., "PopoverRoot") */
  name: string
  /** Absolute path to the source file where this component is defined */
  sourceFilePath: string
  /** Array of props with name and JSDoc comment */
  props: PropInfo[]
  /** Array of events with name and JSDoc comment */
  events: EventInfo[]
}

/**
 * Parse a TypeScript exports file to extract component information
 * @param tsconfigFilePath Path to tsconfig.json
 * @param entryFilePath Path to the exports.ts file
 * @returns Array of component information including props and events
 */
export function parse(
  tsconfigFilePath: string,
  entryFilePath: string,
): ComponentInfo[] {
  const project = new Project({
    tsConfigFilePath: tsconfigFilePath,
  })

  const sourceFile = project.getSourceFileOrThrow(entryFilePath)

  // 1. Extract component names from setupXXX exports
  const componentNames = extractComponentNames(sourceFile)

  // 2. For each component, extract props, events, and source file path
  const components = componentNames.map((name) => {
    const sourceFilePath = getComponentSourceFilePath(sourceFile, name)
    return {
      name,
      sourceFilePath,
      props: extractProps(sourceFile, name),
      events: extractEvents(sourceFile, name),
    }
  })

  return components
}

/**
 * Extract component names by finding setupXXX function exports
 */
function extractComponentNames(sourceFile: SourceFile): string[] {
  const exportDeclarations = sourceFile.getExportDeclarations()
  const names: string[] = []

  for (const exportDecl of exportDeclarations) {
    const namedExports = exportDecl.getNamedExports()
    for (const namedExport of namedExports) {
      const name = namedExport.getName()
      if (name.startsWith('setup')) {
        // Extract component name: setupPopoverRoot -> PopoverRoot
        const componentName = name.slice('setup'.length)
        names.push(componentName)
      }
    }
  }

  return names
}

/**
 * Get the source file path for a component by finding its setupXXX export
 */
function getComponentSourceFilePath(
  sourceFile: SourceFile,
  componentName: string,
): string {
  const setupFunctionName = `setup${componentName}`

  // Find the export declaration that exports the setup function
  const exportDecl = sourceFile.getExportDeclarations().find((exp) => {
    return exp.getNamedExports().some((named) => {
      return named.getName() === setupFunctionName
    })
  })

  if (!exportDecl) {
    throw new Error(`Setup function not found for component: ${componentName}`)
  }

  // Get the source file where this setup function is defined
  const referencedFile = exportDecl.getModuleSpecifierSourceFileOrThrow()
  return referencedFile.getFilePath()
}

/**
 * Extract props for a component by finding the XXXProps interface
 */
function extractProps(
  sourceFile: SourceFile,
  componentName: string,
): PropInfo[] {
  const propsInterfaceName = `${componentName}Props`

  // Find the export declaration that exports this interface
  const exportDecl = sourceFile.getExportDeclarations().find((exp) => {
    return exp.getNamedExports().some((named) => {
      const exportName = named.getName()
      return exportName === propsInterfaceName
    })
  })

  // Props interface is optional - not all components have props
  if (!exportDecl) return []

  // Once the interface is exported, all following steps are required
  const referencedFile = exportDecl.getModuleSpecifierSourceFileOrThrow()
  const interfaceDecl = referencedFile.getInterfaceOrThrow(propsInterfaceName)

  return extractPropertiesFromInterface(interfaceDecl)
}

/**
 * Extract events for a component by finding the XXXEvents interface
 */
function extractEvents(
  sourceFile: SourceFile,
  componentName: string,
): EventInfo[] {
  const eventsInterfaceName = `${componentName}Events`

  // Find the export declaration that exports this interface
  const exportDecl = sourceFile.getExportDeclarations().find((exp) => {
    return exp.getNamedExports().some((named) => {
      const exportName = named.getName()
      return exportName === eventsInterfaceName
    })
  })

  // Events interface is optional - not all components have events
  if (!exportDecl) return []

  // Once the interface is exported, all following steps are required
  const referencedFile = exportDecl.getModuleSpecifierSourceFileOrThrow()
  const interfaceDecl = referencedFile.getInterfaceOrThrow(eventsInterfaceName)

  return extractPropertiesFromInterface(interfaceDecl)
}

/**
 * Extract properties from an interface declaration
 * This handles extends, Omit, and other TypeScript type manipulations
 * by using the TypeScript compiler's type resolution
 */
function extractPropertiesFromInterface(
  interfaceDecl: InterfaceDeclaration,
): PropInfo[] {
  const props: PropInfo[] = []

  // Get the type and all its properties (including those from extends/Omit/etc)
  const type = interfaceDecl.getType()
  const properties = type.getProperties()

  for (const property of properties) {
    const declarations = property.getDeclarations()

    // Properties should have declarations; if not, something is wrong
    if (declarations.length === 0) {
      throw new Error(
        `Property "${property.getName()}" in interface "${interfaceDecl.getName()}" has no declarations`,
      )
    }

    if (declarations.length > 1) {
      throw new Error(
        `Property "${property.getName()}" in interface "${interfaceDecl.getName()}" has multiple declarations`,
      )
    }

    const decl = declarations[0]

    const propSignature = decl.asKindOrThrow(SyntaxKind.PropertySignature)
    const name = property.getName()

    // Extract JSDoc comment
    const jsDocComments = propSignature.getJsDocs()
    const comment = jsDocComments
      .map((jsDocComment) => jsDocComment.getInnerText())
      .join('\n')

    props.push({ name, comment })
  }

  return props
}
