// ============================================================
// Bot_Engine + API_Client Groq
// ============================================================

// --- Configuration (sous-tâche 2.1) ---
var GROQ_API_KEY  = "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";
var GROQ_MODEL    = "llama3-8b-8192";
var GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

// --- Règles locales (sous-tâche 2.1) ---
var rules = [
  {
    pattern: /bonjour|salut|hello|hi\b|coucou/i,
    response: "Bonjour ! Comment puis-je vous aider aujourd'hui ?"
  },
  {
    pattern: /aide|help|comment/i,
    response: "Je suis là pour vous aider ! Posez-moi n'importe quelle question."
  },
  {
    pattern: /merci|thanks|thank you/i,
    response: "De rien, c'est avec plaisir ! Y a-t-il autre chose que je puisse faire pour vous ?"
  },
  {
    pattern: /au revoir|bye|goodbye|à bientôt/i,
    response: "Au revoir ! N'hésitez pas à revenir si vous avez d'autres questions."
  },
  {
    pattern: /qui es-tu|ton nom|quel est ton nom|comment tu t'appelles/i,
    response: "Je suis un assistant IA conçu pour vous aider. Vous pouvez m'appeler ChatBot !"
  },
  {
    pattern: /que peux-tu faire|tes capacités|tu peux faire quoi|fonctionnalités/i,
    response: "Je peux répondre à vos questions, vous aider à trouver des informations et discuter de nombreux sujets. Essayez !"
  },
  {
    pattern: /météo|temps qu'il fait|température|climat/i,
    response: "Je n'ai pas accès aux données météo en temps réel, mais vous pouvez consulter un service comme météo.fr ou weather.com."
  },
  {
    pattern: /blague|joke|humour|drôle/i,
    response: "Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tomberaient dans le bateau !"
  }
];

// Réponse de repli
var FALLBACK_RESPONSE = "Je ne comprends pas encore cette question. Pouvez-vous reformuler ?";

// --- matchRules (sous-tâche 2.1) ---
function matchRules(message) {
  for (var i = 0; i < rules.length; i++) {
    if (rules[i].pattern.test(message)) {
      return rules[i].response;
    }
  }
  return FALLBACK_RESPONSE;
}

// --- callGroqAPI (sous-tâche 2.3) ---
async function callGroqAPI(message, history) {
  try {
    var messages = [
      { role: "system", content: "Tu es un assistant IA utile et amical. Réponds en français de manière concise." }
    ];

    if (Array.isArray(history)) {
      for (var i = 0; i < history.length; i++) {
        messages.push(history[i]);
      }
    }

    messages.push({ role: "user", content: message });

    var response = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + GROQ_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: messages,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      return "Le service IA est temporairement indisponible.";
    }

    var data = await response.json();
    return data.choices[0].message.content;

  } catch (err) {
    return "Le service IA est temporairement indisponible.";
  }
}

// --- getResponse — fonction publique (sous-tâche 2.5) ---
async function getResponse(message, history) {
  if (!GROQ_API_KEY || GROQ_API_KEY.trim() === "") {
    return matchRules(message);
  }
  return callGroqAPI(message, history);
}

// Exposition en variable globale
window.getResponse = getResponse;
