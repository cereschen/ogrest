import { transformJs } from "./tramsfrom";
import { getOptions } from 'loader-utils';
export default function ogrestWebpack(source) {
    if (!this.resourcePath.match(/\.controller.ts$/))
        return source;
    let options = getOptions(this);
    let transform = transformJs(Object.assign({}, options));
    if (typeof source === "string") {
        let result = transform({ code: source });
        //@ts-ignore  source-map type
        this.callback(null, result.code, this.sourceMap ? result.map : undefined);
    }
    return source;
}
