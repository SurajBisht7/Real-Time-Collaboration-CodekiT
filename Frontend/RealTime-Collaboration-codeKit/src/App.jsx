import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";


const socket = io("http://localhost:3000");
const App = () => {
  const [joined, setjoined] = useState(false);
  const [roomId, setroomId] = useState("");
  const [userName, setuserName] = useState("");
  const [language, setlanguage] = useState("javascript");
  const [code, setcode] = useState("//start code here");
const [copySuccess,setcopySuccess]=  useState("")
const [users , setUsers] = useState([])
const [typing ,settyping] = useState("");
useEffect(()=>{
  socket.on("userjoined",(users)=>{
     console.log("Received users:", users);
    setUsers(users);
  })
   socket.on("codeUpdate", (newCode) => {
      setcode(newCode);
    });
    socket.on("userTyping",(user)=>{
      settyping(`${user.slice(0,8)}... is Typing`)
      setTimeout(()=> settyping(""),2000)
    })
    
    socket.on("languageupdate",(newLanguage)=>{
      setlanguage(newLanguage);
    })
   
  return ()=>{
    socket.off("userjoined")
    socket.off("codeUpdate")
    socket.off("userTyping")
    socket.off("languageupdate")
  }
},[])

useEffect(()=>{
  const handleBeforeunload = ()=>{
    socket.emit("leaveRoom")
  }

  window.addEventListener("beforeunload",handleBeforeunload)

  return ()=>{
    window.removeEventListener("beforeunload", handleBeforeunload)
  }
},[])


  const joinRoom = () => {
    if (roomId && userName) {
      socket.emit("join", { roomId, userName });
      setjoined(true);
    }
  };
  const leaveRoom = ()=>{
    socket.emit("leaveRoom")
    setjoined(false)
    setroomId("")
      setuserName("")
      setcode("//start code here")
      setlanguage("javascript")

    
  }
  const copyroomid =()=>{ 
    navigator.clipboard.writeText(roomId)
    setcopySuccess("Copied!")
    setTimeout(()=>setcopySuccess(""),2000)
  }
  
  const handlercodeChange = (newcode)=>{
    setcode(newcode);
    socket.emit("codeChange",{roomId,code:newcode});
    socket.emit("typing",{roomId,userName})
  }
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setlanguage(newLanguage);
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
            placeholder="userName"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
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
         { users.map((user,index)=> (
            <li key={index}>{user.slice(0,8)}.......</li>
        ) )}
        </ul>
          {typing && <p className='typing-indicator'>{typing}</p>}
        <select className='language-selector' value={language} onChange={handleLanguageChange}>
          <option value="javascript">Javascript</option>
          <option value="python">Python</option>
          <option value="java">java</option>
          <option value="cpp">C++</option>
        </select>
        <button className="leave-button" onClick={leaveRoom}>Leave Room</button>
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

