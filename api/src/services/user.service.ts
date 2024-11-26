import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
  // Method to create a new user (register)
  async createUser(name: string, email: string, password: string, role: string): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email is already in use');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role, portfolio: [] });
    return user.save();
  }

  // Method to authenticate a user (login)
  async authenticateUser(email: string, password: string): Promise<{ token: string; refreshToken: string }> {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    // Generate tokens with a secret from environment variable
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    return { token, refreshToken };
  }

  // Method to refresh an expired access token
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'secret') as jwt.JwtPayload;
      const token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
      return { token };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }


   //  get user by ID
   async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await User.findById(userId);  
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new Error('Error fetching user');
    }
  }


  async getUserCredits(userId: string): Promise<IUser | null> {
    try {
      const user = await User.findById(userId).populate('portfolio');
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new Error(`Error fetching user's credits`);
    }
  }


   // Update a user's details
  async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) throw new Error('User not found');
    return user;
  }

  // Delete a user
  async deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error('User not found');
    return { success: true, message: 'User deleted successfully' };
  }
}


export default new UserService();
