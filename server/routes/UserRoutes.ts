import express from 'express'
import { getUsersThumbnailbyId, getUsersThumbnails } from '../controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.get('/thumbnails',getUsersThumbnails)
UserRouter.get('/thumbnails/:id',getUsersThumbnailbyId)

export default UserRouter;