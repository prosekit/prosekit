type StaticShortcutMap = Record<string, string>
type DynamicShortcut = [RegExp, (match: RegExpMatchArray) => string]

export declare const shortcuts: Array<StaticShortcutMap | DynamicShortcut>

export declare function replaceShortcuts(code: string): string
