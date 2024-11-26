import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  // Register a new user
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

   
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'name, email, password, and role are required' });
      }

      
      if (!['Individual', 'Company', 'Admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Must be Individual, Company, or Admin' });
      }

      const result = await UserService.createUser(name, email, password, role); 

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        userId: result._id
      });
    } catch (error) {
      console.error(error);  
      if (error instanceof Error) {
        res.status(500).json({ message: error.message || 'Something went wrong during registration' });
      } else {
        res.status(500).json({ message: 'Unknown error during registration' });
      }
    }
  }

  // User login and JWT token generation
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

 
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const { token, refreshToken } = await UserService.authenticateUser(email, password); 

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        refreshToken
      });
    } catch (error) {
      console.error(error);  
      if (error instanceof Error) {
        res.status(400).json({ message: error.message || 'Login failed, please check credentials' });
      } else {
        res.status(400).json({ message: 'Unknown error during login' });
      }
    }
  }

  // Refresh the access token
  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;


      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }

      const result = await UserService.refreshToken(refreshToken); 

      res.status(200).json({
        success: true,
        message: 'Access token refreshed successfully',
        token: result.token
      });
    } catch (error) {
      console.error(error);  
      if (error instanceof Error) {
        res.status(400).json({ message: error.message || 'Invalid refresh token' });
      } else {
        res.status(400).json({ message: 'Unknown error with refresh token' });
      }
    }
  }

  // Get user by ID
  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;


      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const user = await UserService.getUserById(id);  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        user
      });
    } catch (error) {
      console.error(error);  
      if (error instanceof Error) {
        res.status(400).json({ message: error.message || 'Error fetching user' });
      } else {
        res.status(400).json({ message: 'Unknown error while fetching user' });
      }
    }
  }

 // gtting  users credits
async getUserCredits(req: Request, res: Response) {
  try {
    const { id } = req.params; 

  
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await UserService.getUserCredits(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User credits retrieved successfully',
      data: user.portfolio, 
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(404).json({ message: error.message || 'Error fetching user credits' });
    } else {
      res.status(500).json({ message: 'Unknown error fetching user credits' });
    }
   
  }
}


  // Update user details
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validate input
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const user = await UserService.updateUser(id, updateData); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(404).json({ message: error.message || 'Error updating user' });
      } else {
        res.status(500).json({ message: 'Unknown error during user update' });
      }
    }
  }

  // Delete a user
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

 
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const result = await UserService.deleteUser(id); 
      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error(error); 
      if (error instanceof Error) {
        res.status(404).json({ message: error.message || 'Error deleting user' });
      } else {
        res.status(500).json({ message: 'Unknown error during user deletion' });
      }
    }
  }
}

export default new UserController();
