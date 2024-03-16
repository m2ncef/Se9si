import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'

export default function Page() {
    const params = useParams()
    const username = params.id
    const [data, setData] = useState([])
    useEffect(()=>{
        async function fetchData(){
            const res = await fetch(`http://localhost:3001/User/${username}`)
            const data = await res.json()
            setData(data)
            document.title = `Se9si | @${data.username} ✨`
        }
        fetchData()
    }, [])
    return (
        <div className='user-page'>
            {data.username ? (<h2 style={{ textAlign: 'center' }}>Welcome back {data.username} 💘</h2>) : (
                <div className='not-found'>
                    <h1>User not found</h1>
                </div>
            )}
            {data.questions ? (
                <>
                    <div className='link'>
                        <h3>Share your link 🔗</h3>
                        <p>get more questions from your friends!</p>
                        <input type='text' value={`${window.location.origin}/send/${data.username}`} readOnly></input>
                    </div>
                    <div className='container'>
                        <h3>Inbox</h3>
                        <div>
                            {data.questions?.map((question, index) => {
                                return (
                                    <Message data={question} key={index}/>
                                )
                            })}
                        </div>
                    </div>
                </>
            ) : ''}
        </div>
    )
}
