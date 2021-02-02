import { AxiosRequestConfig } from 'axios';
type Func = (...args: any[]) => any;

type NewFn<
  T extends Func,
  Pa extends unknown[] = Parameters<T>
  > = Pa[0] extends undefined
  ? (config?: AxiosRequestConfig) => ReturnType<T>
  : Pa[0] extends Record<any, any>
  ? (data: Pa[0], config?: AxiosRequestConfig) => ReturnType<T>
  : Pa[1] extends undefined
  ? (param: string, config?: AxiosRequestConfig) => ReturnType<T>
  : (data: Pa[0], param: string, config?: AxiosRequestConfig) => ReturnType<T>;

type Res<T extends Record<string, Func>> = { [K in keyof T]: NewFn<T[K]> };

export function wrap<T>(val: T) {
  // @ts-ignore
  return (val as any) as Res<InstanceType<T>>;
}
