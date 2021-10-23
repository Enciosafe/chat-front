
import Join from './components/Join/Join'
import socket from "./socket";
import './App.css'
import {useEffect, useReducer} from "react";
import reducer from "./reducer";
import Chat from "./components/Chat/Chat";
import axios from "axios";



const App = () => {

    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: [],
    })


    const onLogin = async (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj,
        })
        socket.emit('ROOM:JOIN', obj)
        const { data } = await axios.get(`https://simple-chat-node-react.herokuapp.com/rooms/${obj.roomId}`)
       dispatch({
           type: 'SET_DATA',
           payload: data,
       })
    }

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }

    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers)
        socket.on('ROOM:NEW_MESSAGE', message => {
            dispatch({
                type: 'NEW_MESSAGE',
                payload: message
            })
        })
    }, [])


    console.log(state)
    return <div className='container'>
        {!state.joined ? <Join onLogin={onLogin}/> : <Chat {...state} />}
        </div>

}

export default App;
