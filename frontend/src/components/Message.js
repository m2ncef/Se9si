import React, { useEffect, useState } from 'react'

export default function Message(props) {
    const question = props.data
    const [show, setShow] = useState(false)
    const [data, setData] = useState([])
    const [isReveal, setIsReveal] = useState(false)
    const revealMore = () => {
        setIsReveal(true)
        async function fetchData(){
            console.log(process.env.REACT_APP_IPINFO_KEY)
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
                            <>
                                <p>IP: {question.IP}</p>
                                <p>User Agent: {question.UA}</p>
                                <p>City: {data.region} - {data.city}</p>
                                <p>Country: {data.country}</p>
                            </>
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
