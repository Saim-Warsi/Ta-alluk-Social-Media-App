// import React, { useEffect, useRef, useState } from 'react'
// import { dummyMessagesData, dummyUserData } from '../../assets/assets'
// import { ImageIcon,SendHorizonal } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { useAuth } from '@clerk/clerk-react'
// import api from '../api/axios'
// import toast from 'react-hot-toast'
// import { addMessage, fetchMessages, resetMessages } from '../features/messages/messageSlice'

// const ChatBox = () => {

//   const messages = useSelector((state)=>state.messages.messages)
//   const { userId } = useParams()
//   const { getToken } = useAuth()
//   const dispatch = useDispatch()

//   const [text, setText] = useState('')
//   const [image, setImage] = useState(null)
//   const [user, setuser] = useState(null)
//   const messagesEndRef = useRef(null)

//   const connections = useSelector((state)=> state.connections.connections)

//   const fetchUserMessages = async ()=>{
//     try {
//       const token = await getToken()
//       dispatch(fetchMessages({token, userId}))
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const sendMessage = async ()=>{
//     try { 
//         if(!text.trim() && image) return;
//         const token = await getToken();

//         const formData = new FormData()
//         formData.append('to_user_id', userId)
//         formData.append('text', text)
//         image &&  formData.append('image',image) 

//         const { data } = await api.post('/api/message/send', formData, {
//           headers: {Authorization: `Bearer ${token}`}
//         } );

//         if(data.success){
//           setText('')
//           setImage(null)
//           dispatch(addMessage(data.message))
//           // toast.success("Message Sent!")    for testing purposes only
//         }else{
//           throw new Error(data.message)
//           toast(data.message)
//         }
//       } catch (error) {
//       toast.error(error.message)
      
//     }
//   }
//   useEffect(()=>{
//     fetchUserMessages()

//     return ()=>{
//       dispatch(resetMessages())
//     }
//   },[userId])

//   useEffect(()=>{
//     if(connections.length > 0 ){
//       const user = connections.find(connection => connection._id === userId)
//       setuser(user)
//     }
//   },[userId, connections])

//   useEffect(()=>{
//     messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
//   },[messages])
//   return user && (
//     <div className='flex flex-col h-screen'>
//         <div className="flex  items-center gap-2 p-2 md:px-10 xl:pl-42 bg-yellow-500 border-b border-gray-300">
//             <img src={user.profile_picture} alt="" className='size-8 rounded-full'/>
//             <div className=' '>
//               <p className='font-semibold text-white'>{user.full_name}</p>
//               <p className='text-sm text-white -mt-1.5 '>@{user.username}</p>
//             </div>
//         </div>
//         <div className="p-5 md:px-10 h-full overflow-y-scroll">
//           <div className="space-y-4 max-w-4xl mx-auto">
//             {
//               messages.toSorted((a,b)=> new Date(a.createdAt) - new Date(b.createdAt)).map((message,index)=>(
//                 <div key={index} className={`flex flex-col ${message.to_user_id !== user._id ? 'items-start':'items-end'}`}>
//                     <div className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${message.to_user_id !== user.id ? 'rounded-bl-none':'rounded-br-none'}  `}>
//                       {message.message_type === 'image' && <img src={message.media_url} 
//                       className='w-full max-w-sm rounded-lg mb-1'
//                       alt="" />}
                      
//                       <p>{message.text}</p>
//                     </div>
//                 </div>
//               ))
//             }
//             <div ref={messagesEndRef}/>
//           </div>
//         </div>
//         <div className="px-4">
//           <div className="flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5">
//             <input type="text" className='flex-1 outline-none text-slate-700' 
//             placeholder='Type a message...'
//             onKeyDown={(e)=>e.key === 'Enter' && sendMessage()}
//             onChange={(e)=>setText(e.target.value)}
//             value={text}
//             />

//             <label htmlFor="image">
//               {image ? <img src={URL.createObjectURL(image)}
//               className='h-8 rounded'
//               />
//               : <ImageIcon className='size-7 text-gray-400 cursor-pointer' />}
//               <input type="file" id="image" accept='image/*' hidden onChange={(e)=>setImage(e.target.files[0])} />
//             </label>
//             <button onClick={sendMessage} className='bg-amber-500 hover:bg-yellow-500 transition-colors duration-300 active:scale-95 cursor-pointer text-white p-2 rounded-full'>
//             <SendHorizonal size={18} />
//             </button>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default ChatBox

import React, { useEffect, useRef, useState } from 'react'
import { Image, SendHorizonal, X, MessageSquare } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { addMessage, fetchMessages, resetMessages } from '../features/messages/messageSlice'

const ChatBox = () => {
  const messages = useSelector((state) => state.messages.messages)
  const { userId } = useParams()
  const { getToken } = useAuth()
  const dispatch = useDispatch()

  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setuser] = useState(null)
  const messagesEndRef = useRef(null)

  const connections = useSelector((state) => state.connections.connections)

  const fetchUserMessages = async () => {
    try {
      const token = await getToken()
      dispatch(fetchMessages({ token, userId }))
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendMessage = async () => {
    try {
      if (!text.trim() && !image) return
      const token = await getToken()

      const formData = new FormData()
      formData.append('to_user_id', userId)
      formData.append('text', text)
      image && formData.append('image', image)

      const { data } = await api.post('/api/message/send', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        setText('')
        setImage(null)
        dispatch(addMessage(data.message))
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUserMessages()

    return () => {
      dispatch(resetMessages())
    }
  }, [userId])

  useEffect(() => {
    if (connections.length > 0) {
      const user = connections.find(connection => connection._id === userId)
      setuser(user)
    }
  }, [userId, connections])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return user && (
    <div className='min-h-screen bg-slate-50'>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 md:p-6 bg-white border-b border-gray-200 shadow-sm">
            <img 
              src={user.profile_picture} 
              alt={user.full_name} 
              className='size-10 md:size-12 rounded-full object-cover'
            />
            <div className='flex-1'>
              <p className='font-semibold text-slate-900 text-base md:text-lg'>{user.full_name}</p>
              <p className='text-sm text-slate-600'>@{user.username}</p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="bg-slate-100 rounded-full p-6 mb-4">
                    <MessageSquare className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No messages yet</h3>
                  <p className="text-slate-600 text-sm">Start a conversation with {user.full_name}</p>
                </div>
              ) : (
                messages
                  .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((message, index) => {
                    const isReceived = message.to_user_id !== user._id
                    return (
                      <div 
                        key={index} 
                        className={`flex ${isReceived ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`flex flex-col max-w-[85%] sm:max-w-md ${isReceived ? 'items-start' : 'items-end'}`}>
                          <div className={`
                            p-3 rounded-2xl shadow-sm
                            ${isReceived 
                              ? 'bg-white text-slate-700 rounded-tl-none' 
                              : 'bg-amber-500 text-white rounded-tr-none'
                            }
                          `}>
                            {message.message_type === 'image' && (
                              <img 
                                src={message.media_url} 
                                className='w-full rounded-lg mb-2'
                                alt="Shared image" 
                              />
                            )}
                            {message.text && (
                              <p className="text-sm break-words">{message.text}</p>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 mt-1 px-2">
                            {new Date(message.createdAt).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    )
                  })
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-white border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              {/* Image Preview */}
              {image && (
                <div className="mb-3 relative inline-block">
                  <img 
                    src={URL.createObjectURL(image)}
                    className='h-20 rounded-lg object-cover'
                    alt="Preview"
                  />
                  <button
                    onClick={() => setImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {/* Input Box */}
              <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-slate-50 rounded-full border border-gray-200 focus-within:border-amber-500 transition-colors">
                <input 
                  type="text" 
                  className='flex-1 bg-transparent outline-none text-slate-700 px-2 md:px-3 text-sm md:text-base' 
                  placeholder='Type a message...'
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />

                <label htmlFor="image" className="cursor-pointer">
                  <Image className='size-5 md:size-6 text-slate-400 hover:text-amber-500 transition-colors' />
                  <input 
                    type="file" 
                    id="image" 
                    accept='image/*' 
                    hidden 
                    onChange={(e) => setImage(e.target.files[0])} 
                  />
                </label>

                <button 
                  onClick={sendMessage} 
                  disabled={!text.trim() && !image}
                  className='bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 text-white p-2 md:p-2.5 rounded-full'
                >
                  <SendHorizonal size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBox