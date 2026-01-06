import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from "moment"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyUserData } from '../../assets/assets';
import { useSelector } from 'react-redux';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const PostCard = ({post}) => {
    const posts = post.content.replace(/(#\w+)/g, "<span class='text-blue-600'>$1</span>");
    const [likes, setLikes] = useState(post.likes_count);
    const currentUser = useSelector((state)=>state.user.value);
    const [showPop, setShowPop] = useState(false);
    
    const navigate = useNavigate();
    const {getToken} = useAuth()

    const handleLike = async ()=>{
        try {
            const {data} = await api.post('/api/post/like',{postId: post._id},{headers:{Authorization: `Bearer ${await getToken()}`}})
            if(data.success){
                toast.success(data.message)
                setLikes(prev=>{
                    if(prev.includes(currentUser._id)){
                        return prev.filter(id=>id !== currentUser._id)
                    } else{
                        return [...prev, currentUser._id]
                    }
                })
            } else{
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
        {/* user info */}
        <div  onClick={()=>navigate(`profile/${post.user._id}`)}  className="inline-flex items-center gap-3 cursor-pointer">
            <img src={post.user.profile_picture} alt="" className='w-10 h-10 rounded-full shadow'/>
            <div className="">
                <div className="flex items-center space-x-1">
                    <span>
                        {post.user.full_name}
                    </span>
                    <BadgeCheck className='w-4 h-4 text-blue-500 '/>
                </div>
                <div className='text-sm text-gray-500'>@{post.user.username} - {moment(post.createdAt).fromNow()}</div>
            </div>
        </div>
            {/* Content */}
            {post.content && <div className='text-gray-800 text-sm whitespace-pre-line' 
            dangerouslySetInnerHTML={{__html:posts}}/>}
            {/* image */}
            <div className="grid grid-cols-2 gap-2 relative" onDoubleClick={()=>{
                handleLike();
                setShowPop(true);
    setTimeout(() => setShowPop(false), 800);
            }}>
                {/* The Pop-up Heart */}
    {showPop && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <Heart 
                className="w-20 h-20 text-amber-400 fill-amber-400 " 
            />
        </div>
    )}
                {post.image_urls.map((img, index)=>(
                    <img src={img} key={index} className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length === 1 && 'col-span-2 h-auto'}`} alt="" />
                ))}
            </div>
            {/* buttons */}
            <div className="flex items-center gap-4 text-gray-500 text-sm border-t border-gray-300 pt-2">
                <div className="flex items-center gap-1">
                    <Heart onClick={(e)=>{
                      
                        handleLike()
                        }} className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && "text-red-500 fill-red-500"}`} />
                    <span>{likes.length}</span>
                </div>
                 <div className="flex items-center gap-1">
                    <MessageCircle className='w-4 h-4' />
                    <span>{12}</span>
                </div> 
                <div className="flex items-center gap-1">
                    <Share2 className='w-4 h-4' />
                    <span>{6}</span>
                </div> 
            </div>
    </div>
  )
}

export default PostCard