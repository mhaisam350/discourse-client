import styles from '../styles/ChatMessage.module.scss';

export const ChatMessage = ({ username, sender, text, time, color }) => {

  const flexJustifyClass = username === sender ? styles['flex-right'] : styles['flex-left'];
  
  const messageClass = username === sender ? styles['sender'] : styles['receiver'];
  
  return (

    <div className={styles['message-flex-container'] + " " + flexJustifyClass}>

      <div className={styles['message-container'] + " " + messageClass}>

        <div className={styles['flex-container']}>

          <p style={{color: color}} className={styles['message-sender']}>{ username === sender ? 'Me' : sender }</p>

          <p className={styles['message-time']}>{time}</p>
          
        </div>

        <p className={styles.message}>{text}</p>

      </div>

    </div>
  
  )
  
}
