import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from '../styles/Room.module.scss';

import { generateColor } from '../utils/generateColor';

import { io } from 'socket.io-client';

import { ChatDetails } from '../components/ChatDetails';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';

let socket;

export const Room = () => {

    const navigate = useNavigate();

    const { name } = useParams();

    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);

    const handleClick = () => {

        sessionStorage.removeItem('room');

        socket.disconnect();

        navigate('/');

    }

    useEffect(() => {
        
        socket = io('http://192.168.18.13:4000');

        setUsername(sessionStorage.getItem('username'));
        setRoom(sessionStorage.getItem('room'));

        socket.on('message', message => {

            setMessages(messages => [...messages, message]);

        });

        socket.on('roomUsers', roomUsersArray => {

            setRoomUsers(roomUsersArray);

        });

    }, [])

    useEffect(() => {

        if (username && room) {

            let color = generateColor();

            socket.emit('joinRoom', { username, room, color });

        };


    }, [username, room])

    useEffect(() => {

        let roomPath = room.replace(/\s+/g, '');
        roomPath = roomPath.toLocaleLowerCase();

        if (room.length === 0) {
            return;
        }

        // Redirect to Home if room name and url paramater aren't the same

        if (roomPath !== name) {

            socket.disconnect();

            navigate('/');
        }

    }, [room, name, navigate])

  return (

    <main className={styles.main}>

        <section className={styles.section}>

            <section className={styles['chat-header']}>

                <h1 className={styles.logo}>Discourse</h1>
                <button className={styles['leave-btn']} onClick={handleClick}>Leave Room</button>

            </section>

            <section className={styles['chat-dashboard']}>

                <section className={styles['chat-details']}>
                    <ChatDetails room={room} users={roomUsers} username={username} />
                </section>

                <section className={styles['chat-window']}>

                    <div className={styles['chat-content']}>

                    {messages?.map((message, index) => (

                        <ChatMessage key={index} username={username} sender={message.username} text={message.text} time={message.time} color={message.color} />

                    ))}

                    </div>

                </section>
                
            </section>

            <section className={styles['chat-input']}>
                <ChatInput socket={socket} />
            </section>

        </section>

    </main>

  )

}
