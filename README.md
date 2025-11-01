# 💬 Chat App Frontend

A real-time chat application frontend built with **Vue.js**, **Vuex**, **Nuxt**, **Socket.IO**, and **Tailwind CSS**.  
This project allows users to send and receive messages instantly, see who’s online, and search for other users by name or email.

---

## 🚀 Features

- 🔐 **User Authentication** (via JWT)
- 💬 **Real-time messaging** using Socket.IO
- 🟢 **Online user tracking**
- 🔎 **Search users** by email
- 📨 **Optimistic message sending** (messages appear instantly before acknowledgment)
- 🧭 **Clean, responsive UI** powered by TailwindCSS
- 🧩 **State management** handled with Vuex
- ⚙️ **Modular architecture** — easily extendable and maintainable

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Vue.js (v2)** | Frontend framework |
| **Nuxt.js (v2)** | Server-side rendering and project structure |
| **Vuex** | Centralized state management |
| **Socket.IO Client** | Real-time communication |
| **TailwindCSS** | UI styling |
| **JWT (localStorage)** | Authentication handling |

---

## 📂 Project Structure

chat-app-fe/
├── components/
│ ├── ChatMessage.vue
│ ├── ChatInput.vue
│ └── ChatSidebar.vue
├── pages/
│ ├── chat/
│ │ └── _id.vue
│ └── index.vue
├── store/
│ └── index.js
├── plugins/
│ └── socket.client.js
├── nuxt.config.js
├── tailwind.config.js
├── package.json
└── README.md

