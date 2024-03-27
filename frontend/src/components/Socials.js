import React, { useEffect } from 'react'

export default function Socials(props) {
  useEffect(() => {
    async function fetchProfilePic() {
      const res = await fetch(`https://snapinst.com/api/ig/userInfoByUsername/${props.name}`, {
        headers: {
          "User-Agent": "PostmanRuntime/7.37.0"
        }
      })
      const data = await res.json()
      const picURL = data.result.user.hd_profile_pic_url_info.url
      console.log(picURL)
    }
    fetchProfilePic()
  }, [])
  if (props.name) {
    return (
      <div className='socials'>
        <div>
          <h1>Se9si {props.name}</h1>
          <p>Im waiting for your messages 👀</p>
        </div>
        <div className='question-box'>
          <div className='top'>
            <h4>ask me a question</h4>
          </div>
          <div className='bottom'>
            <textarea id='question' rows="3" placeholder={`Write your question here`}></textarea>
          </div>
        </div>
        <div>
          <h5>Se9si</h5>
          <p style={{ fontWeight: 300 }}>{String(window.location.origin).split("//")[1]}/{props.name}</p>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='socials'>
        <h1>User not found.</h1>
      </div>
    )
  }
}
