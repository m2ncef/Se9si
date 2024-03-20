import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'

export default function Page() {
    const copyHandler = () => {
        const input = document.querySelector(".link > div >input")
        input.select()
        document.execCommand('copy')
    }
    const params = useParams()
    const username = params.id
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        async function fetchData(){
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/User/${username}`)
            const data = await res.json()
            document.title = `Se9si | @${username} ✨`
            if(localStorage.getItem("UserID") !== data?._id){
                document.body.style.display = "none"
                window.location.href = "/"
            }
            setData(data)
            setIsLoading(false)
        }
        fetchData()
    }, [])
    return (
        <div className='user-page'>
            {isLoading && <Loader/>}
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
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:'1vh'}}>
                        <input type='text' value={`${window.location.origin}/${data.username}`} readOnly></input>
                        <p onClick={copyHandler}>📋</p>
                        </div>
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
