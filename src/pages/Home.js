import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/Home.module.scss';

export const Home = () => {

    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('Room 1');

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        sessionStorage.setItem('username', username);
        sessionStorage.setItem('room', room);

        // Remove spaces and lowercase room name for url

        let roomPath = room.replace(/\s+/g, '');
        roomPath = roomPath.toLocaleLowerCase();

        navigate(`/room/${roomPath}`);

    }

    useEffect(() => {

        let savedUsername = sessionStorage.getItem('username');

        if (savedUsername) {
            setUsername(savedUsername);
        };

    }, [])

  return (

    <main className={styles.main}>
            
            <section className={styles.section}>

                <h1 className={styles.logo}>Discourse</h1>

                <form className={styles['homepage-form']} onSubmit={handleSubmit}>

                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' onChange={(e) => setUsername(e.target.value)} value={username}  required />

                    <label htmlFor='rooms'>Room</label>
                    <select name='rooms' onChange={(e) => setRoom(e.target.value)} value={room}>
                        <option value='Room 1'>Room 1</option>
                        <option value='Room 2'>Room 2</option>
                    </select>

                    <button type='submit'>Join Chat</button>

                </form>

            </section>

        </main>

  )

}
