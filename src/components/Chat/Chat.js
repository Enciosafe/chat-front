import React, {useEffect, useRef} from 'react';
import socket from "./../../socket";
import s from './Chat.module.css'

const Chat = ({users, messages, userName, roomId}) => {
    const [messageValue, setMessageValue] = React.useState('');
    const messagesRef = useRef(null);




    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue
        })
        setMessageValue('')
    }

    useEffect(() => {
        messagesRef.current.scrollTo(0, 999999)
    }, [messages])


    return (
        <div className={s.chat}>
            <div className={s.chatUsers}>
                Комната: <b>{roomId}</b>
                <hr />
                <b>Online ({users.length}):</b>
                <ul>
                    {users.map((name, index) => (
                        <li key={name + index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className={s.chatMessages}>
                <div ref={messagesRef} className={s.messages}>
                    {messages.map((message, index) => (
                        <div key={index} className={userName !== message.userName ? s.message : s.anotherMessage}>
                            <p>{message.text}</p>
                            <div>
                                <span>{message.userName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <form>
          <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"></textarea>
                    <button onClick={onSendMessage} type="button" className="btn btn-primary">
                        send
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Chat;