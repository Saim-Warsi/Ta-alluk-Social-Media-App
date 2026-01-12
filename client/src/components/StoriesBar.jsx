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

       <div className='w-[calc(100vw-64px)] sm:w-[calc(100vw-80px)] lg:w-[calc(100vw-240px)] xl:w-[calc(100vw-288px)] max-w-2xl no-scrollbar overflow-x-auto px-4'>
        <div className="flex gap-4 pb-5">
            {/* Add Story Button */}
            <div 
                onClick={() => setShowModal(true)} 
                className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0"
            >
                <div className="w-16 h-16 rounded-full bg-amber-500 p-[2px] flex items-center justify-center">
                    <div className="w-[95%] h-[95%] rounded-full bg-white flex items-center justify-center">
                        <Plus className='h-6 w-6 text-gray-700' />
                    </div>
                </div>
                <span className='text-xs text-gray-700 font-normal max-w-[64px] truncate'>
                    Your Story
                </span>
            </div>

            {/* Stories */}
            {stories.map((story, index) => (
                <div 
                    key={index} 
                    onClick={() => setViewStory(story)} 
                    className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0"
                >
                    <div className="w-16 h-16 rounded-full bg-amber-400 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white p-[2px]">
                            <img 
                                src={story.user?.profile_picture} 
                                alt={story.user?.username}
                                className='w-full h-full rounded-full object-cover'
                            />
                        </div>
                    </div>
                    <span className='text-xs text-gray-700 font-normal max-w-[64px] truncate'>
                        {story.user?.username}
                    </span>
                </div>
            ))}
        </div>

        {/* add story modal */}
        {showModal && <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />}

        {/* view story modal */}
        {viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />}
    </div>
    )
}

export default StoriesBar