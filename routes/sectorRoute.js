import express from "express";
import {
  createSectorController,
  getallSectorController,
} from "../controllers/sectorController.js";
const router = express.Router();

//routes:
//create category:
router.post("/create-sector", createSectorController);
router.get("/all-sector", getallSectorController);

export default router;
