import express from "express"
import http  from "http"
import {Server} from "socket.io"



const app = express();
const httpserver = http.createServer(app);
const PORT = 3000;


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
})

  httpserver.listen(PORT, ()=>{
    console.log(`Server is Running http://localhost:${PORT}`)
  })
