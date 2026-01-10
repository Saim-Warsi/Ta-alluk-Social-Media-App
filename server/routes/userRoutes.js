import express from 'express';
import { acceptConnectionRequest, discoverUsers, followUser, getUserConnections, getUserData, getUserProfiles, sendConnectionRequest, unfollowUser, updateUserData, getSuggestedUsers } from '../controllers/userController.js';
import {protect} from '../middlewares/auth.js'
import {upload} from '../configs/multer.js'
import { getUserRecentMessages } from '../controllers/messageController.js';

const userRoute = express.Router();

userRoute.get('/data', protect , getUserData)
userRoute.post('/update', upload.fields([{name: 'profile', maxCount: 1},{name: 'cover', maxCount: 1}]) ,protect , updateUserData)
userRoute.post('/discover', protect , discoverUsers)
userRoute.post('/follow', protect , followUser)
userRoute.post('/unfollow', protect , unfollowUser)
userRoute.post('/connect', protect , sendConnectionRequest)
userRoute.post('/accept', protect , acceptConnectionRequest)
userRoute.get('/connections', protect , getUserConnections)
userRoute.post('/profiles', getUserProfiles)
userRoute.get('/recent-messages', protect , getUserRecentMessages)
userRoute.get('/suggested', protect, getSuggestedUsers)


export default userRoute