import { Link } from "react-router-dom"
import LoginBar from "./LoginBar"

export default function NavBar(){

    return (
        <div className="nav-bar">
            <Link className="title" to='/'>NC News</Link>
            <LoginBar/>
        </div>
    )
}