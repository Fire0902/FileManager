import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import './styles.css'
import Login from './components/pages/Login.tsx'
import RequestProvider from './context/RequestContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <RequestProvider>
        <Routes>
          <Route path='/' element={<Login/>}/>

        </Routes>
      </RequestProvider>
    </Router>
  </StrictMode>,
)
