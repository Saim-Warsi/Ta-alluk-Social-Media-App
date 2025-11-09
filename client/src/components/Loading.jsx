import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-full w-full">
    <div className="relative w-12 h-12 ">
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-yellow-500"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
    </div>

    {/* Loading text */}
    <div className="text-white text-sm font-medium tracking-wide">
        Loading
        <span className="inline-block animate-[bounce_1.4s_ease-in-out_infinite]">.</span>
        <span className="inline-block animate-[bounce_1.4s_ease-in-out_infinite_0.2s]">.</span>
        <span className="inline-block animate-[bounce_1.4s_ease-in-out_infinite_0.4s]">.</span>
    </div>
</div>  )
}

export default Loading