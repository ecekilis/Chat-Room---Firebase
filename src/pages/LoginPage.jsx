import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../firebase'

function LoginPage({ setIsAuth }) {



    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                setIsAuth(data.user.refreshToken)

                localStorage.setItem("token", data.user.refreshToken)
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='container'>
            <div className='login'>
                <h1>Chat Odasi</h1>
                <p>Login</p>
                <button onClick={handleClick}>
                    <img src="g-logo.png" alt="" />
                    <span>Login with Google </span> </button>
            </div>
        </div>
    )
}

export default LoginPage
