import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import SingleArticle from './Components/SingleArticle'
import NavBar from './Components/NavBar'
import PostComment from './Components/PostComment'

function App() {
  
  return (
          <>
          <header>
            <NavBar/>
          </header>
          <main>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/articles/:article_id' element={<SingleArticle/>}/>
            </Routes>
          </main>
          </>
  )
}

export default App
