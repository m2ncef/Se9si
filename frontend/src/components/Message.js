import React, { useState } from 'react'

export default function Message(props) {
    const question = props.data
    const [show, setShow] = useState(false)
    const [data, setData] = useState([])
    const [isReveal, setIsReveal] = useState(false)
    const revealMore = () => {
        setIsReveal(true)
        async function fetchData(){
            const res = await fetch(`https://ipinfo.io/${question.IP}/json?token=${process.env.REACT_APP_IPINFO_KEY}`)
            const data = await res.json()
            setData(data)
        }
        fetchData();
    }
    return (
        <>
            {show && (
                <div className='popup'>
                    <p onClick={() => setShow(!show)}>❌</p>
                    <div className='modal'>
                        <h4>{question.name}</h4>
                        <p>{question.question}</p>
                        {!isReveal && <button style={{ color: 'black', background: '#9f4595' }} onClick={revealMore}>Reveal more data 😈</button>}
                        {isReveal && (
                            <div>
                                <p><b><i>IP: </i></b> {question.IP}</p>
                                <p><b><i>User Agent: </i></b> {question.UA}</p>
                                <p><b><i>City: </i></b> {data.region} - {data.city}</p>
                                <p><b><i>Country: </i></b> {data.country}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className='message' onClick={() => setShow(!show)}>
                <h3 style={{ filter: question.opened ? 'brightness(.7) opacity(.8) grayscale(1);' : 'none' }}>{question.name === "Unknown" ? '❓' : '💌'}</h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4>{question?.name}</h4>
                    <p>{question?.question}</p>
                </div>
            </div>
        </>
    )
}
