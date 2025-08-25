
# 🧑‍💻 Real-Time Collaboration CodekiT

A full-stack web application that enables multiple users to join a shared coding room and collaborate in real time. Built with **React**, **Monaco Editor**, **Socket.IO**, and **Express**, this project showcases live code editing, room-based user management, and language switching.

---

## 🚀 Features

- 🔗 Join a room with a unique Room ID
- 👥 See who’s online and typing
- 🧠 Real-time code synchronization across users
- 🌐 Language selector for syntax highlighting (JavaScript, Python, Java, C++)
- 📋 Copy Room ID to clipboard
- 🧼 Clean UI with Monaco Editor and dark theme

---

## 🛠️ Tech Stack

| Layer     | Tech Used                     |
|-----------|-------------------------------|
| Frontend  | React, Vite, Monaco Editor    |
| Backend   | Node.js, Express, Socket.IO   |
| Styling   | CSS                           |

---

## 📦 Project Structure

```
Real-Time-Collaboration-CodekiT/
├── Backend/
│   ├── index.js
│   ├── package.json
│   └── .gitignore
├── Frontend/
│   └── RealTime-Collaboration-codeKit/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       ├── public/
│       ├── index.html
│       ├── package.json
│       └── .gitignore
```

---

## 🧪 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/SurajBisht7/Real-Time-Collaboration-CodekiT.git
cd Real-Time-Collaboration-CodekiT
```

### 2. Install Dependencies

#### Backend
```bash
cd Backend
npm install
```

#### Frontend
```bash
cd Frontend/RealTime-Collaboration-codeKit
npm install
```

### 3. Run the App

#### Start Backend Server
```bash
node index.js
```

#### Start Frontend
```bash
npm run dev
```

---

## 🧠 How It Works

- Users join a room via a unique ID.
- Socket.IO handles real-time communication between clients and the server.
- Monaco Editor syncs code changes across all connected users.
- Language changes are broadcasted to all users in the room.

---

## 📌 To-Do

- ✅ Add user list dynamically
- ✅ Show typing indicators
- ⏳ Add chat functionality
- ⏳ Implement code execution sandbox
- ⏳ Add persistent room history

---

## 📄 License

This project is open-source under the MIT License.

---

## 🙌 Author

Made with curiosity and caffeine by [SurajBisht7](https://github.com/SurajBisht7)
```

---

Let me know if you want badges, deployment instructions, or a GIF demo section added. I can tailor it for contributors or even prep it for GitHub Pages hosting.
