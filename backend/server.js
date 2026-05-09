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
   CONFIG EXPRESS & CORS
========================================== */
app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "*" })); // Autorise Vercel et le local

/* ==========================================
   INFOS DE CONNEXION
========================================== */
const API_KEY = process.env.GEMINI_API_KEY;

/* ==========================================
   ROUTE RACINE (POUR RENDER)
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

        console.log("📩 YELOX reçoit :", message);

        // CONFIGURATION DE L'IDENTITÉ
        const systemInstruction = `
        Tu es YELOX, l’IA officielle de No Flop Studio, créée par Gnoumblei Joël Yelo.
        Expert en design graphique, branding (Photoshop, Illustrator, InDesign) et marketing.
        1. Ton nom est YELOX.
        2. Tu ne mentionnes jamais Gemini.
        3. Tu es professionnel et créatif.
        `;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{ text: `${systemInstruction}\n\nUtilisateur : ${message}` }]
                    }]
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Erreur API Gemini :", errorText);
            return res.status(500).json({ reply: "Erreur de connexion au cerveau YELOX." });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "YELOX n'a pas pu formuler de réponse.";

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
    console.log(`✅ YELOX actif sur le port ${PORT}`);
});