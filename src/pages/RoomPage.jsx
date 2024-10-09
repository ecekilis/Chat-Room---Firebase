import React from 'react'

function RoomPage({ setIsAuth, setRoom }) {


    const logOut = () => {
        setIsAuth(false);
        localStorage.removeItem("token")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const room = e.target[0].value.toLocaleLowerCase();//Locale(bilgisayarin diline gore cevirir. buyuk kucuk i'lerde hatali yazimi engeller)
        setRoom(room);

        console.log(room);
    }


    return (
        <form onSubmit={handleSubmit} className='room-page'>
            <h1>Chat Room</h1>
            <p>Which room?</p>
            <input type="text" placeholder='haftaici' required />
            <button type='submit'>Odaya Gir</button>
            <button type='button' onClick={logOut}>Logout</button>
        </form>
    )
}

export default RoomPage
