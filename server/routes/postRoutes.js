// import express from 'express'
// import {upload} from '../configs/multer.js'
// import { addPost, getFeedPosts, likePost } from '../controllers/postController.js'
// import { protect } from '../middlewares/auth.js'

// const postRouter = express.Router()

// postRouter.post('/add',upload.array('images',4),protect, addPost)
// postRouter.get('/feed',protect, getFeedPosts)
// postRouter.post('/like',protect, likePost)

// export default postRouter
// import express from 'express'
// import {upload} from '../configs/multer.js'
// import { addPost, getFeedPosts, likePost, addComment, deleteComment, getComments } from '../controllers/postController.js'
// import { protect } from '../middlewares/auth.js'

// const postRouter = express.Router()

// postRouter.post('/add',upload.array('images',4),protect, addPost)
// postRouter.get('/feed',protect, getFeedPosts)
// postRouter.post('/like',protect, likePost)
// postRouter.post('/comment/add',protect, addComment)
// postRouter.post('/comment/delete',protect, deleteComment)
// postRouter.get('/comments/:postId',protect, getComments)

// export default postRouter

import express from 'express'
import {upload} from '../configs/multer.js'
import { 
    addPost, 
    getFeedPosts, 
    likePost, 
    addComment, 
    deleteComment, 
    getComments,
    sharePost,
    unsharePost,
    getPostShares
} from '../controllers/postController.js'
import { protect } from '../middlewares/auth.js'

const postRouter = express.Router()

postRouter.post('/add',upload.array('images',4),protect, addPost)
postRouter.get('/feed',protect, getFeedPosts)
postRouter.post('/like',protect, likePost)
postRouter.post('/comment/add',protect, addComment)
postRouter.post('/comment/delete',protect, deleteComment)
postRouter.get('/comments/:postId',protect, getComments)
postRouter.post('/share',protect, sharePost)
postRouter.post('/unshare',protect, unsharePost)
postRouter.get('/shares/:postId',protect, getPostShares)

export default postRouter