import { Request, Response } from 'express';
import UserService from '../services/user.service';

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, role } = req.body;
      const user = await UserService.createUser(email, password, role);
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await UserService.authenticateUser(email, password);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error: any) {
      res.status(400).json({ message: 'Login failed', error: error.message });
    }
  }
}

export default new UserController();
