import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../../assets/assets';
import { Plus } from 'lucide-react';
import moment from 'moment'
import StoryModal from './StoryModal';
import StoryViewer from './StoryViewer';
import { useAuth } from '@clerk/clerk-react';
import api from "../api/axios"; // Adjust path as necessary
import { toast } from "react-hot-toast"; // Ensure toast is also imported


const StoriesBar = () => {
    const { getToken } = useAuth()
    const [stories, setStories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [viewStory, setViewStory] = useState(null);


    const fetchStories = async () => {
      try {
          const token = await getToken()
        const { data } = await api.get('/api/story/get',
            {headers: {Authorization : `Bearer ${token}`}}
        )
        if(data.success){
            setStories(data.stories)
        }else{
            toast(data.message)
        }
    } catch (error) {
          toast.error(error.message)
      }
    };

    useEffect(() => {
        fetchStories();
    }, [])

    return (
        <div className='w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4'>
            <div className="flex gap-4 pb-5">
                {/* add story */}
                <div onClick={()=>setShowModal(true)} className="rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-3/4 cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-yellow-500">
                    <div className="h-full flex flex-col items-center justify-center p-4">
                        <div className="size-10 bg-amber-500 rounded-full flex items-center justify-center mb-3">
                            <Plus className='h-5 w-5 text-white' />
                        </div>
                        <p className='text-sm font-medium text-slate-700 text-center'>Create</p>
                    </div>
                </div>
                {/* stories */}
                
                {stories.map((story, index) => (
    <div 
        key={index} 
        onClick={() => setViewStory(story)} 
        className='relative rounded-lg shadow min-w-30 max-w-30 h-40 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95'
        style={{ backgroundColor: story.background_color }} 
    >
        {/* Profile picture */}
        <img 
            src={story.user?.profile_picture} 
            alt={story.user?.username}
            className='absolute size-8 top-3 left-3 z-15 rounded-full ring ring-gray-100 shadow'
        />
        
        <p className='absolute top-12 left-3 text-black font-medium text-sm truncate max-w-24 z-15'>
            {story.content}
        </p>

        <p className='text-white absolute bottom-1 right-2 z-20 text-xs'>
            {moment(story.createdAt).fromNow()}
        </p>

        {story.media_type !== "text" && (
            <div className='absolute inset-0 z-10 rounded-lg bg-black/20 overflow-hidden'> 
                {/* 4. Opacity check: Added bg-black/20 so color peeks through if media is small */}
                {story.media_type === "image" ? (
                    <img 
                        src={story.media_url} 
                        className='h-full w-full object-cover opacity-80'
                    />
                ) : (
                    <video 
                        src={story.media_url} 
                        className='h-full w-full object-cover opacity-80'
                    />
                )}
            </div>
        )}
    </div>
))}
            </div>
            {/* add story modal */}
                {
                    showModal && <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />
                }

            {/* view story modal */}
                {
                    viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
                }
        </div>
    )
}

export default StoriesBar