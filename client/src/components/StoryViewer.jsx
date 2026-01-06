// import { BadgeCheck, X } from "lucide-react";
// import React, { useEffect, useState } from "react";

// const StoryViewer = ({ viewStory, setViewStory }) => {
//   const [progress, setProgress] = useState(0)
//   const handleClose = () => {
//     setViewStory(null);
//   };

//   if(!viewStory) return null;

//   const renderContent = ()=>{
//     switch(viewStory.media_type){
//       case 'image':
//         return (
//           <img src={viewStory.media_url} alt="" className="max-w-full max-h-screen object-contain" />
//         );
//       case 'video':
//         return (
//           <video autoPlay controls src={viewStory.media_url} alt="" className="max-h-screen" onEnded={()=>setViewStory(null)} />
//         );
//       case 'text':
//         return (
//           <div className="w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center">{viewStory.content}</div>
//         );
//         default:
//           return null;
//     }
//   };

//   useEffect(()=>{
//     let timer,progressInterval;
//     if(viewStory && viewStory.media_type !== "video"){
//       setProgress(0)
//       const duration = 10000;
//       const setTime = 100;
//       let elapsed = 0;

//      progressInterval =  setInterval(()=>{
//         elapsed += setTime;
//         setProgress((elapsed/duration)*100)
//       },setTime);
//       // close story after duration
//       timer = setTimeout(()=>{
//         setViewStory(null)
//       },duration)
//     }

//     return ()=>{
//       clearTimeout(timer);
//       clearInterval(progressInterval)
//     }
//   },[viewStory, setViewStory])
//   return (
//     <div
//       className="fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center transition-all ease-in-out duration-1200"
//       style={{
//         backgroundColor:
//           viewStory.media_type === "text"
//             ? viewStory.background_color
//             : "#000000",
//       }}
//     >
//       {/* progress bar - story length */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
//         <div
//           className="h-full bg-white transition-all duration-100 linear"
//           style={{ width: `${progress}%` }}
//         >
//           {/* User info - top left side */}
//           <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded-lg bg-black/50">
//             <img
//               src={viewStory.user?.profile_picture}
//               className="size-7 sm:size-8 rounded-full object-cover border border-white"
//             />
//             <div className="text-white font-medium flex items-center gap-1.5">
//               <span>{viewStory.user?.full_name}</span>
//               <BadgeCheck size={15} />
//             </div>
//           </div>
//           {/* close button - top right side */}
//           <button
//             onClick={handleClose}
//             className="absolute top-4 right-4 text-white text-3xl font-bold focuse:outline-none"
//           >
//             <X className="w-8 h-8 hover:scale-110 transition cursor-pointer " />
//           </button>
//         </div>
//       </div>
//       {/* content wrapper */}
//       <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default StoryViewer;
import { BadgeCheck, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0);

  const handleClose = () => {
    setViewStory(null);
  };

  if (!viewStory) return null;

  const renderContent = () => {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Media Layer */}
        {viewStory.media_type === "image" && (
          <img
            src={viewStory.media_url}
            alt=""
            className="max-w-full max-h-screen object-contain z-10"
          />
        )}
        {viewStory.media_type === "video" && (
          <video
            autoPlay
            controls
            src={viewStory.media_url}
            className="max-h-screen z-10"
            onEnded={() => setViewStory(null)}
          />
        )}

        {/* Text Layer: Shows for text-only OR as an overlay for media */}
        {viewStory.content && (
          <div
            className={`z-20 p-8 text-white text-center flex items-center justify-center ${
              viewStory.media_type === "text"
                ? "text-3xl font-bold w-full h-full" // Large text for text stories
                : "absolute bottom-20 left-0 right-0 bg-black/30 backdrop-blur-sm text-xl" // Caption style for media
            }`}
          >
            {viewStory.content}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    let timer, progressInterval;
    // We only automate progress for text and images. Videos are handled by onEnded.
    if (viewStory && viewStory.media_type !== "video") {
      setProgress(0);
      const duration = 10000; // 10 seconds
      const step = 100;
      let elapsed = 0;

      progressInterval = setInterval(() => {
        elapsed += step;
        setProgress((elapsed / duration) * 100);
      }, step);

      timer = setTimeout(() => {
        setViewStory(null);
      }, duration);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [viewStory, setViewStory]);

  return (
    <div
      className="fixed inset-0 h-screen z-[150] flex items-center justify-center transition-all duration-500"
      style={{
        backgroundColor: viewStory.background_color || "#000000",
      }}
    >
      {/* 1. Progress Bar (Top) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-[160]">
        <div
          className="h-full bg-white transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 2. User Info Overlay (Fixed Position) */}
      <div className="absolute top-6 left-6 flex items-center space-x-3 p-2 px-4 backdrop-blur-md rounded-full bg-black/40 z-[160] border border-white/20">
        <img
          src={viewStory.user?.profile_picture}
          className="size-8 rounded-full object-cover border border-white"
          alt=""
        />
        <div className="text-white font-medium flex items-center gap-1.5">
          <span>{viewStory.user?.full_name || viewStory.user?.username}</span>
          <BadgeCheck size={16} className="text-blue-400 fill-blue-400" />
        </div>
      </div>

      {/* 3. Close Button (Fixed Position) */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 text-white z-[160] p-2 hover:bg-white/10 rounded-full transition"
      >
        <X className="w-8 h-8 cursor-pointer" />
      </button>

      {/* 4. Main Content Wrapper */}
      <div className="w-full h-full flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoryViewer;