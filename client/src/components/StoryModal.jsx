import { useAuth } from "@clerk/clerk-react";
import { ArrowLeft, Sparkle, TextIcon, Upload } from "lucide-react";
import { useState } from "react"
import {toast} from 'react-hot-toast'
import api from "../api/axios";

const StoryModal = ({setShowModal , fetchStories}) => {
    const bgColors = [
        "#EAB308",
        "#4f46e5",
        "#db2777",
        "#7c3aed",
        "#e11d48",
        "#0d9488"
];

    const { getToken } = useAuth()
    const [mode, setMode] = useState("text");
    const [background, setBackground] = useState(bgColors[0]);
    const [text, setText] = useState("");
    const [media, setMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const max_video_duration = 60; //seconds
    const max_video_size = 50; //megabytes

    // const handleMediaUpload = (e)=>{
    //     const file = e.target.files?.[0]
    //     if(file){
    //        if(file.type.startsWith('video')){
    //         if(file.size > max_video_size * 1024 * 1024){
    //             toast.error(`File size should be under ${max_video_size} MBs`)
    //         }
    //         setMedia(null)
    //         setPreviewUrl(null)
    //         return
    //        }
    //        const video = document.createElement('video')

    //        video.preload = 'metadata'
    //        video.onloadedmetadata = ()=> {
    //         window.URL.revokeObjectURL(video.src)
    //         if(video.duration > max_video_duration){
    //             toast.error("Video can't be longer than 1 minute.")
    //             setMedia(null)
    //             setPreviewUrl(null)
    //         } else{
    //             setMedia(file)
    //             setPreviewUrl(URL.createObjectURL(file))
    //             setText('')
    //             setMode('media')

    //         }
    //        }

    //        video.src = URL.createObjectURL(file)
    //     } else if(file.type.startsWith("image")){
    //         setMedia(file)
    //             setPreviewUrl(URL.createObjectURL(file))
    //             setText('')
    //             setMode('media')
    //     }
    // };
const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset preview/media before processing new file
    setMedia(null);
    setPreviewUrl(null);

    // CASE 1: VIDEO
    if (file.type.startsWith('video')) {
        if (file.size > max_video_size * 1024 * 1024) {
            return toast.error(`File size should be under ${max_video_size} MBs`);
        }

        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
            if (video.duration > max_video_duration) {
                toast.error("Video can't be longer than 1 minute.");
            } else {
                setMedia(file);
                setPreviewUrl(URL.createObjectURL(file));
                setText('');
                setMode('media');
            }
        };
        video.src = URL.createObjectURL(file);
    } 
    // CASE 2: IMAGE
    else if (file.type.startsWith("image")) {
        setMedia(file);
        setPreviewUrl(URL.createObjectURL(file));
        setText('');
        setMode('media');
    }
};
    const handleCreateStory = async ()=>{
        const media_type = mode === 'media' ? media.type.startsWith('image') ? 'image' : 'video' : 'text' ;
        if(media_type === 'text' && !text){
            throw new Error("Can't create empty story.")
        }
        let formData = new FormData();
        formData.append('content', text);
        formData.append('media_type', media_type);
        formData.append('media', media);
        formData.append('background_color', background);

        const token = await getToken();
        try {
            const {data} = await api.post('/api/story/create',formData,{headers:{Authorization: `Bearer ${await getToken()}`}})
            if(data.success){
                setShowModal(false)
                toast.success("Story created!")
                fetchStories()
            }else{
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

  return (
    <div className="fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-4 flex items-center justify-between">
                <button onClick={()=>setShowModal(false)} className="text-white p-2 cursor-pointer">
                    <ArrowLeft />
                </button>
                <h2 className="text-lg font-semibold">Create</h2>
                <span className="w-10"></span>
            </div>
            <div className="rounded-lg h-96 flex items-center justify-center relative" style={{backgroundColor: background}}>
                {
                    mode === 'text'  && (
                        <textarea className="bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none" placeholder="What's on your mind?"
                        onChange={(e)=>setText(e.target.value)} value={text}/>
                    )
                }
                {
                    mode === "media" && previewUrl && (
                        media?.type.startsWith('image') ? (
                            <img src={previewUrl} alt="" className="object-contain max-h-full "/>
                        ) : (
                            <video src={previewUrl} className="object-contain max-h-full"></video>
                        )
                    )
                }
            </div>
            <div className="flex mt-4 gap-2">
                {
                    bgColors.map((color)=>{
                        return(
                            <button key={color} className="w-6 h-6 rounded-full ring cursor-pointer" style={{backgroundColor: color}}
                            onClick={()=>setBackground(color)}
                            />
                        )
                    })
                }
            </div>

             <div className="flex mt-4 gap-2">
                <button onClick={()=>{setMode('text'); setMedia(null); setPreviewUrl(null)}}
                 className={`flex-1 flex items-center justify-center gap-2 p-2 rounded ${mode === "text" ? "bg-white text-black ": "bg-zinc-800"}`}>
                    <TextIcon size={18}/> Text
                </button>
                <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'media' ? "bg-white text-black" : "bg-zinc-800"}`}>
                    <input onChange={handleMediaUpload} type="file" accept="image/*, video/*" className="hidden"/>
                    <Upload size={18}/> Media
                </label>
            </div>
                <button 
                onClick={()=>toast.promise(handleCreateStory(),{
                    loading: 'Saving...',})} className="flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-yellow-500 hover:bg-yellow-400 active:scale-95 transition cursor-pointer">
                    <Sparkle size={18}/> Create
                </button>
        </div>        
    </div>
  )
}

export default StoryModal