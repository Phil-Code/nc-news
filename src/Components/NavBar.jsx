import { Link } from "react-router-dom"
import TopicLinks from "./TopicLinks"

export default function NavBar(){

    return (
        <div>
            <Link to='/'>
                <h1>NC News</h1>
            </Link>
            <TopicLinks/>
        </div>
    )
}