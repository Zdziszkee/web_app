"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const userRepository_1 = require("../repositories/userRepository");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    // Additional business logic can be added here
    return yield (0, userRepository_1.getUsers)();
});
exports.getUsers = getUsers;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Additional business logic can be added here
    // For example, hashing the password before saving the user
    user.password = hashPassword(user.password);
    return yield (0, userRepository_1.createUser)(user);
});
exports.createUser = createUser;
// Example of a business logic function
const hashPassword = (password) => {
    // Implement password hashing logic here
    return password; // Replace with actual hashing logic
};
