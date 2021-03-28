import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
let socket;


const Chat = ({location}) =>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    const ENDPOINT = 'http://localhost:5000'; 
    useEffect(() =>{
        const {room, name} = queryString.parse(location.search);
        setName(name);
        setRoom(room);

        socket = io(ENDPOINT, {transports: ['websocket']});

        // console.log(socket);

        socket.emit('join', {name, room}, () =>{

        })

        return () =>{
            socket.emit('disconnec');

            socket.off();
        }
    }, [ENDPOINT, location.search])


    useEffect(() =>{
        socket.on('message', (message) =>{
            setMessages([...messages, message])
        })
    }, [messages])

    

    const sendMessage = (e) =>{
        e.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    

console.log(message,messages);


    return(
        <div>
            <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMessage(event):'null' } />
        </div>
        )}

export default Chat;