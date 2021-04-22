import { transformJs } from "../loader/tramsfrom";
export default function () {
    const transfrom = transformJs({});
    return {
        name: 'ogrest',
        transform(source, id) {
            if (!id.match(/\.controller.ts$/))
                return source;
            return transfrom({ code: source }).code;
        }
    };
}
