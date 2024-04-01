import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Socials from '../components/Socials'
import html2canvas from 'html2canvas'
import download from 'downloadjs'

export default function Page() {
    const params = useParams()
    const username = params.id
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [socials, setSocials] = useState(false)
    const copyHandler = () => {
        const input = document.querySelector(".link > div >input")
        input.select()
        document.execCommand('copy')
    }
    const saveImage = async () => {
        setSocials(true);
        setTimeout(async () => {
            const element = document.querySelector(".socials");
            const canvas = await html2canvas(element);
            const data = canvas.toDataURL('image/jpg');
            download(data, "Se9si - To Socials.png", "image/png");
            setSocials(false);
        }, 10);
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/user/${username}`)
            const data = await res.json()
            document.title = `Se9si | @${username} ✨`
            if (localStorage.getItem("UserID") !== data?._id) {
                document.body.style.display = "none"
                window.location.href = "/"
            }
            setData(data)
            setIsLoading(false)
        }
        fetchData()
    }, [username])
    return (
        <div className='user-page'>
            {socials && <Socials name={data.username} />}
            {isLoading && <Loader />}
            {data.username ? (<h2 style={{ textAlign: 'center' }}>Welcome back {data.username} 💘</h2>) : (
                <div className='not-found'>
                    <h1>User not found</h1>
                </div>
            )}
            {data.questions && (
                <>
                    <div className='link'>
                        <h3>Step 1: Copy your link 🔗</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '1vh' }}>
                            <input type='text' value={`${window.location.origin}/${data.username}`} readOnly></input>
                            <p onClick={copyHandler}>📋</p>
                        </div>
                    </div>
                    <div className='link'>
                        <h3>Step 2: Share on social media 📲</h3>
                        <p>get more questions from your friends!</p>
                        <button style={{ color: 'purple', border: '2px solid purple' }} onClick={saveImage}>Save Image</button>
                    </div>
                    <div className='container'>
                        <h3>Inbox</h3>
                        <div>
                            {data.questions?.map((question, index) => {
                                return (
                                    <Message data={question} key={index} />
                                )
                            })}
                        </div>
                    </div>
                        <button className='logout-btn' onClick={()=>{
                            localStorage.clear()
                            window.location.href = '/'
                        }}>Logout</button>
                </>
            )}
        </div>
    )
}
