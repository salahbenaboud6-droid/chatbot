#  Document

## Introduction

Ce projet est un chatbot IA simple accessible via une interface web. L'utilisateur interagit avec le chatbot via une zone de saisie de texte. Le système analyse le message, génère une réponse (via des règles locales ou une API IA externe), et affiche la conversation dans une interface de type messagerie. Le point de départ est le fichier `chatbot/index.html` existant, qui définit déjà la structure HTML de l'interface (conteneur de messages, champ de saisie, bouton d'envoi).

## Glossary

- **Chatbot**: L'application web capable de converser avec l'utilisateur via du texte.
- **User**: La personne qui interagit avec le Chatbot via l'interface web.
- **Message**: Un texte envoyé par le User ou généré par le Chatbot.
- **Conversation**: La séquence ordonnée de Messages échangés entre le User et le Chatbot.
- **Bot_Engine**: Le module JavaScript (`bot.js`) responsable de l'analyse du texte et de la génération de réponses.
- **UI**: L'interface utilisateur définie dans `index.html` et stylisée par `style.css`.
- **API_Client**: Le module responsable de la communication avec une API IA externe (ex. OpenAI).
- **App**: Le module principal (`app.js`) qui orchestre les interactions entre la UI et le Bot_Engine.

---

## Requirements

### Requirement 1 : Saisie et envoi de message

**User Story:** En tant que User, je veux saisir un message et l'envoyer au Chatbot, afin de démarrer ou poursuivre une conversation.

#### Acceptance Criteria

1. THE UI SHALL afficher un champ de saisie de texte et un bouton d'envoi en permanence.
2. WHEN le User appuie sur le bouton d'envoi ou sur la touche Entrée, THE App SHALL lire le contenu du champ de saisie et le transmettre au Bot_Engine.
3. WHEN le User envoie un Message, THE UI SHALL afficher ce Message dans la zone de conversation avec une distinction visuelle claire (alignement à droite ou couleur différente).
4. WHEN le User envoie un Message, THE App SHALL vider le champ de saisie.
5. IF le champ de saisie est vide au moment de l'envoi, THEN THE App SHALL ignorer l'action et ne pas transmettre de Message au Bot_Engine.

---

### Requirement 2 : Génération et affichage de la réponse

**User Story:** En tant que User, je veux recevoir une réponse du Chatbot après chaque message envoyé, afin d'avoir une conversation fluide.

#### Acceptance Criteria

1. WHEN le Bot_Engine reçoit un Message, THE Bot_Engine SHALL générer une réponse textuelle.
2. WHEN le Bot_Engine a généré une réponse, THE UI SHALL afficher cette réponse dans la zone de conversation avec une distinction visuelle claire (alignement à gauche ou couleur différente).
3. WHEN une réponse est ajoutée à la zone de conversation, THE UI SHALL faire défiler automatiquement la zone de conversation jusqu'au dernier Message.
4. WHILE le Bot_Engine traite un Message, THE UI SHALL afficher un indicateur visuel de chargement (ex. points animés).
5. WHEN le Bot_Engine a généré une réponse, THE UI SHALL masquer l'indicateur de chargement.

---

### Requirement 3 : Moteur de réponse basé sur des règles

**User Story:** En tant que développeur, je veux un Bot_Engine fonctionnel sans dépendance externe, afin que le Chatbot soit opérationnel même sans clé API.

#### Acceptance Criteria

1. THE Bot_Engine SHALL inclure un ensemble de règles de correspondance (mots-clés ou expressions régulières) associées à des réponses prédéfinies.
2. WHEN un Message correspond à une règle du Bot_Engine, THE Bot_Engine SHALL retourner la réponse associée à cette règle.
3. WHEN aucune règle ne correspond au Message, THE Bot_Engine SHALL retourner une réponse de repli générique (ex. "Je ne comprends pas encore cette question.").
4. THE Bot_Engine SHALL traiter les Messages de manière insensible à la casse (majuscules/minuscules).

---

### Requirement 4 : Intégration d'une API IA externe

**User Story:** En tant que User, je veux que le Chatbot puisse utiliser un modèle de langage avancé, afin d'obtenir des réponses plus pertinentes et naturelles.

#### Acceptance Criteria

1. WHERE une clé API est configurée, THE API_Client SHALL transmettre le Message du User à l'API IA externe et retourner la réponse générée.
2. WHERE une clé API est configurée, THE Bot_Engine SHALL déléguer la génération de réponse à l'API_Client au lieu d'utiliser les règles locales.
3. IF l'API IA externe retourne une erreur ou est inaccessible, THEN THE Bot_Engine SHALL retourner un message d'erreur explicite à l'utilisateur (ex. "Le service IA est temporairement indisponible.").
4. WHERE une clé API est configurée, THE API_Client SHALL inclure l'historique de la Conversation dans chaque requête afin de maintenir le contexte.

---

### Requirement 5 : Persistance et gestion de la conversation

**User Story:** En tant que User, je veux que la conversation reste visible pendant toute ma session, afin de pouvoir relire les échanges précédents.

#### Acceptance Criteria
**<img width="1030" height="984" alt="image" src="https://github.com/user-attachments/assets/fdc72e73-a6a8-4a05-9b84-877043a26a88" />
**
1. THE App SHALL conserver l'historique de la Conversation en mémoire pendant toute la durée de la session.
2. THE UI SHALL afficher tous les Messages de la Conversation dans l'ordre chronologique.
3. WHEN le User recharge la page, THE App SHALL réinitialiser la Conversation et afficher uniquement le Message de bienvenue initial.

---

### Requirement 6 : Interface utilisateur et accessibilité

**User Story:** En tant que User, je veux une interface claire et utilisable, afin d'interagir confortablement avec le Chatbot.

#### Acceptance Criteria

1. THE UI SHALL être construite à partir de la structure HTML existante dans `chatbot/index.html` (chat-container, chat-header, chat-messages, chat-input).
2. THE UI SHALL être responsive et s'afficher correctement sur des écrans de largeur minimale de 320px.
3. salah eddine benaboud
4. 
5. THE UI SHALL afficher un indicateur de statut (ex. point vert) dans l'en-tête pour signaler que le Chatbot est actif.
6. WHEN le User appuie sur la touche Entrée dans le champ de saisie, THE App SHALL déclencher l'envoi du Message (équivalent au clic sur le bouton d'envoi).
