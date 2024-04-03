import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default function () {
  const [user, setUser] = useState('')
  const [btnIsLoading, setBtnIsLoading] = useState(false)
  const signup = async () => {
    setBtnIsLoading(true)
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
        setBtnIsLoading(false)
        if (!r.ok) {
          console.log("Authentification failed, try again.")
        }
        return r.json()
      })
      .then(data => {
        setBtnIsLoading(false)
        if (data.username) {
          toast.success(`hi ${data.username} 💘 welcome back ✨`)
          localStorage.setItem("UserID", data._id)
          localStorage.setItem("Username", data.username)
          setTimeout(() => {
            window.location.href = `/user/${data.username}`
          }, 2000)
        } else {
          toast.error(data.message)
        }
      })
      .catch(error => {
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
      <Toaster/>
      <h2>Choose a username</h2>
      <div>
        <input onChange={(e) => setUser(e.target.value)} type='text' placeholder='moncef' />
        <input type="tel" pattern="\d*" id="pin" maxLength="4" placeholder="Your Pin (eg: 1234)" />
      </div>
      <button className={btnIsLoading && 'sending'} onClick={() => signup()}>Done</button>
    </div>
  )
}
