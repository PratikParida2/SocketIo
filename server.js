import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  
const app=express();
const server=http.createServer(app);
const io=new Server(server);
const port=8080;
app.set('view engine',"ejs");
app.set('views', path.join(__dirname, 'views'));
io.on('connection',(socket)=>{
    console.log("user connected");
    socket.on('message',(msg)=>{
        console.log(msg);
        socket.broadcast.emit('messageFromServer',msg)
    })
}) 
app.get('/',(req,res)=>{
    res.render("Home")
})
server.listen(port,()=>{
    console.log("server is Started at port number "+port);
    
})