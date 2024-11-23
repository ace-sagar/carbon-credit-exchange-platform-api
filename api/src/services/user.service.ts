import User, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
  async createUser(email: string, password: string, role: string): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    return user.save();
  }

  async authenticateUser(email: string, password: string): Promise<string | null> {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret');
    return token;
  }
}

export default new UserService();
