import { Project, Node } from "ts-morph";
import { Config } from "./index";
export function transformJs(config: Config) {

  const project = new Project({ useInMemoryFileSystem: true });
  const Methods = ['Post', 'Get', 'Put', 'Delete', 'Options', 'Patch', 'Head'];

  return function main({ code }: { code: string }) {
    const sf = project.createSourceFile('test.ts', code, { overwrite: true });
    const exportedClass = sf.getClasses()[0];
    const baseUrlNode = exportedClass?.getDecorator('Controller')?.getArguments()[0];
    const membersCode: string[] = [];
    if (!Node.isStringLiteral(baseUrlNode)) return { code };

    const baseUrl = baseUrlNode.getLiteralText();
    function getArg0Str(node: Node) {
      if (Node.isStringLiteral(node)) {
        let str = node.getLiteralText().replace(/:[^]*/, '')
        return str ? '/' + str : ''
      }
      return ''
    }
    exportedClass.getMethods().map((method) => {

      const res = method
        .getDecorators()
        .find((decorator) => Methods.includes(decorator.getName()));
      if (!res) return
      const arg0 = res.getArguments()[0];
      const arg0Str = getArg0Str(arg0)
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
  }
}


