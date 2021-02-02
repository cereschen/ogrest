import { AxiosRequestConfig } from 'axios';
declare type Func = (...args: any[]) => any;
declare type NewFn<T extends Func, Pa extends unknown[] = Parameters<T>> = Pa[0] extends undefined ? (config?: AxiosRequestConfig) => ReturnType<T> : Pa[0] extends Record<any, any> ? (data: Pa[0], config?: AxiosRequestConfig) => ReturnType<T> : Pa[1] extends undefined ? (param: string, config?: AxiosRequestConfig) => ReturnType<T> : (data: Pa[0], param: string, config?: AxiosRequestConfig) => ReturnType<T>;
declare type Res<T extends Record<string, Func>> = {
    [K in keyof T]: NewFn<T[K]>;
};
export declare function wrap<T>(val: T): Res<InstanceType<T>>;
export {};
