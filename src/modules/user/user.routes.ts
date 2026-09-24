
import { userController } from "./user.controller";


import { auth } from "../../middlewares/auth";
import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

const router = Router();





router.post('/register', userController.registerUser);


router.get('/me',auth(Role.ADMIN,Role.USER,Role.USER), userController.getMyProfile);

router.put('/my-profile',auth(Role.ADMIN,Role.USER,Role.USER),userController.updateProfile)


export const userRoutes = router;