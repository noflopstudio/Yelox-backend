import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ==========================================
    CONFIG EXPRESS & CORS (Optimisée)
========================================== */
app.use(express.json({ limit: "50mb" }));

// On définit les options CORS pour accepter Vercel sans ambiguïté
const corsOptions = {
    origin: ["https://no-flop-studio.vercel.app", "http://127.0.0.1:5500"], // Ajoute ton localhost si tu testes en local
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Gère les requêtes "Preflight" (l'erreur que tu avais)

/* ==========================================
    INFOS DE CONNEXION
========================================== */
const API_KEY = process.env.GEMINI_API_KEY;

/* ==========================================
    ROUTE RACINE
========================================== */
app.get("/", (req, res) => {
    res.send("YELOX Core est en ligne et opérationnel. En attente de requêtes...");
});

/* ==========================================
    API CHAT YELOX
========================================== */
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ reply: "Message manquant." });
        }

        console.log("📩 YELOX reçoit une requête...");

        // INSTRUCTION SYSTÈME
        const systemInstruction = `Tu es YELOX, l’IA officielle de No Flop Studio, créée par Gnoumblei Joël Yelo. Expert en design graphique, branding (Photoshop, Illustrator, InDesign, Filmora) et marketing digital. 1. Ton nom est YELOX. 2. Tu ne mentionnes jamais Gemini ou Google. 3. Tu es professionnel, créatif et tu réponds en français.`;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: `${systemInstruction}\n\nUtilisateur : ${message}` }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Erreur API Gemini :", JSON.stringify(errorData));
            return res.status(500).json({ reply: "Désolé, mon cerveau a eu un court-circuit (Erreur API)." });
        }

        const data = await response.json();

        // Extraction sécurisée de la réponse
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Je n'ai pas pu formuler de réponse pour le moment.";

        res.json({ reply });

    } catch (error) {
        console.error("❌ ERREUR SERVEUR :", error);
        res.status(500).json({ reply: "YELOX est temporairement indisponible." });
    }
});

/* ==========================================
    LANCEMENT
========================================== */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`✅ YELOX CORE actif sur le port ${PORT}`);
});