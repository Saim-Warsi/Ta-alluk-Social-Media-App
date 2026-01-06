import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-full w-full">
    <div className="relative w-12 h-12 ">
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-yellow-500"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
    </div>

   
</div>  )
}

export default Loading