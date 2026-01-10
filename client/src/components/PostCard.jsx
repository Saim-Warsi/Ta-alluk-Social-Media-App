// import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
// import moment from "moment"
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { dummyUserData } from '../../assets/assets';
// import { useSelector } from 'react-redux';
// import { useAuth } from '@clerk/clerk-react';
// import api from '../api/axios';
// import toast from 'react-hot-toast';

// const PostCard = ({post}) => {
//     const posts = post.content.replace(/(#\w+)/g, "<span class='text-blue-600'>$1</span>");
//     const [likes, setLikes] = useState(post.likes_count);
//     const currentUser = useSelector((state)=>state.user.value);
//     const [showPop, setShowPop] = useState(false);
    
//     const navigate = useNavigate();
//     const {getToken} = useAuth()

//     const handleLike = async ()=>{
//         try {
//             const {data} = await api.post('/api/post/like',{postId: post._id},{headers:{Authorization: `Bearer ${await getToken()}`}})
//             if(data.success){
//                 toast.success(data.message)
//                 setLikes(prev=>{
//                     if(prev.includes(currentUser._id)){
//                         return prev.filter(id=>id !== currentUser._id)
//                     } else{
//                         return [...prev, currentUser._id]
//                     }
//                 })
//             } else{
//                 toast(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }
//   return (
//     <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
//         {/* user info */}
//         <div  onClick={()=>navigate(`profile/${post.user._id}`)}  className="inline-flex items-center gap-3 cursor-pointer">
//             <img src={post.user.profile_picture} alt="" className='w-10 h-10 rounded-full shadow'/>
//             <div className="">
//                 <div className="flex items-center space-x-1">
//                     <span>
//                         {post.user.full_name}
//                     </span>
//                     <BadgeCheck className='w-4 h-4 text-blue-500 '/>
//                 </div>
//                 <div className='text-sm text-gray-500'>@{post.user.username} - {moment(post.createdAt).fromNow()}</div>
//             </div>
//         </div>
//             {/* Content */}
//             {post.content && <div className='text-gray-800 text-sm whitespace-pre-line' 
//             dangerouslySetInnerHTML={{__html:posts}}/>}
//             {/* image */}
//             <div className="grid grid-cols-2 gap-2 relative" onDoubleClick={()=>{
//                 handleLike();
//                 setShowPop(true);
//     setTimeout(() => setShowPop(false), 800);
//             }}>
//                 {/* The Pop-up Heart */}
//     {showPop && (
//         <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
//             <Heart 
//                 className="w-20 h-20 text-amber-400 fill-amber-400 " 
//             />
//         </div>
//     )}
//                 {post.image_urls.map((img, index)=>(
//                     <img src={img} key={index} className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length === 1 && 'col-span-2 h-auto'}`} alt="" />
//                 ))}
//             </div>
//             {/* buttons */}
//             <div className="flex items-center gap-4 text-gray-500 text-sm border-t border-gray-300 pt-2">
//                 <div className="flex items-center gap-1">
//                     <Heart onClick={(e)=>{
                      
//                         handleLike()
//                         }} className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && "text-red-500 fill-red-500"}`} />
//                     <span>{likes.length}</span>
//                 </div>
//                  <div className="flex items-center gap-1">
//                     <MessageCircle className='w-4 h-4' />
//                     <span>{12}</span>
//                 </div> 
//                 <div className="flex items-center gap-1">
//                     <Share2 className='w-4 h-4' />
//                     <span>{6}</span>
//                 </div> 
//             </div>
//     </div>
//   )
// }

// export default PostCard
// import { BadgeCheck, Heart, MessageCircle, Share2, Send, Trash2, X } from 'lucide-react'
// import moment from "moment"
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useAuth } from '@clerk/clerk-react';
// import api from '../api/axios';
// import toast from 'react-hot-toast';

// const PostCard = ({post}) => {
//     const posts = post.content.replace(/(#\w+)/g, "<span class='text-blue-600'>$1</span>");
//     const [likes, setLikes] = useState(post.likes_count);
//     const [comments, setComments] = useState(post.comments || []);
//     const [showComments, setShowComments] = useState(false);
//     const [commentText, setCommentText] = useState('');
//     const currentUser = useSelector((state)=>state.user.value);
//     const [showPop, setShowPop] = useState(false);
    
//     const navigate = useNavigate();
//     const {getToken} = useAuth()

//     const handleLike = async ()=>{
//         try {
//             const {data} = await api.post('/api/post/like',{postId: post._id},{headers:{Authorization: `Bearer ${await getToken()}`}})
//             if(data.success){
//                 toast.success(data.message)
//                 setLikes(prev=>{
//                     if(prev.includes(currentUser._id)){
//                         return prev.filter(id=>id !== currentUser._id)
//                     } else{
//                         return [...prev, currentUser._id]
//                     }
//                 })
//             } else{
//                 toast(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const handleAddComment = async (e)=>{
//         e.preventDefault();
//         if(!commentText.trim()) return;

//         try {
//             const {data} = await api.post('/api/post/comment/add', 
//                 {postId: post._id, text: commentText},
//                 {headers:{Authorization: `Bearer ${await getToken()}`}}
//             )
//             if(data.success){
//                 toast.success(data.message)
//                 setComments(prev => [data.comment, ...prev])
//                 setCommentText('')
//             } else{
//                 toast(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const handleDeleteComment = async (commentId)=>{
//         try {
//             const {data} = await api.post('/api/post/comment/delete',
//                 {postId: post._id, commentId},
//                 {headers:{Authorization: `Bearer ${await getToken()}`}}
//             )
//             if(data.success){
//                 toast.success(data.message)
//                 setComments(prev => prev.filter(c => c._id !== commentId))
//             } else{
//                 toast(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//   return (
//     <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
//         {/* user info */}
//         <div onClick={()=>navigate(`profile/${post.user._id}`)} className="inline-flex items-center gap-3 cursor-pointer">
//             <img src={post.user.profile_picture} alt="" className='w-10 h-10 rounded-full shadow'/>
//             <div className="">
//                 <div className="flex items-center space-x-1">
//                     <span>
//                         {post.user.full_name}
//                     </span>
//                     <BadgeCheck className='w-4 h-4 text-blue-500 '/>
//                 </div>
//                 <div className='text-sm text-gray-500'>@{post.user.username} - {moment(post.createdAt).fromNow()}</div>
//             </div>
//         </div>
//             {/* Content */}
//             {post.content && <div className='text-gray-800 text-sm whitespace-pre-line' 
//             dangerouslySetInnerHTML={{__html:posts}}/>}
//             {/* image */}
//             <div className="grid grid-cols-2 gap-2 relative" onDoubleClick={()=>{
//                 handleLike();
//                 setShowPop(true);
//                 setTimeout(() => setShowPop(false), 800);
//             }}>
//                 {/* The Pop-up Heart */}
//                 {showPop && (
//                     <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
//                         <Heart className="w-20 h-20 text-amber-400 fill-amber-400 " />
//                     </div>
//                 )}
//                 {post.image_urls.map((img, index)=>(
//                     <img src={img} key={index} className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length === 1 && 'col-span-2 h-auto'}`} alt="" />
//                 ))}
//             </div>
//             {/* buttons */}
//             <div className="flex items-center gap-4 text-gray-500 text-sm border-t border-gray-300 pt-2">
//                 <div className="flex items-center gap-1">
//                     <Heart onClick={handleLike} className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && "text-red-500 fill-red-500"}`} />
//                     <span>{likes.length}</span>
//                 </div>
//                 <div className="flex items-center gap-1 cursor-pointer" onClick={()=>setShowComments(!showComments)}>
//                     <MessageCircle className='w-4 h-4' />
//                     <span>{comments.length}</span>
//                 </div> 
//                 <div className="flex items-center gap-1">
//                     <Share2 className='w-4 h-4' />
//                     <span>{6}</span>
//                 </div> 
//             </div>

//             {/* Comments Section */}
//             {showComments && (
//                 <div className="border-t border-gray-200 pt-3 space-y-3">
//                     {/* Add Comment Form */}
//                     <form onSubmit={handleAddComment} className="flex items-center gap-2">
//                         <img src={currentUser.profile_picture} alt="" className='w-8 h-8 rounded-full'/>
//                         <input 
//                             type="text" 
//                             value={commentText}
//                             onChange={(e)=>setCommentText(e.target.value)}
//                             placeholder="Write a comment..." 
//                             className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <button type="submit" className="text-blue-500 hover:text-blue-600">
//                             <Send className='w-5 h-5'/>
//                         </button>
//                     </form>

//                     {/* Comments List */}
//                     <div className="space-y-3 max-h-96 overflow-y-auto">
//                         {comments.map((comment)=>(
//                             <div key={comment._id} className="flex items-start gap-2 group">
//                                 <img 
//                                     src={comment.user.profile_picture} 
//                                     alt="" 
//                                     className='w-8 h-8 rounded-full cursor-pointer'
//                                     onClick={()=>navigate(`profile/${comment.user._id}`)}
//                                 />
//                                 <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
//                                     <div className="flex items-center justify-between">
//                                         <span className="font-semibold text-sm cursor-pointer" onClick={()=>navigate(`profile/${comment.user._id}`)}>
//                                             {comment.user.full_name}
//                                         </span>
//                                         {(comment.user._id === currentUser._id || post.user._id === currentUser._id) && (
//                                             <button 
//                                                 onClick={()=>handleDeleteComment(comment._id)}
//                                                 className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
//                                             >
//                                                 <Trash2 className='w-3 h-3'/>
//                                             </button>
//                                         )}
//                                     </div>
//                                     <p className="text-sm text-gray-800">{comment.text}</p>
//                                     <span className="text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//     </div>
//   )
// }

// export default PostCard
import { BadgeCheck, Heart, MessageCircle, Share2, Send, Trash2, Repeat2 } from 'lucide-react'
import moment from "moment"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const PostCard = ({post, onNewShare}) => {
    const posts = post.content?.replace(/(#\w+)/g, "<span class='text-blue-600'>$1</span>");
    const [likes, setLikes] = useState(post.likes_count);
    const [comments, setComments] = useState(post.comments || []);
    const [shares, setShares] = useState(post.shares_count || []);
    const [showComments, setShowComments] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareText, setShareText] = useState('');
    const [commentText, setCommentText] = useState('');
    const currentUser = useSelector((state)=>state.user.value);
    const [showPop, setShowPop] = useState(false);
    
    const navigate = useNavigate();
    const {getToken} = useAuth()

    // Check if current user has shared this post
    const hasShared = shares.includes(currentUser._id);

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

    const handleAddComment = async (e)=>{
        e.preventDefault();
        if(!commentText.trim()) return;

        try {
            const {data} = await api.post('/api/post/comment/add', 
                {postId: post._id, text: commentText},
                {headers:{Authorization: `Bearer ${await getToken()}`}}
            )
            if(data.success){
                toast.success(data.message)
                setComments(prev => [data.comment, ...prev])
                setCommentText('')
            } else{
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDeleteComment = async (commentId)=>{
        try {
            const {data} = await api.post('/api/post/comment/delete',
                {postId: post._id, commentId},
                {headers:{Authorization: `Bearer ${await getToken()}`}}
            )
            if(data.success){
                toast.success(data.message)
                setComments(prev => prev.filter(c => c._id !== commentId))
            } else{
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleShare = async ()=>{
        try {
            const {data} = await api.post('/api/post/share',
                {postId: post._id, shareText},
                {headers:{Authorization: `Bearer ${await getToken()}`}}
            )
            if(data.success){
                toast.success(data.message)
                setShares(prev => [...prev, currentUser._id])
                setShowShareModal(false)
                setShareText('')
                if(onNewShare) onNewShare(data.post)
            } else{
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleUnshare = async ()=>{
        try {
            const {data} = await api.post('/api/post/unshare',
                {postId: post._id},
                {headers:{Authorization: `Bearer ${await getToken()}`}}
            )
            if(data.success){
                toast.success(data.message)
                setShares(prev => prev.filter(id => id !== currentUser._id))
            } else{
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Determine if this is a shared post
    const isSharedPost = !!post.shared_post;
    const displayPost = isSharedPost ? post.shared_post : post;

  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
        {/* If this is a shared post, show who shared it */}
        {isSharedPost && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Repeat2 className='w-4 h-4'/>
                <span className="font-medium">{post.user.full_name}</span>
                <span>shared this</span>
            </div>
        )}

        {/* User's comment when sharing (if any) */}
        {isSharedPost && post.content && (
            <div className="text-gray-800 text-sm">
                {post.content}
            </div>
        )}

        {/* Original post content in a card if shared */}
        <div className={isSharedPost ? 'border border-gray-200 rounded-lg p-4' : ''}>
            {/* user info */}
            <div onClick={()=>navigate(`profile/${displayPost.user._id}`)} className="inline-flex items-center gap-3 cursor-pointer">
                <img src={displayPost.user.profile_picture} alt="" className='w-10 h-10 rounded-full shadow'/>
                <div className="">
                    <div className="flex items-center space-x-1">
                        <span>
                            {displayPost.user.full_name}
                        </span>
                        <BadgeCheck className='w-4 h-4 text-blue-500 '/>
                    </div>
                    <div className='text-sm text-gray-500'>@{displayPost.user.username} - {moment(displayPost.createdAt).fromNow()}</div>
                </div>
            </div>
            {/* Content */}
            {displayPost.content && <div className='text-gray-800 text-sm whitespace-pre-line mt-4' 
            dangerouslySetInnerHTML={{__html:displayPost.content.replace(/(#\w+)/g, "<span class='text-blue-600'>$1</span>")}}/>}
            {/* image */}
            {displayPost.image_urls?.length > 0 && (
                <div className="grid grid-cols-2 gap-2 relative mt-4" onDoubleClick={()=>{
                    handleLike();
                    setShowPop(true);
                    setTimeout(() => setShowPop(false), 800);
                }}>
                    {/* The Pop-up Heart */}
                    {showPop && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <Heart className="w-20 h-20 text-amber-400 fill-amber-400 " />
                        </div>
                    )}
                    {displayPost.image_urls.map((img, index)=>(
                        <img src={img} key={index} className={`w-full h-48 object-cover rounded-lg ${displayPost.image_urls.length === 1 && 'col-span-2 h-auto'}`} alt="" />
                    ))}
                </div>
            )}
        </div>

        {/* buttons */}
        <div className="flex items-center gap-4 text-gray-500 text-sm border-t border-gray-300 pt-2">
            <div className="flex items-center gap-1">
                <Heart onClick={handleLike} className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && "text-red-500 fill-red-500"}`} />
                <span>{likes.length}</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer" onClick={()=>setShowComments(!showComments)}>
                <MessageCircle className='w-4 h-4' />
                <span>{comments.length}</span>
            </div> 
            <div className="flex items-center gap-1 cursor-pointer" onClick={()=>hasShared ? handleUnshare() : setShowShareModal(true)}>
                <Repeat2 className={`w-4 h-4 ${hasShared && "text-green-500"}`} />
                <span>{shares.length}</span>
            </div> 
        </div>

        {/* Comments Section */}
        {showComments && (
            <div className="border-t border-gray-200 pt-3 space-y-3">
                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="flex items-center gap-2">
                    <img src={currentUser.profile_picture} alt="" className='w-8 h-8 rounded-full'/>
                    <input 
                        type="text" 
                        value={commentText}
                        onChange={(e)=>setCommentText(e.target.value)}
                        placeholder="Write a comment..." 
                        className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="text-blue-500 hover:text-blue-600">
                        <Send className='w-5 h-5'/>
                    </button>
                </form>

                {/* Comments List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {comments.map((comment)=>(
                        <div key={comment._id} className="flex items-start gap-2 group">
                            <img 
                                src={comment.user.profile_picture} 
                                alt="" 
                                className='w-8 h-8 rounded-full cursor-pointer'
                                onClick={()=>navigate(`profile/${comment.user._id}`)}
                            />
                            <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-sm cursor-pointer" onClick={()=>navigate(`profile/${comment.user._id}`)}>
                                        {comment.user.full_name}
                                    </span>
                                    {(comment.user._id === currentUser._id || post.user._id === currentUser._id) && (
                                        <button 
                                            onClick={()=>handleDeleteComment(comment._id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 className='w-3 h-3'/>
                                        </button>
                                    )}
                                </div>
                                <p className="text-sm text-gray-800">{comment.text}</p>
                                <span className="text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 max-w-md w-full">
                    <h3 className="text-lg font-semibold mb-4">Share Post</h3>
                    <textarea 
                        value={shareText}
                        onChange={(e)=>setShareText(e.target.value)}
                        placeholder="Add your thoughts... (optional)"
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 resize-none"
                        rows="3"
                    />
                    <div className="flex gap-2 mt-4">
                        <button 
                            onClick={()=>setShowShareModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleShare}
                            className="flex-1 px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                        >
                            Share
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default PostCard