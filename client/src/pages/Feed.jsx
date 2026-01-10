

// import React, { useEffect, useState } from 'react'
// import { assets, dummyPostsData } from '../../assets/assets';
// import Loading from '../components/Loading';
// import StoriesBar from '../components/StoriesBar';
// import PostCard from '../components/PostCard';
// import RecentMessages from '../components/RecentMessages';
// import { useAuth } from '@clerk/clerk-react';
// import api from '../api/axios';
// import toast from 'react-hot-toast';

// const Feed = () => {
//   const [feeds, setFeeds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const {getToken} = useAuth();

//   const fetchFeeds = async ()=>{
//     try {
//       setLoading(true)
//       const {data} = await api.get('/api/post/feed',{headers:{Authorization: `Bearer ${await getToken()}`}})
//       if(data.success){
//         setFeeds(data.posts)
//       } else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//     setLoading(false)
//   };

//   useEffect(()=>{
//     fetchFeeds();
//   },[])

//   return !loading ? (
//     <div className='ml-16 sm:ml-20 lg:ml-60 xl:ml-72 2xl:ml-0 w-auto bg-gray-50 overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
//         {/* stories and posts */}
//         <div className="">
//           <StoriesBar />
//           <div className='p-4 space-y-6'>
//           {feeds.map((post)=>(
//             <PostCard key={post._id} post={post}/>
//           ))}
//           </div>
//         </div>

//         {/* right sidebar */}
//         <div className="max-2xl:hidden fixed right-2.5 top-2">
//           <div className="max-w-75 bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
//             <h3 className='text-slate-800 font-semibold'>Sponsored</h3>
//             <img src={assets.sponsored_img} className='w-75 h-50 rounded-md' alt="" />
//             <p className='text-slate-600'>Accelerated Brand Exposure</p>
//             <p className='text-slate-400'>
//               Leverage the trust of established creators and channels to drive awareness and consideration at an unprecedented scale.
//             </p>
//           </div>
//           <RecentMessages />
//         </div>
//     </div>
//   ) : <Loading />
// }

// export default Feed
import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../../assets/assets';
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/RecentMessages';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { UserPlus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {getToken} = useAuth();
  const navigate = useNavigate();

  const fetchFeeds = async ()=>{
    try {
      setLoading(true)
      const {data} = await api.get('/api/post/feed',{headers:{Authorization: `Bearer ${await getToken()}`}})
      if(data.success){
        setFeeds(data.posts)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  };

  const fetchSuggestedUsers = async ()=>{
    try {
      const {data} = await api.get('/api/user/suggested',{headers:{Authorization: `Bearer ${await getToken()}`}})
      if(data.success){
        setSuggestedUsers(data.users.slice(0, 3))
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleFollow = async (userId)=>{
    try {
      const {data} = await api.post('/api/user/follow',{id: userId},{headers:{Authorization: `Bearer ${await getToken()}`}})
      if(data.success){
        toast.success(data.message)
        setSuggestedUsers(prev => prev.filter(user => user._id !== userId))
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleConnect = async (userId)=>{
    try {
      const {data} = await api.post('/api/user/connection-request',{id: userId},{headers:{Authorization: `Bearer ${await getToken()}`}})
      if(data.success){
        toast.success(data.message)
        setSuggestedUsers(prev => prev.filter(user => user._id !== userId))
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    fetchFeeds();
    fetchSuggestedUsers();
  },[])

  return !loading ? (
    <div className='ml-16 sm:ml-20 lg:ml-60 xl:ml-72 2xl:ml-0 w-auto bg-gray-50 overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
        {/* stories and posts */}
        <div className="">
          <StoriesBar />
          <div className='p-4 space-y-6'>
          {feeds.map((post)=>(
            <PostCard key={post._id} post={post}/>
          ))}
          </div>
        </div>

        {/* right sidebar */}
        <div className="max-2xl:hidden fixed right-5 top-5">
          <div className="max-w-75 bg-white text-xs p-4 rounded-md shadow space-y-3">
            <div className="flex items-center justify-between">
              <h3 className='text-slate-800 font-semibold flex items-center gap-2'>
                <Users className='w-4 h-4'/>
                Suggested
              </h3>
              <button 
                onClick={()=>navigate('/discover')}
                className='text-blue-500 hover:text-blue-600 text-xs'
              >
                See all
              </button>
            </div>
            
            {suggestedUsers.map((user)=>(
              <div key={user._id} className="flex items-center gap-2 py-2 border-b last:border-0">
                <img 
                  src={user.profile_picture} 
                  alt="" 
                  className='w-10 h-10 rounded-full cursor-pointer'
                  onClick={()=>navigate(`/profile/${user._id}`)}
                />
                <div className="flex-1 min-w-0">
                  <p 
                    className='font-medium text-slate-800 truncate cursor-pointer hover:underline'
                    onClick={()=>navigate(`/profile/${user._id}`)}
                  >
                    {user.full_name}
                  </p>
                  <p className='text-slate-400 text-xs truncate'>@{user.username}</p>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={()=>handleFollow(user._id)}
                    className='px-2 py-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500'
                    title="Follow"
                  >
                    Follow
                  </button>
                
                </div>
              </div>
            ))}
          </div>
          <RecentMessages />
        </div>
    </div>
  ) : <Loading />
}

export default Feed