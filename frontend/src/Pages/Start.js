import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function () {
    const [user, setUser] = useState('')
    const [data, setData] = useState([])
    const signup = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user && user,
                pin: document.querySelector("#pin")?.value
            })
        })
            .then(r => {
              if(!r.ok){
                console.log("Authentification failed, try again.")
              }
              return r.json()
            })
            .then(data => {
                if(data.username){
                  toast(`hi ${data.username} 💘 welcome back ✨`)
                  localStorage.setItem("UserID", data._id)
                  localStorage.setItem("Username", data.username)
                  window.location.href = `/user/${data.username}`
                } else {
                  toast(data.message)
                }
            })
            .catch (error => {
              console.log(`Error: ${error}`)
            })
    }
    useEffect(() => {
        if (localStorage.getItem("UserID")) {
            window.location.href = `/User/${localStorage.getItem("Username")}`
        }
    })
    return (
        <div className='start-container'>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        />
        <h2>Choose a username</h2>
            <div>
                <input onChange={(e)=>setUser(e.target.value)} type='text' placeholder='moncef'/>
                {data ? (<input type="tel" pattern="\d*" id="pin" maxlength="4" placeholder="Your Pin (eg: 1234)" />) : (<input type="tel" pattern="\d*" id="pin" maxlength="4" placeholder="Create a pin (eg: 1234)" />)}
            </div>
            <button onClick={()=>signup()}>Done</button>
        </div>
    )
}
