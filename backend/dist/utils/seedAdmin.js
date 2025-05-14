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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = __importDefault(require("../models/userModel"));
dotenv_1.default.config();
const seedAdminAndModerator = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        const existingAdmin = yield userModel_1.default.findOne({ email: 'admin@sport.com' });
        const existingModerator = yield userModel_1.default.findOne({ email: 'mod1@sport.com' });
        if (!existingAdmin) {
            const admin = new userModel_1.default({
                name: 'Admin',
                email: 'admin@sport.com',
                password: yield bcryptjs_1.default.hash('admin123', 10),
                role: 'admin',
            });
            yield admin.save();
            console.log('✅ Адміністратор доданий');
        }
        else {
            console.log('⚠️ Адміністратор вже існує');
        }
        if (!existingModerator) {
            const moderator = new userModel_1.default({
                name: 'Moderator',
                email: 'mod1@sport.com',
                password: yield bcryptjs_1.default.hash('mod123', 10),
                role: 'moderator',
            });
            yield moderator.save();
            console.log('✅ Модератор доданий');
        }
        else {
            console.log('⚠️ Модератор вже існує');
        }
        mongoose_1.default.connection.close();
    }
    catch (error) {
        console.error('❌ Помилка при додаванні користувачів:', error);
        mongoose_1.default.connection.close();
        process.exit(1);
    }
});
seedAdminAndModerator();
