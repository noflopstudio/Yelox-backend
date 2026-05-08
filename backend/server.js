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

// --- AUTORISATION POUR TON FRONTEND VERCEL ---
app.use(cors({
    origin: "https://no-flop-studio.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.static(__dirname));

// --- UTILISATION DE LA CLÉ SAUVEGARDÉE SUR RENDER ---
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAb8QQlPDOuP4j24CRJ1ZZ4xi8A-yRvTls";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;
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
            const errorText = await response.text();
            return res.status(500).json({ error: "Erreur API Gemini" });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(500).json({ error: "Réponse vide" });
        }

        res.json({ reply });

    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ error: "Erreur IA YELOX" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Backend YELOX démarré sur le port " + PORT);
}); import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- AUTORISATION POUR TON FRONTEND VERCEL ---
app.use(cors({
    origin: "https://no-flop-studio.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.static(__dirname));

// --- UTILISATION DE LA CLÉ SAUVEGARDÉE SUR RENDER ---
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAb8QQlPDOuP4j24CRJ1ZZ4xi8A-yRvTls";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;
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
            const errorText = await response.text();
            return res.status(500).json({ error: "Erreur API Gemini" });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(500).json({ error: "Réponse vide" });
        }

        res.json({ reply });

    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ error: "Erreur IA YELOX" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Backend YELOX démarré sur le port " + PORT);
}); import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- AUTORISATION POUR TON FRONTEND VERCEL ---
app.use(cors({
    origin: "https://no-flop-studio.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.static(__dirname));

// --- UTILISATION DE LA CLÉ SAUVEGARDÉE SUR RENDER ---
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAb8QQlPDOuP4j24CRJ1ZZ4xi8A-yRvTls";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;
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
            const errorText = await response.text();
            return res.status(500).json({ error: "Erreur API Gemini" });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(500).json({ error: "Réponse vide" });
        }

        res.json({ reply });

    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ error: "Erreur IA YELOX" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Backend YELOX démarré sur le port " + PORT);
}); import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- AUTORISATION POUR TON FRONTEND VERCEL ---
app.use(cors({
    origin: "https://no-flop-studio.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.static(__dirname));

// --- UTILISATION DE LA CLÉ SAUVEGARDÉE SUR RENDER ---
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAb8QQlPDOuP4j24CRJ1ZZ4xi8A-yRvTls";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;
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
            const errorText = await response.text();
            return res.status(500).json({ error: "Erreur API Gemini" });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(500).json({ error: "Réponse vide" });
        }

        res.json({ reply });

    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ error: "Erreur IA YELOX" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Backend YELOX démarré sur le port " + PORT);
}); import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- AUTORISATION POUR TON FRONTEND VERCEL ---
app.use(cors({
    origin: "https://no-flop-studio.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.static(__dirname));

// --- UTILISATION DE LA CLÉ SAUVEGARDÉE SUR RENDER ---
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAb8QQlPDOuP4j24CRJ1ZZ4xi8A-yRvTls";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;
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
            const errorText = await response.text();
            return res.status(500).json({ error: "Erreur API Gemini" });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(500).json({ error: "Réponse vide" });
        }

        res.json({ reply });

    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ error: "Erreur IA YELOX" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Backend YELOX démarré sur le port " + PORT);
}); import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- AUTORISATION POUR TON FRONTEND VERCEL ---
app.use(cors({
    origin: "https://no-flop-studio.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.static(__dirname));

// --- UTILISATION DE LA CLÉ SAUVEGARDÉE SUR RENDER ---
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAb8QQlPDOuP4j24CRJ1ZZ4xi8A-yRvTls";

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;
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
            const errorText = await response.text();
            return res.status(500).json({ error: "Erreur API Gemini" });
        }

        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            return res.status(500).json({ error: "Réponse vide" });
        }

        res.json({ reply });

    } catch (error) {
        console.error("❌ Erreur serveur:", error);
        res.status(500).json({ error: "Erreur IA YELOX" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Backend YELOX démarré sur le port " + PORT);
});