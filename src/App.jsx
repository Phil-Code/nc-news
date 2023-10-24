import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import SingleArticle from './Components/SingleArticle'
import NavBar from './Components/NavBar'
import ArticleComments from './Components/ArticleComments'

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
              <Route path='/articles/:article_id/comments'element={<ArticleComments/>}/>
            </Routes>
          </main>
          </>
  )
}

export default App
