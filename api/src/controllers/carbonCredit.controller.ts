import { Request, Response } from 'express';
import CarbonCreditService from '../services/carbonCredit.service';

class CarbonCreditController {
  // Fetch all carbon credits
  async getAllCredits(req: Request, res: Response): Promise<void> {
    try {
      const credits = await CarbonCreditService.getAllCredits();
      res.status(200).json(credits);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching carbon credits', error: error.message });
    }
  }

  // Fetch specific carbon credit details
  async getCreditById(req: Request, res: Response): Promise<void> {
    try {
      const { creditId } = req.params;
      const credit = await CarbonCreditService.getCreditById(creditId);

      if (!credit) {
        res.status(404).json({ message: 'Carbon credit not found' });
        return;
      }

      res.status(200).json(credit);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching carbon credit details', error: error.message });
    }
  }

  // Create a new carbon credit
  async createCredit(req: Request, res: Response): Promise<void> {
    const { creditId, type, price, projectDetails, availability } = req.body;

    if (!type || !price || !projectDetails || !availability) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    try {
      const newCredit = await CarbonCreditService.createCredit({
        type,
        price,
        projectDetails,
        availability,
      });

      res.status(201).json({
        message: 'Carbon credit created successfully',
        data: newCredit,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error while creating credit' });
      }
    }
  }

  // Update an existing carbon credit
  async updateCredit(req: Request, res: Response): Promise<void> {
    const { creditId } = req.params;
    const updates = req.body;

    if (!creditId) {
      res.status(400).json({ message: 'Credit ID is required for update' });
      return;
    }

    try {
      const updatedCredit = await CarbonCreditService.updateCredit(creditId, updates);

      if (!updatedCredit) {
        res.status(404).json({ message: 'Carbon credit not found' });
        return;
      }

      res.status(200).json({
        message: 'Carbon credit updated successfully',
        data: updatedCredit,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error while updating credit' });
      }
    }
  }

  // Delete a carbon credit
  async deleteCredit(req: Request, res: Response): Promise<void> {
    const { creditId } = req.params;

    if (!creditId) {
      res.status(400).json({ message: 'Credit ID is required for deletion' });
      return;
    }

    try {
      const deletedCredit = await CarbonCreditService.deleteCredit(creditId);

      if (!deletedCredit) {
        res.status(404).json({ message: 'Carbon credit not found' });
        return;
      }

      res.status(200).json({ message: 'Carbon credit deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error while deleting credit' });
      }
    }
  }
}

export default new CarbonCreditController();
