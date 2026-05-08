import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// clé Gemini
const API_KEY = process.env.GEMINI_API_KEY;

// test serveur
app.get("/", (req, res) => {
    res.send("YELOX backend is running 🚀");
});

// ROUTE IA YELOX
app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: message }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        res.json({ reply });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur IA YELOX" });
    }
});

// PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});