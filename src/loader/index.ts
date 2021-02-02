import * as webpack from "webpack"
import { transformJs } from "./tramsfrom";
import { getOptions, OptionObject } from 'loader-utils';

export interface Config extends OptionObject {
  /**
   * @default `import request from "@/utils/request.ts"`
   */
  requestImportCode: string,
}

export default function noRefWebpack(
  this: webpack.loader.LoaderContext,
  source: string | Buffer
) {
  if (!this.resourcePath.match(/\.controller.ts$/)) return source
  let options: Config = getOptions(this) as Config;
  let transform = transformJs({ ...options, isVite: false })
  if (typeof source === "string") {
    let result = { code: source }

    if (this.resourcePath.match(/\.(vue)$/)) {
      result = transform({ code: source })
    } else if (this.resourcePath.includes('use')) {
      result = transform({ code: source })
    } else {
      return source
    }
    //@ts-ignore  source-map type
    this.callback(null, result.code, this.sourceMap ? result.map : undefined)
  }
  return
}
