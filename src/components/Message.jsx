import React from 'react'
import { auth } from '../firebase'


function Message({ data }) {
    if (auth.currentUser.uid === data.author.id) {
        return <p className='msg-user'>{data.text}</p>
    }
    return (
        <div className='msg-other'>
            <div>
                <img src={data.author.photo} alt="" />
                <span>{data.author.name}</span>
            </div>
        </div>
    )
}

export default Message
