"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getProfile = exports.signin = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../prisma"));
const jwt_1 = require("../utils/jwt");
const zod_1 = require("zod");
const cookie_1 = __importDefault(require("cookie"));
const signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2),
    age: zod_1.z.number().int().positive(),
    gender: zod_1.z.string(),
    profilePicture: zod_1.z.string().optional(),
});
const signup = async (req, res) => {
    try {
        const { email, password, name, age, gender, profilePicture } = signupSchema.parse(req.body);
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                age,
                gender,
                profilePicture,
            },
        });
        const token = (0, jwt_1.generateToken)(user);
        res.setHeader("Set-Cookie", cookie_1.default.serialize("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 7,
            expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
            path: "/",
        }));
        res.status(201).json({ user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = (0, jwt_1.generateToken)(user);
        res.setHeader("Set-Cookie", cookie_1.default.serialize("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 7,
            expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
            path: "/",
        }));
        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                age: user.age,
                gender: user.gender,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.signin = signin;
const getProfile = async (req, res) => {
    res.json(req.user);
};
exports.getProfile = getProfile;
// export const updateProfile = async (req: Request, res: Response) => {
//   const { email, password, name, age, gender, profilePicture } = req.body;
//  const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await prisma.user.update({
//     where: { id: req.user?.id },
//     data: { email, hashedPassword, name, age, gender, profilePicture },
//   });
//   res.json(user);
// };
const getAllUsers = async (req, res) => {
    const users = await prisma_1.default.user.findMany();
    res.json(users);
};
exports.getAllUsers = getAllUsers;
