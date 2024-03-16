import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Send from './Pages/Send'
import User from './Pages/User'

function App() {
  return (
    <>
      <nav>
        <h2>Se9si</h2>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<h1>Home</h1>}></Route>
          <Route path='/send/:id' element={<Send />}></Route>
          <Route path='/user/:id' element={<User />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
