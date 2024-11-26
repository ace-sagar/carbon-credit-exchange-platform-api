// marketController.ts
import { Request, Response } from 'express';
import MarketService from '../services/marketData.service'; // Adjust the path as necessary

class MarketController {
  // Fetch market data
  public async fetchMarketData(req: Request, res: Response): Promise<void> {
    try {
      const marketData = await MarketService.getMarketData();
      res.status(200).json(marketData);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message || 'error in fetchMarketData' });
          } else {
            res.status(500).json({ message: 'Unknown error in fetchMarketData' });
          }
    }
  }

  // Fetch market analytics
  public async fetchMarketAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const analytics = await MarketService.getMarketAnalytics();
      res.status(200).json(analytics);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message || 'error in fetchMarketAnalytics' });
          } else {
            res.status(500).json({ message: 'Unknown error in fetchMarketAnalytics' });
          }
    }
  }
}

// Export an instance of the controller
export default new MarketController();