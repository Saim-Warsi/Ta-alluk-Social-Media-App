import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../../assets/assets';
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';
import PostCard from '../components/PostCard';
import RecentMessages from '../components/RecentMessages';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const {getToken} = useAuth();




  const fetchFeeds = async ()=>{
    // setFeeds(dummyPostsData)  static rendering
    // setLoading(false);

    //dynamic rendering real time posts
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

  useEffect(()=>{
    fetchFeeds();
  },[])

  return !loading ? (
    <div className='w-full bg-gray-50 overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
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
        <div className="max-xl:hidden fixed right-2.5  top-2">
          <div className="max-w-75 bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
            <h3 className='text-slate-800 font-semibold'>Sponsored</h3>
            <img src={assets.sponsored_img} className='w-75 h-50 rounded-md' alt="" />
            <p className='text-slate-600'>Accelerated Brand Exposure</p>
            <p className='text-slate-400'>
              Leverage the trust of established creators and channels to drive awareness and consideration at an unprecedented scale.
            </p>
          </div>
          <RecentMessages />
        </div>
    </div>
  ) : <Loading />


}

export default Feed