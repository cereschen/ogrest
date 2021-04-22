import { Project, Node } from "ts-morph";
export function transformJs(config) {
    const project = new Project({ useInMemoryFileSystem: true });
    const Methods = ['Post', 'Get', 'Put', 'Delete', 'Options', 'Patch', 'Head'];
    return function main({ code }) {
        var _a;
        const sf = project.createSourceFile('test.ts', code, { overwrite: true });
        const exportedClass = sf.getClasses()[0];
        const baseUrlNode = (_a = exportedClass === null || exportedClass === void 0 ? void 0 : exportedClass.getDecorator('Controller')) === null || _a === void 0 ? void 0 : _a.getArguments()[0];
        const membersCode = [];
        if (!Node.isStringLiteral(baseUrlNode))
            return { code };
        const baseUrl = baseUrlNode.getLiteralText();
        function getArg0Str(node) {
            if (Node.isStringLiteral(node)) {
                let str = node.getLiteralText().replace(/:[^]*/, '');
                return str ? '/' + str : '';
            }
            return '';
        }
        exportedClass.getMethods().map((method) => {
            const res = method
                .getDecorators()
                .find((decorator) => Methods.includes(decorator.getName()));
            if (!res)
                return;
            const arg0 = res.getArguments()[0];
            const arg0Str = getArg0Str(arg0);
            const methodName = res.getName();
            const hasBodyOrQueryParam = method.getParameters().find((param) => {
                return param.getDecorator('Body') || param.getDecorator('Query');
            });
            const dataStr = hasBodyOrQueryParam ? 'data, ' : '';
            membersCode.push(`
      ${method.getName()}(${dataStr} param, config ){
     return request({
       url: '/${baseUrl}${arg0Str}' + (param?'/'+ param:''),
       method: '${methodName.toUpperCase()}',
       ${dataStr && methodName === 'Get' ? 'params:' : ''}${dataStr}
       ...(config||{})
     })
   }
     `);
        });
        const out = `
    ${config.requestImportCode || `import request from "@/utils/request.ts"`}
    export const ${exportedClass.getName()} = {
       ${membersCode.join(',')}
    }`;
        return { code: out };
    };
}
