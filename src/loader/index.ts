import * as webpack from "webpack"
import { transformJs } from "./tramsfrom";
import { getOptions, OptionObject } from 'loader-utils';

export interface Config {
  /**
   * @default `import request from "@/utils/request.ts"`
   */
  requestImportCode?: string,
}

export default function ogrestWebpack(
  this: webpack.loader.LoaderContext,
  source: string | Buffer
) {
  if (!this.resourcePath.match(/\.controller.ts$/)) return source
  let options: Config = getOptions(this) as Config;
  let transform = transformJs({ ...options })
  if (typeof source === "string") {
    let result = transform({ code: source })
    //@ts-ignore  source-map type
    this.callback(null, result.code, this.sourceMap ? result.map : undefined)
  }

  return source
}
