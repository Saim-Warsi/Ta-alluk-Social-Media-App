import { useState } from "react"
import { dummyConnectionsData } from "../../assets/assets"
import { Search } from "lucide-react";
import UserCard from '../components/UserCard.jsx'

const Discover = () => {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState(dummyConnectionsData);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if(e.key === 'Enter'){
      setUsers([])
      setLoading(true)
      setTimeout(()=>{
        setUsers(dummyConnectionsData)
        setLoading(false)
      },1000)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
          {/* titles */}
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Discover People</h1>
            <p className="text-slate-600">
            Connect with amazing people and grow your network
            </p>
        </div>
        {/* Search */}
        <div className="shadow-lg mb-8 rounded-md bg-white/80 flex items-center px-3">
          <input type="text" placeholder="Find ta'alluks" className="w-full py-4  focus:outline-none"/>
          <Search  className="size-6"/>
        </div>
        <div className="flex flex-wrap gap-6">
          {users.map((user, index)=>(
            <UserCard key={index} user={user}  />
          ))}
        </div>
        {
          loading && (<p>lafin</p>)
        }
      </div>
    </div>
  )
}

export default Discover