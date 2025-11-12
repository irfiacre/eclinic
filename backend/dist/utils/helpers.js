"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockNidaApi = void 0;
const firstNames = ['Odile'];
const lastNames = ['Iradukunda'];
const mockNidaApi = () => {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return { firstName: randomFirstName, lastName: randomLastName };
};
exports.mockNidaApi = mockNidaApi;
//# sourceMappingURL=helpers.js.map