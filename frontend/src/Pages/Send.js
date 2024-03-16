import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Page() {
  const params = useParams()
  const username = params.id
  const [anonymous, setAnonymous] = useState(true)
  const [data, setData] = useState([])
  const checkboxHandler = () => {
    setAnonymous(document.querySelector("#anonymous").checked)
  }
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3001/user/${username}`)
      const data = await res.json()
      document.title = `Se9si | @${data.username} ✨`
      setData(data)
    }
    fetchData();
  }, [])
  async function PostData() {
    var data;
    await fetch(`http://localhost:3001/PostQuestion/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: anonymous ? 'Unknown' : document.querySelector("input[type=text]").value,
        question: document.querySelector("textarea").value
      })
    })
      .then(res => {
        if (!res.ok) {
          alert("Message not sent.")
          return
        }
        res.json()
      })
      .then(d => {
        let data = d;
        document.querySelector("textarea").value = ""
        if (document.querySelector("input[type=text]")) document.querySelector("input[type=text]").value = ""
      })
  }
  return (
    <>
      <div className='ask-container'>
        <>
          <div className='question-box'>
            <div className='top'>
              <img src='https://ngl.link/images/default_avatar.png'></img>
              <div>
                <p>@{data.username}</p>
                <h4>ask me a question</h4>
              </div>
            </div>
            <div className='bottom'>
              <div className='checkbox'>
                <input checked={anonymous} id='anonymous' type='checkbox' onChange={checkboxHandler}></input>
                <label>Anonymously</label>
              </div>
              {!anonymous && (
                <input type='text' placeholder='your name..' />
              )}
              <textarea id='question' rows="3" placeholder={`ask me`}></textarea>
            </div>
          </div>
          <button onClick={() => PostData()} className='btn'>send</button>
        </>
      </div>
    </>
  )
}