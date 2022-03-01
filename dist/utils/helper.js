"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeArray = void 0;
function normalizeArray(array) {
    const max = Math.max(...array);
    const min = Math.min(...array);
    const minMaxDiff = max - min;
    const normalizedArray = [];
    array.forEach((value) => {
        const normalizedValue = ((value - min) / minMaxDiff) * 100;
        normalizedArray.push(normalizedValue);
    });
    return normalizedArray;
}
exports.normalizeArray = normalizeArray;
//# sourceMappingURL=helper.js.map