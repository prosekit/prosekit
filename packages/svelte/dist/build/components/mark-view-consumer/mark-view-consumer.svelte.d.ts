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
declare const MarkViewConsumer: $$__sveltets_2_IsomorphicComponent<any, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {}, string>;
type MarkViewConsumer = InstanceType<typeof MarkViewConsumer>;
export default MarkViewConsumer;
//# sourceMappingURL=mark-view-consumer.svelte.d.ts.map