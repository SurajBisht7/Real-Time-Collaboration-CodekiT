import { Socket } from "dgram";
import express from "express"
import http  from "http"
import {Server} from "socket.io"
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
dotenv.config()



const app = express();
const httpserver = http.createServer(app);
const PORT = process.env.PORT||3000;


app.use(cors({
  origin: process.env.Frontend_url,
  credentials:true
}))
const io = new Server(httpserver,{
  cors:{
    origin : "*",
  },

})

const rooms = new Map();

io.on("connection" ,(socket)=>{
  console.log("User connected" , socket.id)

  let CurrentRoom = null;
  let CurrentUser = null;

  socket.on("join",({roomId, userName})=>{
    if(CurrentRoom){
      socket.leave(CurrentRoom);
      rooms.get(CurrentRoom).delete(CurrentUser)
      io.to(CurrentRoom).emit("userjoined",Array.from(rooms.get(CurrentRoom)));
    }
    CurrentRoom = roomId;
    CurrentUser = userName;
    socket.join(roomId);
    
    if(!rooms.has(roomId)){
      rooms.set(roomId,new Set())
    }
    rooms.get(roomId).add(userName)
    io.to(roomId).emit("userjoined",Array.from(rooms.get(CurrentRoom)));
    console.log("user has joined" , roomId)
  })
  socket.on("codeChange",({roomId,code})=>{
    socket.to(roomId).emit("codeUpdate",code);
  })
  socket.on("leaveRoom",()=>{
    if(CurrentRoom && CurrentUser){
        rooms.get(CurrentRoom).delete(CurrentUser);
        io.to(CurrentRoom).emit("userjoined",Array.from(rooms.get(CurrentRoom)));

        socket.leave(CurrentRoom)
        CurrentRoom = null;
        CurrentUser = null;
      }
  })

  socket.on("typing",({roomId,userName})=>{
    socket.to(roomId).emit("userTyping",userName)

  })
  socket.on("languageChange",({roomId,language})=>{
    io.to(roomId).emit("languageupdate",language)
  })
   socket.on("disconnect",()=>{
      if(CurrentRoom && CurrentUser){
        rooms.get(CurrentRoom).delete(CurrentUser);
        io.to(CurrentRoom).emit("userjoined",Array.from(rooms.get(CurrentRoom)));
      }
      console.log("user disconnected")
    })
})

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname,"")))

  httpserver.listen(PORT, ()=>{
    console.log(`Server is Running http://localhost:${PORT}`)
  })
