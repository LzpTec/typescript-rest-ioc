import * as debug from 'debug';
import { Container } from 'typescript-ioc';

const serverDebugger = debug('typescript-rest-ioc');

export default {
    create: (serviceClass: any) => {
        return Container.get(serviceClass);
    },

    getTargetClass: (serviceClass: Function) => {
        if (Array.isArray(serviceClass)) {
            return null;
        }
        let typeConstructor: any = serviceClass;
        if (typeConstructor['name'] && typeConstructor['name'] !== 'ioc_wrapper') {
            return typeConstructor as FunctionConstructor;
        }
        typeConstructor = typeConstructor['__parent'];
        while (typeConstructor) {
            if (typeConstructor['name'] && typeConstructor['name'] !== 'ioc_wrapper') {
                return typeConstructor as FunctionConstructor;
            }
            typeConstructor = typeConstructor['__parent'];
        }
        serverDebugger('Can not identify the base Type for requested target: %o', serviceClass);
        throw new TypeError('Can not identify the base Type for requested target');
    }
};