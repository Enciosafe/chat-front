import React, {useState} from 'react';
import s from './Join.module.css'
import axios from "axios";


const Join = ({onLogin}) => {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(false)



    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert('wrong data')
        }
        const obj = {
            roomId,
            userName
        }
        setLoading(true)
        await axios.post('https://simple-chat-node-react.herokuapp.com/rooms' , obj)
        onLogin(obj)
    }


    return (
        <div>
                <div className={s.container}>
                    <p><input className={s.input} type="text" placeholder='room ID' value={roomId} onChange={(e) => {setRoomId(e.target.value)}}/></p>
                    <p><input className={s.input} type="text" placeholder='name' value={userName} onChange={(e) => {setUserName(e.target.value)}}/></p>
                    <button disabled={isLoading} onClick={onEnter} className={s.btn}>
                        {isLoading ? 'Loading...' : 'Enter'}
                    </button>
                </div>
        </div>
    );
};

export default Join;