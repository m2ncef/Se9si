import React, { useEffect, useState } from 'react'

export default function () {
    const [user, setUser] = useState('')
    useEffect(()=>{
        async function fetchData(){
            const res = await fetch(`https://se9si-api.vercel.app/user/${user}`)
            if(res.ok) {
                console.log('found')
                const data = await res.json()
                return
            }
        }
        fetchData()
    }, [user])
    return (
        <div className='start-container'>
            <h2>Choose a username</h2>
            <input type='text' placeholder='moncef'/>
            <button onClick={()=>{setUser(document.querySelector(".start-container > input").value)}}>Done!</button>
        </div>
    )
}
