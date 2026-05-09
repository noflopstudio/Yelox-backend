/* ==========================================
   CONFIGURATION UNIQUE
========================================== */
const API_URL = "https://yelox-core-backend.onrender.com";

/* ==========================================
   AUTHENTIFICATION
========================================== */
function seConnecter() {
    const email = document.getElementById('loginEmail');
    const pass = document.getElementById('loginPassword');
    if (!email || !pass) return;

    if (email.value && pass.value) {
        document.getElementById('login-section')?.classList.add('hidden');
        document.getElementById('noAuthMessage')?.classList.add('hidden');
        document.getElementById('protectedContent')?.classList.remove('hidden');
        const authText = document.getElementById('authButtonText');
        if (authText) authText.innerText = "Session Active";
        console.log("YELOX CORE déverrouillé.");
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

/* ==========================================
   MODE & HISTORIQUE
========================================== */
function setMode(mode) {
    window.currentMode = mode;
    const rapide = document.getElementById("modeRapide");
    const detaille = document.getElementById("modeDetaille");
    if (mode === "rapide") {
        rapide?.classList.add("border-pink-500", "text-pink-400");
        detaille?.classList.remove("border-pink-500", "text-pink-400");
    } else {
        detaille?.classList.add("border-pink-500", "text-pink-400");
        rapide?.classList.remove("border-pink-500", "text-pink-400");
    }
}

function ajouterHistorique(user, ia) {
    const container = document.getElementById("historiqueContainer");
    if (!container) return;
    const item = document.createElement("div");
    item.className = "p-3 bg-black border border-gray-800 rounded-xl text-xs text-gray-400 mb-2";
    item.innerHTML = `<p><strong>Vous :</strong> ${user}</p><p class="text-pink-400"><strong>YELOX :</strong> ${ia}</p>`;
    container.prepend(item);
}

/* ==========================================
   API CHAT YELOX
========================================== */
async function envoyerRequeteComplete() {
    const input = document.getElementById("userInput");
    const output = document.getElementById("testOutput");
    const loader = document.getElementById("yeloxLoader");
    const resultContainer = document.getElementById("resultContainer");

    if (!input || !output || !loader) return;
    const message = input.value.trim();
    if (!message) return;

    resultContainer?.classList.remove("hidden");
    loader.classList.remove("hidden");
    output.innerText = "YELOX réfléchit...";
    output.style.color = "white";

    try {
        const res = await fetch(`${API_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message,
                mode: window.currentMode || "rapide"
            })
        });

        if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`);

        const data = await res.json();
        const reply = data.reply || "YELOX n'a pas trouvé de réponse.";

        output.innerText = reply;
        ajouterHistorique(message, reply);
        jouerSonYelox();
        lireReponseAuto(reply);
        input.value = "";

    } catch (err) {
        console.error("❌ Erreur YELOX :", err);
        output.innerText = "Impossible de contacter YELOX.";
        output.style.color = "red";
    } finally {
        loader.classList.add("hidden");
    }
}

/* ==========================================
   VOIX & AUDIO
========================================== */
let voixActuelle = "auto";

async function obtenirVoix() {
    return new Promise(resolve => {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) return resolve(voices);
        window.speechSynthesis.onvoiceschanged = () => resolve(window.speechSynthesis.getVoices());
    });
}

async function lireReponseAuto(texte) {
    if (!texte) return;
    window.speechSynthesis.cancel();
    const voices = await obtenirVoix();
    const utterance = new SpeechSynthesisUtterance(texte);
    const frVoices = voices.filter(v => v.lang.includes("fr"));
    utterance.voice = frVoices[0] || voices[0];
    utterance.lang = "fr-FR";
    window.speechSynthesis.speak(utterance);
}

function jouerSonYelox() {
    const audio = new Audio("https://www.myinstants.com/media/sounds/success.mp3");
    audio.volume = 0.3;
    audio.play();
}