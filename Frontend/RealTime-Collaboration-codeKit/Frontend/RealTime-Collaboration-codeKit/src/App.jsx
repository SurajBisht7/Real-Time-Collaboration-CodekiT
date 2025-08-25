import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";


const socket = io("http://localhost:3000");
const App = () => {
  const [joined, setjoined] = useState(false);
  const [roomId, setroomId] = useState("");
  const [username, setUsername] = useState("");
  const [language, setlanguage] = useState("javascript");
  const [code, setcode] = useState("");
const [copySuccess,setcopySuccess]=  useState("")

  const joinRoom = () => {
    if (roomId && username) {
      socket.emit("join", { roomId, username });
      setjoined(true);
    }
  };
  const copyroomid =()=>{
    navigator.clipboard.writeText(roomId)
    setcopySuccess("Copied!")
    setTimeout(()=>setcopySuccess(""),2000)
  }
  
  const handlercodeChange = (newcode)=>{
    setcode(newcode);
  }
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("languageChange", { roomId, language: newLanguage });
  };
  if (!joined) {
    return (
      <div className="join-container">
        <div className="join-form">
          <h1>Join Code Room</h1>
          <input
            type="text"
            placeholder="Room Id"
            value={roomId}
            onChange={(e) => setroomId(e.target.value)}
          />
          <input
            type="text"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={joinRoom}> Join Room</button>
        </div>
      </div>
    );
  }
  return (
    <div className="edit-container">
      <div className="sidebar">
        <h2>Code Room: {roomId}</h2>
        <button onClick={copyroomid}> Copy id</button>
         <span className="copy-success">{copySuccess}</span>

        <h3> Users in Room:</h3>
        <ul>
          <li>dfahf</li>
          <li>sdafjj</li>
        </ul>
        <p className='typing-indicator'>user typing.....</p>
        <select className='language-selector' value={language} onChange={(e)=>setlanguage(e.target.value)}>
          <option value="javascript">Javascript</option>
          <option value="python">Python</option>
          <option value="java">java</option>
          <option value="cpp">C++</option>
        </select>
        <button className="leave-button">Leave Room</button>
      </div>
      <div className="editor-wrapper">
        <Editor
          height={"100%"}
        
          language={language}
          value={code}
          onChange={handlercodeChange}
          theme="vs-dark"
         options={{
          minimap:{enabled:false},
          fontSize:14
         }}
        />
      </div>
    </div>
  );
};

export default App;
