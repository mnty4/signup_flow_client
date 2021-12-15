import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';

function App() {

  const [jwt, setJwt] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (jwt === '') return;
    // When the jwt is updated a request will be sent which returns the user's info
    // and sets userInfo to this object. This will change the component that is displayed
    // when visiting the root path.
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/users/me`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': jwt
        },
      });
      if(res.ok) setUserInfo(await res.json()); 
    })();
  }, [jwt]);

  const logout = () => {
    // Resets jwt and user info which will change the component displayed on the root path.
    setJwt('');
    setUserInfo(null);
  }

  // When the user goes to the root path, by default the user 
  // will be redirected to /login 
  // When the user has a jwt, a request will be sent to obtain the info for that user
  // While the userInfo is still null (so while the request is being processed) a loader is displayed
  // Once the request is processed (and userInfo is no longer null) the Home component will be rendered.
  return (
    <div className="App">
        <Container fluid className='app-container'>
          <header className='mb-5'><h1>Website Name</h1></header>
          <Router>
            <Routes>
              {jwt !== '' && userInfo !== null && <Route path='/' element={<Home userInfo={userInfo} logout={logout} />} />}
              {jwt !== '' && <Route path='/' element={<Loader />}/>}
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='login' element={<Login setJwt={setJwt} />} />
              <Route path='register' element={<Register setJwt={setJwt} />} />
            </Routes>
          </Router>
          
        </Container>
    </div>
  );
}

export default App;
