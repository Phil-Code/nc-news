import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import SingleArticle from './Components/SingleArticle'
import NavBar from './Components/NavBar'
import TopicArticles from './Components/TopicArticles'

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
              <Route path='/topic/:topic' element={<TopicArticles/>}/>
            </Routes>
          </main>
          </>
  )
}

export default App
