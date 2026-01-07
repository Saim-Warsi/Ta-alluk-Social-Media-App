import { Link, useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets"
import MenuItems from "./MenuItems";
import {CirclePlus, LogOut} from "lucide-react"
import { UserButton, useClerk } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

const SideBar = ({sideBarOpen, setSideBarOpen}) => {

    const navigate = useNavigate();
    const user = useSelector((state)=>state.user.value);
    const {signOut} = useClerk();
  return (
            <div className="fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 flex flex-col justify-between items-center z-20 transition-all duration-300 ease-in-out w-12 sm:w-18 lg:w-60 xl:w-72">
            <div className="w-full ">
                <img 
                    className="w-8 hidden lg:block sm:w-10 lg:w-26 mx-auto lg:ml-7 my-2 cursor-pointer" 
                    onClick={() => navigate("/")} 
                    src={assets.logo} 
                    alt="" 
                />
                <img 
    className="w-8 sm:w-8 lg:hidden mx-auto mt-5 my-2 cursor-pointer" 
    onClick={() => navigate("/")} 
    src={assets.favicon} 
    alt="Icon" 
  />
                <hr className="border-gray-300 mb-8"/>

                <MenuItems setSideBarOpen={setSideBarOpen} />
                
              <Link 
  to={"/create-post"} 
  className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-2 lg:mx-6 rounded-lg 
             bg-transparent text-gray-600 
             lg:bg-yellow-500 lg:hover:bg-amber-500 lg:text-white 
             active:scale-95 transition cursor-pointer"
>
  <CirclePlus className="w-5 h-5" />
  <span className="hidden lg:inline">Create Post</span>
</Link>
            </div>
            
            <div className="w-full border-t border-gray-200 py-4 px-2 lg:px-7 flex flex-col lg:flex-row items-center justify-between gap-2">
                <div className="flex gap-2 items-center cursor-pointer">
                    <UserButton /> 
                    <div className="hidden lg:block">
                        <h1 className="text-sm font-medium">
                            {user.full_name}
                        </h1>
                        <p className="text-xs text-gray-500"> 
                            @{user.username}
                        </p>
                    </div>
                </div>
                
                <LogOut 
                    onClick={signOut} 
                    className="w-4.5 text-gray-500 hover:text-gray-700 transition cursor-pointer" 
                />
            </div>
        </div>

)
}

export default SideBar