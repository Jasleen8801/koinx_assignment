import express from "express";
import { uploadCSV, assetBalance } from "../controllers/trade.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "../uploads/" });

router.post("/upload-csv", upload.single("file"), uploadCSV);
router.post("/asset-balance", assetBalance);

export default router;
