import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'

export default function () {
    const [user, setUser] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        let host = window.location.host;
        let parts = host.split(".");
        let subdomain = "";
        if (parts.length >= 4) {
          subdomain = parts[0];
          parts.splice(0, 1);
          window.location.href = `${window.location.protocol}//${parts.join(".")}/${subdomain}`
        }
    },[])
    useEffect(() => {
        setIsLoading(false)
        async function fetchData() {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/user/${user}`)
            const data = await res.json()
            setData(data)
            if (data) {
                document.querySelector(".start-container > div").innerHTML += '<input type="text" pattern="\d*" id="pin" maxlength="4" placeholder="Your Pin (eg: 1234)"/>'
                document.querySelector(".start-container > div > input").value = user
                document.querySelector(".start-container > button").textContent = "Done!"
                document.querySelector(".start-container > button").addEventListener('click', async () => {
                    if (document.querySelector("#pin").value == data.pin) {
                        document.querySelector("#pin").style.border = "2px solid green"
                        document.querySelector(".start-container > div > input").style.border = "2px solid green"
                        localStorage.setItem("UserID", data._id)
                        window.location.href = `/user/${data.username}`
                    }
                    else {
                        document.querySelector("#pin").value = ""
                        document.querySelector("#pin").style.border = "2px solid red"
                    }
                })
            } else {
                document.querySelector(".start-container > div").innerHTML += '<input type="text" pattern="\d*" id="pin" maxlength="4" placeholder="Create a pin (eg: 1234)"/>'
                document.querySelector(".start-container > div > input").value = user
                document.querySelector(".start-container > button").textContent = "Done!"
                document.querySelector(".start-container > button").addEventListener('click', async () => {
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
                            window.location.href = `/user/${data.username}`
                        })
                })
            }
        }
        fetchData()
    }, [user])
    return (
        <div className='start-container'>
            {isLoading && <Loader/>}
            <h2>Choose a username</h2>
            <div>
                <input type='text' placeholder='moncef' />
            </div>
            <button onClick={() => { setUser(document.querySelector(".start-container > div > input").value) }}>Next</button>
        </div>
    )
}
