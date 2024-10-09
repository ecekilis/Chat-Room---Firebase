import React, { useEffect, useRef, useState } from 'react'
import { collection, addDoc, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from '../firebase';
import Message from '../components/Message';
import EmojiPicker from 'emoji-picker-react'

function ChatPage({ room, setRoom }) {

    const [text, setText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const lastMsg = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (text.trim() === "") return


        const messages = collection(db, "messages");
        await addDoc(messages, {
            text,
            room,
            author: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photo: auth.currentUser.photoURL
            },
            createdAt: serverTimestamp(),



        });
        setText("");
    }



    useEffect(() => {

        const messagesCol = collection(db, "messages");


        const q = query(messagesCol, where("room", "==", room),
            orderBy("createdAt", "asc"))



        const unsub = onSnapshot(q, (snapshot) => {

            let temp = [];
            snapshot.docs.forEach(doc => {
                temp.push(doc.data());
            });
            lastMsg.current.scrollIntoView({ behavior: "smooth" });
            setMessages(temp);
        })



        return () => { unsub() }
    }, []);













    return (
        <div className='chat-page'>
            <header>
                <p>{auth.currentUser?.displayName}</p>
                <p>{room}</p>
                <button onClick={() => setRoom(null)}>Different Room</button>
            </header>
            <main>
                {messages.length < 1 ? (
                    <div className="warn">
                        <p>Send first message :)</p>
                    </div>
                ) : (
                    messages.map((data, key) => <Message data={data} key={key} />)
                )}

                <div ref={lastMsg} />
            </main>
            <form className="send-form" onSubmit={handleSubmit}>
                <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='write your message' />
                <div>
                    <EmojiPicker
                        onEmojiClick={(e) => {
                            setText(text + e.emoji);
                            setIsOpen(false);
                        }}
                        open={isOpen}
                        skinTonesDisabled
                    />
                    <button type="button" onClick={() => setIsOpen(!isOpen)}>
                        😉
                    </button>
                </div>

                <button type="submit">Send</button>
            </form>
        </div>
    )

}
export default ChatPage
