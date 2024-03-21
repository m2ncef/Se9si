import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Send from './Pages/Send'
import User from './Pages/User'
import Start from './Pages/Start';
import Socials from './components/Socials'

function App() {
  return (
    <>
      <nav>
        <h2>Se9si</h2>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />} index></Route>
          <Route path='/:id' element={<Send />}></Route>
          <Route path='/user/:id' element={<User />}></Route>
          <Route path='*' element={<h1>Page not found</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
