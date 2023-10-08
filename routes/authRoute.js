import express from 'express'
import { registerController, loginController, testController } from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();
console.log("router");
//routing
//REGISTER || METHOD POST
//1.authRoute.js => 2. authController.js => 3. userModel.js => 4. authHelper.js
router.post("/register", registerController);

//LOGIN || POST
router.post('/login', loginController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

export default router;