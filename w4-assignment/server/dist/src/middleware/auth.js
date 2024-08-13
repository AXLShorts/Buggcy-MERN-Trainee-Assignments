"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const jwt_1 = require("../utils/jwt");
const cookie_1 = __importDefault(require("cookie"));
const authenticate = async (req, res, next) => {
    const cookies = req.headers.cookie ? cookie_1.default.parse(req.headers.cookie) : {};
    const token = cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        const user = await prisma_1.default.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.authenticate = authenticate;
