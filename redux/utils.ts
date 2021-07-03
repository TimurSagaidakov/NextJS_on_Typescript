type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never;

export type TInferActions<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
