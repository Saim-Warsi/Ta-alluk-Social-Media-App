// import fs from 'fs'
// import imageKit from '../configs/imageKit.js';
// import Post from '../models/Post.js';
// import User from '../models/User.js';
// import { escape } from 'querystring';
// //add post
// export const addPost= async(req,res)=>{
//     try{
//        const {userId} = req.auth();
//        const {content, post_type} = req.body;
//        const images = req.files
       
   

//        let image_urls = [] 
    
//        if(images.length){
//         image_urls = await Promise.all(
//             images.map(async(image)=>{
//                 const fileBuffer = fs.readFileSync(image.path)
//                 const responce = await imageKit.upload({
//                       file: fileBuffer,
//                       fileName: image.originalname,
//                       folder:"posts"
//                     })
//                     const url = imageKit.url({
//                       path: responce.filePath,
//                       transformation: [
//                         { quality: "auto"},
//                         { format: "webp"},
//                         { width: '1280'},
//                       ]
                
//                     })
//                     return url
//             })
//         )
//        }
//        await Post.create({
//         user: userId,
//         content,
//         image_urls,
//         post_type
//        })
//        res.json({success:true, message:"Post created successfully"})
//     } catch(err){
//         console.log(err);
//         res.json({success:false, message:err.message})
        
//     }
// }

// //get post
// export const getFeedPosts= async(req,res)=>{
//     try{
//         const {userId} = await req.auth()
//         const user = await User.findById(userId)

//         //user connections and following
//         const userIds = [userId, ...(user.connections || []), ...(user.following|| [])] 
//         const posts = await Post.find({user:{$in: userIds}}).populate('user').sort({createdAt: -1});
//         res.json({success:true, posts})
//     } catch(err){
//         console.log(err)
//         res.json({success:false, message:err.message})
//     }
// }

// //like post
// export const likePost = async(req,res)=>{
//     try{
//         const {userId} = req.auth()
//         const {postId} = req.body

//         const post = await Post.findById(postId)

//         if(post.likes_count.includes(userId)){
//             post.likes_count = post.likes_count.filter(user => user !== userId)
//             await post.save()
//             res.json({success:true, message: 'Post unliked'})
//         }else{
//             post.likes_count.push(userId)
//             await post.save()
//             res.json({success:true, message: 'Post liked'})
//         }
        
//     } catch(err){
//         console.log(err)
//         res.json({success:false, message:err.message})
//     }
// }

import fs from 'fs'
import imageKit from '../configs/imageKit.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

//add post
export const addPost = async(req,res)=>{
    try{
       const {userId} = req.auth();
       const {content, post_type} = req.body;
       const images = req.files
       
       let image_urls = [] 
    
       if(images.length){
        image_urls = await Promise.all(
            images.map(async(image)=>{
                const fileBuffer = fs.readFileSync(image.path)
                const responce = await imageKit.upload({
                      file: fileBuffer,
                      fileName: image.originalname,
                      folder:"posts"
                    })
                    const url = imageKit.url({
                      path: responce.filePath,
                      transformation: [
                        { quality: "auto"},
                        { format: "webp"},
                        { width: '1280'},
                      ]
                
                    })
                    return url
            })
        )
       }
       await Post.create({
        user: userId,
        content,
        image_urls,
        post_type
       })
       res.json({success:true, message:"Post created successfully"})
    } catch(err){
        console.log(err);
        res.json({success:false, message:err.message})
        
    }
}

//get post
// export const getFeedPosts = async(req,res)=>{
//     try{
//         const {userId} = await req.auth()
//         const user = await User.findById(userId)

//         //user connections and following
//         const userIds = [userId, ...(user.connections || []), ...(user.following|| [])] 
//         const posts = await Post.find({user:{$in: userIds}})
//             .populate('user')
//             .populate('comments.user') // Populate comment users
//             .sort({createdAt: -1});
//         res.json({success:true, posts})
//     } catch(err){
//         console.log(err)
//         res.json({success:false, message:err.message})
//     }
// }
//get post
export const getFeedPosts = async(req,res)=>{
    try{
        const {userId} = await req.auth()
        const user = await User.findById(userId)

        //user connections and following
        const userIds = [userId, ...(user.connections || []), ...(user.following|| [])] 
        const posts = await Post.find({user:{$in: userIds}})
            .populate('user')
            .populate('comments.user')
            .populate({
                path: 'shared_post',
                populate: [
                    { path: 'user' },
                    { path: 'comments.user' }  // Add this to populate comments in shared posts
                ]
            })
            .sort({createdAt: -1});
        res.json({success:true, posts})
    } catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

//like post
export const likePost = async(req,res)=>{
    try{
        const {userId} = req.auth()
        const {postId} = req.body

        const post = await Post.findById(postId)

        if(post.likes_count.includes(userId)){
            post.likes_count = post.likes_count.filter(user => user !== userId)
            await post.save()
            res.json({success:true, message: 'Post unliked'})
        }else{
            post.likes_count.push(userId)
            await post.save()
            res.json({success:true, message: 'Post liked'})
        }
        
    } catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

//add comment to post
export const addComment = async(req,res)=>{
    try{
        const {userId} = req.auth()
        const {postId, text} = req.body

        if(!text || text.trim() === ''){
            return res.json({success:false, message: 'Comment cannot be empty'})
        }

        const post = await Post.findById(postId)
        
        if(!post){
            return res.json({success:false, message: 'Post not found'})
        }

        const newComment = {
            user: userId,
            text: text.trim(),
            createdAt: new Date()
        }

        post.comments.push(newComment)
        await post.save()

        // Populate the user data for the newly added comment
        await post.populate('comments.user')
        
        // Get the newly added comment with user data
        const addedComment = post.comments[post.comments.length - 1]

        res.json({
            success:true, 
            message: 'Comment added',
            comment: addedComment
        })
        
    } catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

//delete comment from post
export const deleteComment = async(req,res)=>{
    try{
        const {userId} = req.auth()
        const {postId, commentId} = req.body

        const post = await Post.findById(postId)
        
        if(!post){
            return res.json({success:false, message: 'Post not found'})
        }

        const comment = post.comments.id(commentId)
        
        if(!comment){
            return res.json({success:false, message: 'Comment not found'})
        }

        // Check if user owns the comment or owns the post
        if(comment.user.toString() !== userId && post.user.toString() !== userId){
            return res.json({success:false, message: 'Not authorized to delete this comment'})
        }

        post.comments.pull(commentId)
        await post.save()

        res.json({success:true, message: 'Comment deleted'})
        
    } catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

//get comments for a post
export const getComments = async(req,res)=>{
    try{
        const {postId} = req.params

        const post = await Post.findById(postId)
            .populate('comments.user')
            .select('comments')
        
        if(!post){
            return res.json({success:false, message: 'Post not found'})
        }

        res.json({
            success:true, 
            comments: post.comments.sort((a, b) => b.createdAt - a.createdAt)
        })
        
    } catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

//share post (repost)
export const sharePost = async(req,res)=>{
    try{
        const {userId} = req.auth()
        const {postId, shareText} = req.body

        const originalPost = await Post.findById(postId).populate('user')
        
        if(!originalPost){
            return res.json({success:false, message: 'Post not found'})
        }

        // Check if user already shared this post
        const alreadyShared = await Post.findOne({
            user: userId,
            shared_post: postId
        })

        if(alreadyShared){
            return res.json({success:false, message: 'You have already shared this post'})
        }

        // Create a new post that references the original
        const sharedPost = await Post.create({
            user: userId,
            content: shareText || '', // Optional text the user adds when sharing
            image_urls: [],
            post_type: 'text',
            shared_post: postId
        })

        // Add user to shares_count of original post
        originalPost.shares_count.push(userId)
        await originalPost.save()

        // Populate the shared post data
        await sharedPost.populate('user')
        await sharedPost.populate({
            path: 'shared_post',
            populate: {
                path: 'user'
            }
        })

        res.json({
            success:true, 
            message: 'Post shared successfully',
            post: sharedPost
        })
        
    } catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

//unshare post (remove repost)
export const unsharePost = async(req,res)=>{
    try{
        const {userId} = req.auth()
        const {postId} = req.body

        // Find the shared post created by this user
        const sharedPost = await Post.findOne({
            user: userId,
            shared_post: postId
        })

        if(!sharedPost){
            return res.json({success:false, message: 'You have not shared this post'})
        }

        // Remove user from shares_count of original post
        const originalPost = await Post.findById(postId)
        originalPost.shares_count = originalPost.shares_count.filter(user => user !== userId)
        await originalPost.save()

        // Delete the shared post
        await Post.findByIdAndDelete(sharedPost._id)

        res.json({success:true, message: 'Post unshared successfully'})
        
    } catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

//get users who shared a post
export const getPostShares = async(req,res)=>{
    try{
        const {postId} = req.params

        const post = await Post.findById(postId).populate('shares_count')
        
        if(!post){
            return res.json({success:false, message: 'Post not found'})
        }

        res.json({
            success:true, 
            shares: post.shares_count
        })
        
    } catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}