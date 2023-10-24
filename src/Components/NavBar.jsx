import { Link } from "react-router-dom"

export default function NavBar(){

    return (
        <div>
            <Link to='/'>
                <h1>NC News</h1>
            </Link>
        </div>
    )
}