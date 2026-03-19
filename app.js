// ============================================================
// App — orchestration UI ↔ Bot_Engine
// ============================================================

// État de la conversation (sous-tâche 4.1)
var conversationHistory = [];

// sendMessage est exposée globalement car appelée via onclick dans index.html
async function sendMessage() {
  var text = userInputEl.value.trim();
  if (!text) return;

  appendMessage("user", text);
  userInputEl.value = "";

  conversationHistory.push({ role: "user", content: text });

  showTypingIndicator();

  try {
    var response = await window.getResponse(text, conversationHistory);
    hideTypingIndicator();
    appendMessage("bot", response);
    conversationHistory.push({ role: "assistant", content: response });
  } catch (err) {
    hideTypingIndicator();
    appendMessage("bot", "Une erreur est survenue. Veuillez réessayer.");
  }
}

window.sendMessage = sendMessage;

// Initialisation DOM (sous-tâche 4.1)
var messagesEl;
var userInputEl;
var sendBtnEl;

document.addEventListener("DOMContentLoaded", function () {
  messagesEl  = document.getElementById("messages");
  userInputEl = document.getElementById("userInput");
  sendBtnEl   = document.getElementById("sendBtn");

  // Touche Entrée déclenche sendMessage (Requirement 6.4)
  userInputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});

// appendMessage(role, text) — sous-tâche 4.3
function appendMessage(role, text) {
  var messageDiv = document.createElement("div");
  messageDiv.classList.add("message", role);

  var bubbleDiv = document.createElement("div");
  bubbleDiv.classList.add("bubble");
  bubbleDiv.textContent = text;

  messageDiv.appendChild(bubbleDiv);
  messagesEl.appendChild(messageDiv);

  scrollToBottom();
}

// showTypingIndicator() — sous-tâche 4.5
function showTypingIndicator() {
  var messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "bot");
  messageDiv.id = "typing";

  var typingDiv = document.createElement("div");
  typingDiv.classList.add("typing-indicator");

  for (var i = 0; i < 3; i++) {
    typingDiv.appendChild(document.createElement("span"));
  }

  messageDiv.appendChild(typingDiv);
  messagesEl.appendChild(messageDiv);

  scrollToBottom();
}

// hideTypingIndicator() — sous-tâche 4.5
function hideTypingIndicator() {
  var typingEl = document.getElementById("typing");
  if (typingEl) {
    typingEl.parentNode.removeChild(typingEl);
  }
}

// scrollToBottom() — sous-tâche 4.6
function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}
