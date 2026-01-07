// import React from 'react'
// import { menuItemsData } from '../../assets/assets'
// import { NavLink } from 'react-router-dom'

// const MenuItems = ({setSideBarOpen}) => {
//   return (
//     <div className='px-6 text-gray-600 space-y-1 font-medium'>
//         {
//             menuItemsData.map(({to, label, Icon})=>{
//              return   (<NavLink key={to} to={to} end={to === "/"} onClick={()=>setSideBarOpen(false)} className={({isActive})=>`px-3 py-2 flex items-center gap-3 rounded-xl ${isActive ? `bg-yellow-50 text-black `: `hover:bg-gray-50`}`}>
//                     <Icon className='h-5 w-5'/>
//                     {label}
//                 </NavLink>)
//             })
//         }
//     </div>
//   )
// }

// export default MenuItems

import React from 'react'
import { menuItemsData } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({setSideBarOpen}) => {
  return (
    <div className='px-2 lg:px-6 text-gray-600 space-y-1 font-medium'>
        {
            menuItemsData.map(({to, label, Icon})=>{
             return (
                <NavLink 
                    key={to} 
                    to={to} 
                    end={to === "/"} 
                    onClick={()=>setSideBarOpen(false)} 
                    className={({isActive})=>`px-3 py-2 flex items-center justify-center lg:justify-start gap-3 rounded-xl ${isActive ? `bg-yellow-50 text-black` : `hover:bg-gray-50`}`}
                >
                    <Icon className='h-5 w-5 flex-shrink-0'/>
                    <span className='hidden lg:inline'>{label}</span>
                </NavLink>
             )
            })
        }
    </div>
  )
}

export default MenuItems