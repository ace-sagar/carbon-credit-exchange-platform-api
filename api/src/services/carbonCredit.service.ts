import CarbonCredit, { ICarbonCredit } from '../models/carbonCredit.model';
import User from '../models/user.model';

class CarbonCreditService {
  // Retrieve all carbon credits
  async getAllCredits(): Promise<ICarbonCredit[]> {
    return await CarbonCredit.find();
  }

  // Retrieve a specific carbon credit by ID
  async getCreditById(creditId: string): Promise<ICarbonCredit | null> {
    return await CarbonCredit.findById(creditId);
  }

  // Create a new carbon credit
  async createCredit(data: Partial<ICarbonCredit>): Promise<ICarbonCredit> {
    try {
      const newCredit = new CarbonCredit(data);
      return await newCredit.save();
    } catch (error) {
      throw new Error('Error creating carbon credit');
    }
  }

  // Update an existing carbon credit
  async updateCredit(creditId: string, data: Partial<ICarbonCredit>): Promise<ICarbonCredit | null> {
    try {
      return await CarbonCredit.findOneAndUpdate({ creditId }, data, { new: true });
    } catch (error) {
      throw new Error('Error updating carbon credit');
    }
  }

  // Delete a carbon credit
  async deleteCredit(creditId: string): Promise<ICarbonCredit | null> {
    try {
      const deletedCredit = await CarbonCredit.findByIdAndDelete(creditId);
      if (deletedCredit) {
        await User.updateMany({}, { $pull: { portfolio: creditId } });
      }
      return deletedCredit;
    } catch (error) {
      throw new Error('Error deleting carbon credit');
    }
  }
}

export default new CarbonCreditService();
