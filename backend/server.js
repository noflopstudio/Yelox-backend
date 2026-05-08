import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- CONFIGURATION DE SÉCURITÉ (CORS) ---
app.use(cors({
    origin: "https://no-flop-studio.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.static(__dirname));

// --- CLÉ API GEMINI ---
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAb8QQlPDOuP4j24CRJ1ZZ4xi8A-yRvTls";

// Route d'accueil
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// --- ROUTE DE CHAT YELOX ---
app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;

        // Appel à l'API Gemini 1.5 Pro
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: message }] }]
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Erreur API Gemini détaillée:", errorData);
            return res.status(500).json({ error: "Erreur de communication avec Gemini" });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(500).json({ error: "L'IA a renvoyé une réponse vide" });
        }

        res.json({ reply });

    } catch (error) {
        console.error("❌ Erreur serveur YELOX:", error);
        res.status(500).json({ error: "Erreur interne du serveur YELOX" });
    }
});

// --- DÉMARRAGE DU SERVEUR ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`✅ Backend YELOX opérationnel sur le port ${PORT}`);
});