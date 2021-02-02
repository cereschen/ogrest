"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tramsfrom_1 = require("./tramsfrom");
const loader_utils_1 = require("loader-utils");
function noRefWebpack(source) {
    if (!this.resourcePath.match(/\.controller.ts$/))
        return source;
    let options = loader_utils_1.getOptions(this);
    let transform = tramsfrom_1.transformJs(Object.assign(Object.assign({}, options), { isVite: false }));
    if (typeof source === "string") {
        let result = { code: source };
        if (this.resourcePath.match(/\.(vue)$/)) {
            result = transform({ code: source });
        }
        else if (this.resourcePath.includes('use')) {
            result = transform({ code: source });
        }
        else {
            return source;
        }
        //@ts-ignore  source-map type
        this.callback(null, result.code, this.sourceMap ? result.map : undefined);
    }
    return;
}
exports.default = noRefWebpack;
