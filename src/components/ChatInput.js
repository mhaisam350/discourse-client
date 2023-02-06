import { useState, useRef } from 'react';

import moment from 'moment';

import styles from '../styles/ChatInput.module.scss';

export const ChatInput = ({ socket }) => {

    const inputRef = useRef();

    const [message, setMessage] = useState('');

    let time;

    const handleSubmit = (e) => {

        e.preventDefault();

        // Check for empty input
        if (message.trim().length === 0) return;

        time = moment().format('h:mm a');

        // Emit message to server
        socket.emit('chatMessage', message);

        // Reset message input to empty
        setMessage('');

        // Keep focus on input after message sent
        inputRef.current?.focus();

    }

    const handleEnter = (e) => {

        if (message.trim().length === 0) return;

        // Check if Enter key is pressed
        if (e.keyCode === 13 && !e.shiftKey) {

            e.preventDefault();

            time = moment().format('h:mm a');

            socket.emit('chatMessage', message);
            
            setMessage('');

            inputRef.current?.focus();

        }

    }

  return (

    <form onSubmit={handleSubmit} onKeyDown={handleEnter} className={styles.form}>
    
        <textarea ref={inputRef} name='chat-input' placeholder='Type a message' value={message} onChange={(e) => setMessage(e.target.value)} className={styles.textarea} />

        <button type='submit' className={styles['submit-btn']}>Send</button>

    </form>
  
  )

}
