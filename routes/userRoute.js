import express from "express";
import {
  createUserController,
  getSingleUserController,
  getallUserController,
  updateUserController,
} from "../controllers/userController.js";
const router = express.Router();

//routes:
//create category:
router.post("/create-user", createUserController);
router.get("/all-user", getallUserController);
router.get("/single-user/:slug", getSingleUserController);
router.put("/update-user/:id", updateUserController);

export default router;
