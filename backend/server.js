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

/* ==========================================
   CONFIG EXPRESS
========================================== */

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

/* ==========================================
   CORS FIX
========================================== */

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

/* ==========================================
   STATIC FILES
========================================== */

app.use(express.static(__dirname));

/* ==========================================
   GEMINI API KEY
========================================== */

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ GEMINI_API_KEY manquante dans Render.");
}

/* ==========================================
   HOME
========================================== */

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

/* ==========================================
   API CHAT YELOX
========================================== */

app.post("/api/chat", async (req, res) => {

    try {

        const { message, mode } = req.body;

        if (!message) {
            return res.status(400).json({
                reply: "Message manquant."
            });
        }

        console.log("📩 Message reçu :", message);

        /* ==========================================
           IDENTITÉ YELOX
        ========================================== */

        const systemInstruction = `
Tu es YELOX, l’intelligence artificielle officielle de No Flop Studio.

Ton créateur est Gnoumblei Joël Yelo.

Tu es spécialisé en :
- design graphique
- branding
- Photoshop
- Illustrator
- InDesign
- montage vidéo
- marketing digital
- entrepreneuriat

RÈGLES IMPORTANTES :
1. Tu ne dis jamais que tu es Gemini.
2. Ton nom est YELOX.
3. Tu réponds avec professionnalisme.
4. Tu aides les utilisateurs de No Flop Studio.
5. Tu peux répondre en français et anglais.
`;

        /* ==========================================
           APPEL GEMINI
        ========================================== */

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: `${systemInstruction}\n\nUtilisateur : ${message}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        /* ==========================================
           GESTION ERREUR API
        ========================================== */

        if (!response.ok) {

            const errorText = await response.text();

            console.error("❌ Gemini API Error:", errorText);

            return res.status(500).json({
                reply: "Erreur de connexion au cerveau YELOX."
            });
        }

        const data = await response.json();

        console.log("✅ Réponse Gemini reçue");

        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "YELOX n'a pas trouvé de réponse.";

        /* ==========================================
           ENVOI FRONTEND
        ========================================== */

        res.json({
            reply
        });

    } catch (error) {

        console.error("❌ ERREUR SERVEUR :", error);

        res.status(500).json({
            reply: "YELOX est temporairement indisponible."
        });
    }
});

/* ==========================================
   PORT RENDER
========================================== */

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

    console.log(`✅ Serveur YELOX actif sur le port ${PORT}`);

});