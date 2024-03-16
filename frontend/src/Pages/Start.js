import React, { useEffect, useState } from 'react'

export default function () {
    const [user, setUser] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/user/${user}`)
            const data = await res.json()
            setData(data)
            if (data) {
                document.querySelector(".start-container > div").innerHTML += '<input type="number" id="pin" maxlength="4" placeholder="Your Pin (eg: 1234)"/>'
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
                document.querySelector(".start-container > div").innerHTML += '<input type="number" id="pin" maxlength="4" placeholder="Create a pin (eg: 1234)"/>'
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
            <h2>Choose a username</h2>
            <div>
                <input type='text' placeholder='moncef' />
            </div>
            <button onClick={() => { setUser(document.querySelector(".start-container > div > input").value) }}>Next</button>
        </div>
    )
}
