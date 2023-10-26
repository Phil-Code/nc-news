import { useContext, useEffect, useState } from "react"
import { LoginContext } from "./Contexts/LoginContext"
import { fetchUsers } from "../utils"

export default function LoginBar(){

    const [input, setInput] = useState('')
    const {login, setLogin} = useContext(LoginContext)
    const [invalidLogin, setInvalidLogin] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetchUsers()
        .then((result)=>{
            const usernames = [];
            result.forEach((user)=>{
                usernames.push(user.username)
            })
            setUsers(usernames)
        })
    }, [])

    function handleLogin(e){
        e.preventDefault();
        if (users.includes(input)){
            setLogin(input)
            setInvalidLogin(false)
            setInput('')
        } else {
            setInvalidLogin(true)
        }

    }
    
    return (
        <div className="login-bar">
           <p> logged in as {login}</p>
           {login === 'Guest' && <form onSubmit={handleLogin}>
            <label htmlFor="login">username (try grumpy19): </label>
            <input value={input} onChange={(e)=>setInput(e.target.value)} id='login' type="text" />
            {invalidLogin? <p>username not found</p> : <></>}
           </form>}
           {login !== 'Guest' && <button onClick={()=>setLogin('Guest')}>logout</button>}
        </div>
    )
}