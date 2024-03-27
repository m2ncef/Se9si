import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import bcrypt from 'bcryptjs'

export default function () {
    const [user, setUser] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const signup = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                pin: document.querySelector("#pin").value
            })
        })
            .then(r => r.json())
            .then(data => {
                localStorage.setItem("UserID", data._id)
                localStorage.setItem("Username", data.username)
                window.location.href = `/user/${data.username}`
            })
    }
    const login = async () => {
        const match = await bcrypt.compare(document.querySelector("#pin").value, data.pin)
        if (match) {
            document.querySelector("#pin").style.border = "2px solid green"
            document.querySelector(".start-container > div > input").style.border = "2px solid green"
            localStorage.setItem("UserID", data._id)
            localStorage.setItem("Username", data.username)
            window.location.href = `/user/${data.username}`
        }
        else {
            document.querySelector("#pin").value = ""
            document.querySelector("#pin").style.border = "2px solid red"
            document.querySelector("#pin").style.animation = "shake .7s ease-in-out"
            setTimeout(() => {
                document.querySelector("#pin").style.animation = "";
            }, 700);
        }
    }
    const btnHandler = ()=>{
        if (data) {
            login()
        } else {
            signup()
        }
    }
    useEffect(() => {
        if (localStorage.getItem("UserID")) {
            window.location.href = `/User/${localStorage.getItem("Username")}`
        }
    })
    useEffect(() => {
        setIsLoading(false)
        async function fetchData() {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/user/${user}`)
            const data = await res.json()
            setData(data)
        }
        fetchData()
    }, [user])
    return (
        <div className='start-container'>
            {isLoading && <Loader />}
            <h2>Choose a username</h2>
            <div>
                <input onChange={(e)=>setUser(e.target.value)} type='text' placeholder='moncef'/>
                {data ? (<input type="tel" pattern="\d*" id="pin" maxlength="4" placeholder="Your Pin (eg: 1234)" />) : (<input type="tel" pattern="\d*" id="pin" maxlength="4" placeholder="Create a pin (eg: 1234)" />)}
            </div>
            <button onClick={btnHandler}>{data ? 'Login' : 'Signup'}</button>
        </div>
    )
}
