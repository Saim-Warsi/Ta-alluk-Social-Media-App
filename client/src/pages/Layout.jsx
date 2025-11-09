import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { dummyUserData } from '../../assets/assets'
import Loading from '../components/Loading'

const Layout = () => {

  const user = dummyUserData
  const [sideBarOpen, setSideBarOpen] = useState(false)

  return user ?  (
    <>
    <div className="main w-full flex h-screen">
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <div className="flex-1 bg-slate-50">
      <Outlet />
      </div>
    </div>
    {
      sideBarOpen ? (<X  onClick={()=>setSideBarOpen(false)}  className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow-lg w-10 h-10 text-gray-600 sm:hidden' />)
      :
      (<Menu onClick={()=>setSideBarOpen(true)} className="absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow-lg w-10 h-10 text-gray-600 sm:hidden" />)
    }
    </>
  ) : (
   <Loading />
  )
}

export default Layout