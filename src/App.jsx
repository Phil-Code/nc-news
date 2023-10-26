import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import SingleArticle from './Components/SingleArticle'
import NavBar from './Components/NavBar'
import ErrorPage from './Components/ErrorPage'


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
              <Route path='/*' element={<ErrorPage/>}/>
            </Routes>
          </main>
          </>
  )
}

export default App
