import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/Login.jsx"
import Feed from "./pages/Feed.jsx"
import Messages from "./pages/Messages.jsx"
import ChatBox from "./pages/ChatBox.jsx"
import Connections from "./pages/Connections.jsx"
import Discover from "./pages/Discover.jsx"
import Profile from "./pages/Profile.jsx"
import CreatePost from "./pages/CreatePost.jsx"
import {useUser, useAuth} from '@clerk/clerk-react'
import Layout from './pages/Layout.jsx'
import {Toaster} from 'react-hot-toast'
import { useEffect } from 'react'


function App() {

  const {user} = useUser()
  const {getToken} = useAuth()

  useEffect(()=>{
    getToken().then((token)=>console.log(token))   //this console is temporary! I'll remove it before deployment
  },[user])
  return (
    <>
    <Toaster />
   <Routes>
    <Route path='/' element={ !user ? <Login />: <Layout />}>
    <Route index element={<Feed />} />
    <Route path='messages' element={<Messages />} />
    <Route path='messages/:userId' element={<ChatBox />} />
    <Route path='connections' element={<Connections />} />
    <Route path='discover' element={<Discover />} />
    <Route path='profile' element={<Profile />} />
    <Route path='profile/:profileId' element={<Profile />} />
    <Route path='create-post' element={<CreatePost />} />


   

    
    </Route>
   </Routes>
    </>
  )
}

export default App
