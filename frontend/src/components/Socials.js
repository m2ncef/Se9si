import React from 'react'

export default function Socials(props) {
  if (props.name) {
    return (
      <div className='socials'>
        <div>
          <h1>Se9si {props.name}</h1>
          <p>Im waiting for your messages 👀</p>
        </div>
        <div className='question-box'>
              <div className='top'>
                  <p>@{props.name ? props.name : 'unknown'}</p>
                  <h4>ask me a question</h4>
              </div>
              <div className='bottom'>
                <textarea id='question' rows="3" placeholder={`Write your question here`}></textarea>
              </div>
            </div>
        <div>
          <h5>Se9si</h5>
          <p style={{fontWeight:300}}>se9si.vercel.app/{props.name}</p>
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
