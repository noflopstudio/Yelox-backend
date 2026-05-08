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

// --- CONFIGURATION CORS ---
app.use(cors({
    origin: "*", // Autorise toutes les sources pour le test
    methods: ["GET", "POST"]
}));

app.use(express.json());
app.use(express.static(__dirname));

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAb8QQlPDOuP4j24CRJ1ZZ4xi8A-yRvTls";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// --- ROUTE DE CHAT AVEC PERSONNALITÉ YELOX ---
app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;

        // Configuration de l'identité de l'IA
        const systemInstruction = `Tu es YELOX, l'intelligence artificielle officielle de No Flop Studio. 
        Ton créateur est Gnoumblei Joël Yelo, un Infographe polyvalent et entrepreneur basé à Abidjan.
        Tu es un expert en design graphique (Photoshop, Illustrator, InDesign), montage vidéo (Filmora) et marketing digital. 
        Ton but est d'aider les clients de l'agence et de promouvoir les services de No Flop Studio.
        REGLÈS IMPORTANTES : 
        1. Ne dis JAMAIS que tu es Gemini ou un modèle de Google.
        2. Ton nom est YELOX.
        3. Réponds avec professionnalisme et créativité.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: `${systemInstruction}\n\nClient : ${message}` }]
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            return res.status(500).json({ error: "Erreur de communication avec le cerveau de YELOX" });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        res.json({ reply: reply || "YELOX réfléchit... réessayez dans un instant." });

    } catch (error) {
        console.error("❌ Erreur YELOX:", error);
        res.status(500).json({ error: "YELOX est temporairement indisponible." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`✅ Serveur YELOX actif sur le port ${PORT}`);
});