"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_auth_dto_1 = require("./create-auth.dto");
class SignInDto extends (0, mapped_types_1.PickType)(create_auth_dto_1.CreateAuthDto, ['email', 'password']) {
}
exports.SignInDto = SignInDto;
//# sourceMappingURL=sign-in.dto.js.map