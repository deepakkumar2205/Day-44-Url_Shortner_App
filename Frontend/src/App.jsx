import { ThemeProvider } from '@emotion/react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Changepassword from './Components/Authentication/Changepassword/Changepassword'
import SignIn from './Components/Authentication/Login/Signin'
import Emailverify from './Components/Authentication/mailVerification/Emailverification'
import ProtectedRoute from './Components/Authentication/ProtectedRoute'
import { ResetPassPage } from './Components/Authentication/ResetPassPage/ResetPassPage'
import ResetPassword from './Components/Authentication/ResetPassword/ResetPassword'
import SignUp from './Components/Authentication/Signup/Signup'
import { Home } from './Components/Mainpage/Home'
import Info from './Components/Mainpage/Info/info'
import { Urls } from './Components/Mainpage/Urls.jsx'



function App() {
  
  const Theme = useSelector((state)=>state.theme)

  return (
    <ThemeProvider theme={Theme}>
        <div className="App">
          <div style={{margin:"0",padding:'2rem' ,backgroundColor:Theme.palette.background.default ,color:Theme.palette.primary.light}}>
          <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/changepassword' element={<Changepassword/>}/>
            <Route path='/urls' element={<ProtectedRoute><Urls/></ProtectedRoute>}/>
            <Route path='/resetpassword' element={<ResetPassword/>}/>
            <Route path='/resetPassPage/:string' element={<ResetPassPage/>}/>
            <Route path='/:shortUrl' element={<Home/>}/>
            <Route path='/emailverify/:string' element={<Emailverify/>}/>
            <Route path='/info' element={<Info/>}/>
          </Routes>
          </div>
        </div>
    </ThemeProvider>
  )
}

export default App
