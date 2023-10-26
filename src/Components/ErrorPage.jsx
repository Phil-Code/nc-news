import { Link } from "react-router-dom"

export default function ErrorPage(){

    return (
        <div>
            <h2>Sorry, we can't find the content you're looking for</h2>
            <h3><Link to='/'>home</Link></h3>
        </div>
    )
}