import express from "express";
import { uploadCSV, assetBalance } from "../controllers/trade.controller.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload-csv", upload.single("file"), uploadCSV);
router.post("/asset-balance", assetBalance);

export default router;
