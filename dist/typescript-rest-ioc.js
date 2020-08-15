"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const typescript_ioc_1 = require("typescript-ioc");
const serverDebugger = debug('typescript-rest-ioc');
exports.default = {
    create: (serviceClass) => {
        return typescript_ioc_1.Container.get(serviceClass);
    },
    getTargetClass: (serviceClass) => {
        if (Array.isArray(serviceClass)) {
            return null;
        }
        let typeConstructor = serviceClass;
        if (typeConstructor['name'] && typeConstructor['name'] !== 'ioc_wrapper') {
            return typeConstructor;
        }
        typeConstructor = typeConstructor['__parent'];
        while (typeConstructor) {
            if (typeConstructor['name'] && typeConstructor['name'] !== 'ioc_wrapper') {
                return typeConstructor;
            }
            typeConstructor = typeConstructor['__parent'];
        }
        serverDebugger('Can not identify the base Type for requested target: %o', serviceClass);
        throw new TypeError('Can not identify the base Type for requested target');
    }
};
//# sourceMappingURL=typescript-rest-ioc.js.map