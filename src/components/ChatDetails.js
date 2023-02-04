import styles from '../styles/ChatDetails.module.scss';

export const ChatDetails = ({ room, users, username }) => {

  return (

    <>
    
        <div className={styles['detail-container']}>

            <h2 className={styles['detail-heading']}>Room Name</h2>

            <p className={styles['room-name']}>{room}</p>

        </div>

        <div className={styles['detail-container']}>

            <h2 className={styles['detail-heading']}>Users</h2>

            <ul className={styles['users-list']}>

                {users.map((user, index) => (
                  
                  <li className={styles.user} key={index}>
                    
                    {

                      user === username ? `${user} (Me)` : user

                    }

                  </li>

                ))}

            </ul>

        </div>

    </>

  )

}
