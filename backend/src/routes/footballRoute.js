import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/matches", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.the-odds-api.com/v4/sports/soccer/odds/?regions=eu&markets=h2h&apiKey=66d984ba9cb0695b85feae5c12a611734ca5e17f8001c84981d8d18bd6504dc7"
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching football data" });
  }
});

export default router;