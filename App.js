import React from 'react';import logo from './logo.svg';import './App.scss';import socketClient  from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";
function App() {
    var socket = socketClient (SERVER);
    socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
});

export default App;