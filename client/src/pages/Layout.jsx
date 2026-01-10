import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { dummyUserData } from '../../assets/assets'
import Loading from '../components/Loading'
import { useSelector } from 'react-redux'


const Layout = () => {

  const user = useSelector((state)=>state.user.value)
  const [sideBarOpen, setSideBarOpen] = useState(false)

  return user ?  (
    <>
    <div className="main w-full flex h-screen">
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <div className="flex-1 bg-slate-50">
      <Outlet />
      </div>
    </div>
 
    </>
  ) : (
    <div className='mt-[50%]'>
      <Loading />
    </div>
  )
}

export default Layout