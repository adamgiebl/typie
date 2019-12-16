/* eslint-disable linebreak-style */
/* eslint-disable */
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const socket = require('socket.io');
const htmlEscape = require('./helper');

function socketMethods(socket) {
    const parser = xml2js.Parser();
    const roomList = [];
    let roomName;
    let letters;
    const room = {
        name: '',
        password: '',
        paragraph: '',
        letters: [],
    };
    let paragraph;
    socket.emit('refreshList', roomList);
    socket.emit('socketid', socket.id);
    let currentRoom;
    console.log('made socket conn', socket.id);

    socket.on('create', (Xroom, Xpassword) => {
        roomName = htmlEscape(Xroom);
        room.password = htmlEscape(Xpassword);
        roomPassword = Xpassword;
        if (roomList.indexOf(room) < 0 /* checkExists(roomList, room.name)*/) {
        console.log(`${roomName  } room created`);
        let newRoom = { name: roomName, password: roomPassword };
        roomList.push(newRoom);
        socket.emit('join', newRoom.name);
        io.sockets.emit('refreshList', roomList);
        if (socket.join(newRoom.name)) {
            currentRoom = newRoom.name;
            console.log(`${socket.id  } is in ${  newRoom.name}`);
        } else {
            console.log('room connection failed');
        }
        } else {
        socket.emit('roomExists');
        console.log('room already exists');
        }
    });
    socket.on('join', (roomName) => {
    if (io.sockets.adapter.rooms[roomName].length < 2 && io.sockets.adapter.rooms[roomName].length > 0) {
        socket.emit('join', roomName);
        socket.join(roomName);
        currentRoom = roomName;
        let clientNumber = io.sockets.adapter.rooms[roomName].length;
        console.log(`${socket.id  } is in ${  roomName}`);
        io.sockets.in(roomName).emit('roomName', roomName);
        console.log(`number of players in room ${  roomName  } ${  clientNumber}`);
        if (io.sockets.adapter.rooms[roomName].length == 2) {
        request('http://api.blabot.net?format=xml&scount=2&dictionary=2', (error, response, data) => {
            if (!error && response.statusCode == 200) {
                parser.parseString(data, function (err, result) {
                    paragraph = result.blabot.result[0].item[0];
                    letters = paragraph.split("");
                    //letters = letters.map(function(item) { return item == " " ? "&nbsp;" : item; });
                });
                if (io.sockets.in(roomName).emit('gameStart', letters)) {
                    console.log('paragraph in ' + roomName);
                }
            }
        });
        }
        room.name = roomName;
        roomList.remove(room.name);
        console.log(`${roomName  } removed from list`);
        io.sockets.emit('refreshList', roomList);
    } else {
        console.log('room if full or non-existing');
    }
    });


    //logic for checking characters
    socket.on('charTyped', (charTyped, currentLetter) => {
        if (charTyped === currentLetter) {
            socket.emit('rightChar');
        }
    });


    //user has left
    socket.on('disconnect', () => {
        console.log(`${socket.id  } disconnected`);
        roomList.remove(currentRoom);
        socket.broadcast.in(currentRoom).emit('userLeft');
        console.log(`${currentRoom  } removed from list`);
        socket.emit('refreshList', roomList);
    });
}


module.exports = socketMethods