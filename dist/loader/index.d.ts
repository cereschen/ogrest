/// <reference types="node" />
import * as webpack from "webpack";
import { OptionObject } from 'loader-utils';
export interface Config extends OptionObject {
    /**
     * @default `import request from "@/utils/request.ts"`
     */
    requestImportCode: string;
}
export default function noRefWebpack(this: webpack.loader.LoaderContext, source: string | Buffer): string | Buffer | undefined;
