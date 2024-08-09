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
        res.json({ token, user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = (0, jwt_1.generateToken)(user);
    res.json({ token, user });
};
exports.signin = signin;
const getProfile = async (req, res) => {
    res.json(req.user);
};
exports.getProfile = getProfile;
// export const updateProfile = async (req: Request, res: Response) => {
//   const { name, age, gender, profilePicture } = req.body;
//   const user = await prisma.user.update({
//     where: { id: req.user?.id },
//     data: { name, age, gender, profilePicture },
//   });
//   res.json(user);
// };
const getAllUsers = async (req, res) => {
    const users = await prisma_1.default.user.findMany();
    res.json(users);
};
exports.getAllUsers = getAllUsers;
