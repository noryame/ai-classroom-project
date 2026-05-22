"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
var Role;
(function (Role) {
    Role["STUDENT"] = "student";
    Role["TEACHER"] = "teacher";
    Role["ADMIN"] = "admin";
})(Role || (exports.Role = Role = {}));
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
