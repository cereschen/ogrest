/// <reference types="node" />
import * as webpack from "webpack";
export interface Config {
    /**
     * @default `import request from "@/utils/request.ts"`
     */
    requestImportCode?: string;
}
export default function ogrestWebpack(this: webpack.loader.LoaderContext, source: string | Buffer): string | Buffer;
