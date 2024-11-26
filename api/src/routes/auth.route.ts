import express from 'express';
import UserController from '../controllers/user.controller';
import asyncHandler from '../middleware/userMiddleware';

const router = express.Router();

// Define routes
router.post('/register', asyncHandler(UserController.register));
router.post('/login', asyncHandler(UserController.login));
router.post('/refresh', asyncHandler(UserController.refresh));
router.get('/user/:id', asyncHandler(UserController.getUserById));
router.get('/user/:id/credits', asyncHandler(UserController.getUserCredits));
router.put('/user/:id', asyncHandler(UserController.update));
router.delete('/user/:id', asyncHandler(UserController.delete));

export default router;
