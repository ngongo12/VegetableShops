import React from 'react';
import socketIO from 'socket.io-client';
import apiURL from '../constants/api_url';

export const socket = socketIO(apiURL, {
    transports: ['websocket'],
    
});

export const startSocket = () => {
    socket.connect();
    
    socket.on('connect', () => {
        console.log('Connect to server');
    })

    socket.on('disconnect', () => {
        console.log('Disconnect to server ');
    });

    socket.on('connect_error', () => {
        console.log('Error to connect server. Retry to connect ...');
        socket.connect();
    });
}

export default {
    socket,
    startSocket
}