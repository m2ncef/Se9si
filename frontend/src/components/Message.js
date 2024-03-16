import React, { useState } from 'react'

export default function Message(props) {
    const question = props.data
    const [show, setShow] = useState(false)
    return (
        <>
            {show && (
                <div className='popup' onClick={()=>setShow(!show)}>
                    <div className='modal'>
                        <h4>{question.name}</h4>
                        <p>{question.question}</p>
                        <button style={{color:'black', background:'#9f4595'}}>Reveal more data 😈</button>
                    </div>
                </div>
            )}
            <div className='message' onClick={()=>setShow(!show)}>
                <h3 style={{ filter: question.opened ? 'brightness(.7) opacity(.8) grayscale(1);' : 'none' }}>{question.name === "Unknown" ? '❓' : '💌'}</h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4>{question?.name}</h4>
                    <p>{question?.question}</p>
                </div>
            </div>
        </>
    )
}
