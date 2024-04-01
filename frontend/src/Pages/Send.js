import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../components/Loader'

export default function Page() {
  const params = useParams()
  const [anonymous, setAnonymous] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [isSending, setIsSending] = useState(false)
  const checkboxHandler = () => {
    setAnonymous(document.querySelector("#anonymous").checked)
  }
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/user/${params.id}`)
      const data = await res.json()
      document.title = `Se9si | @${data.username} ✨`
      setData(data)
      setIsLoading(false)
    }
    fetchData();
  }, [])
  async function PostData() {
    setIsSending(true)
    var data;
      const ipres = await fetch("https://api64.ipify.org?format=json")
      const ipData = await ipres.json()
    await fetch(`${process.env.REACT_APP_BACKEND_API}/PostQuestion/${params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: anonymous ? 'Unknown' : document.querySelector("input[type=text]").value,
        question: document.querySelector("textarea").value,
        UA: window.navigator.userAgent,
        IP: ipData.ip
      })
    })
      .then(res => {
        if (!res.ok) {
          toast('Message not sent, try again.')
          setIsSending(false)
          return
        }
        res.json()
      })
      .then(d => {
        toast('Message sent ✨')
        let data = d;
        document.querySelector("textarea").value = ""
        if (document.querySelector("input[type=text]")) document.querySelector("input[type=text]").value = ""
        setIsSending(false)
      })
  }
  return (
    <>
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
      <div className='ask-container'>
        {isLoading && <Loader />}
        <>
          <div className='question-box'>
            <div className='top' style={{ flexDirection: 'row' }}>
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
              <textarea id='question' rows="3" placeholder={`Write your question here`}></textarea>
            </div>
          </div>
          <button onClick={() => PostData()} className={`btn ${isSending ? 'sending' : ''}`}>send</button>
        </>
        <button className='make-your-own' onClick={() => {
          localStorage.clear()
          window.location.href = '/'
        }}>tap to make your own</button>
      </div>
    </>
  )
}
