import express from "express";
import { getCodeBlockByCaseName } from "../controllers/CodeBlockController.js";

const router = express.Router();

router.get("/:caseName", async (req, res) => {
  try {
    const { caseName } = req.params;
    const code = await getCodeBlockByCaseName(caseName);
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.send(code);
  } catch (error) {
    console.error(`Error fetching code for ${req.params.caseName}:`, error);
    res.status(500).send(`Error fetching code for ${req.params.caseName}`);
  }
});

export default router;
