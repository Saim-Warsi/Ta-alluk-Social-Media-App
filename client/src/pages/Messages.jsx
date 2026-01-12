import React from 'react'
import { Search, Phone, Video } from 'lucide-react'
import { UserRound, MessageSquare } from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
const Messages = () => {

  const { connections } = useSelector((state)=>state.connections)
  const navigate = useNavigate()
  return (  
   <div className='flex-1 min-h-screen bg-gray-50 overflow-y-auto ml-10 sm:ml-15 lg:ml-60 xl:ml-72'>
  
    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8'>
      {/* Header */}
      <div className='mb-6 lg:mb-8'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>Messages</h1>
        <p className='text-gray-600 text-sm sm:text-base'>Talk to your ta'allukats</p>
      </div>

      {/* Search Bar */}
      <div className='mb-6'>
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
          <input
            type='text'
            placeholder='Search messages...'
            className='w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all'
          />
        </div>
      </div>

      {/* Messages List */}
      <div className='space-y-3'>
        {connections.map((user) => (
          <div
            key={user._id}
            className='group bg-white rounded-xl border border-gray-200 transition-all duration-200 overflow-hidden'
          >
            <div className='p-4 sm:p-5 flex items-center gap-3 sm:gap-4'>
              {/* Avatar */}
              <div className='relative flex-shrink-0'>
                {user.profile_picture ? (
                  <img
                  onClick={() => navigate(`/profile/${user._id}`)}
                    src={user.profile_picture}
                    alt={user.full_name}
                    className='w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-gray-100'
                  />
                ) : (
                  <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-900 flex items-center justify-center ring-2 ring-gray-100'>
                    <UserRound className='w-7 h-7 sm:w-8 sm:h-8 text-white' />
                  </div>
                )}
                <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
              </div>

              {/* User Info */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 mb-1'>
                  <h3 className='font-semibold text-gray-900 text-base sm:text-lg truncate hover:underline cursor-pointer' onClick={() => navigate(`/profile/${user._id}`)}>
                    {user.full_name}
                  </h3>
                  <span className='text-xs text-gray-400 hidden sm:inline'>•</span>
                  <span className='text-xs sm:text-sm text-gray-500 truncate hidden sm:inline'>
                    @{user.username}
                  </span>
                </div>
                <p className='text-xs sm:text-sm text-gray-500 truncate sm:hidden mb-1'>
                  @{user.username}
                </p>
                <p className='text-sm text-gray-600 line-clamp-1 sm:line-clamp-2'>
                  {user.bio}
                </p>
              </div>

              {/* Action Buttons */}
              <div className='flex items-center gap-2 flex-shrink-0'>
                {/* Profile Button */}
                <button
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className='cursor-pointer p-2.5 sm:p-3 rounded-lg border border-gray-200 text-gray-700 transition active:scale-95'
                >
                  <UserRound className='w-5 h-5' />
                </button>

                {/* Message Button */}
                <button
                  onClick={() => navigate(`/messages/${user._id}`)}
                  className='cursor-pointer p-2.5 sm:p-3 rounded-lg border border-gray-200 text-gray-700 transition active:scale-95'
                >
                  <MessageSquare className='w-5 h-5' />
                </button>

               
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {connections.length === 0 && (
        <div className='flex flex-col items-center justify-center py-16 sm:py-20'>
          <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
            <MessageSquare className='w-10 h-10 sm:w-12 sm:h-12 text-gray-400' />
          </div>
          <h3 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-2'>No messages yet</h3>
          <p className='text-gray-500 text-center max-w-md px-4'>
            Start connecting with people to begin your conversations
          </p>
        </div>
      )}
    </div>
  </div>
)
}

export default Messages