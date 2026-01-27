interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const ClientUpdate: $$__sveltets_2_IsomorphicComponent<any, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {}, string>;
type ClientUpdate = InstanceType<typeof ClientUpdate>;
export default ClientUpdate;
//# sourceMappingURL=client-update.svelte.d.ts.map