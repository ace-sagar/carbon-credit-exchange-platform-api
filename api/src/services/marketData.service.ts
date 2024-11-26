
import MarketData from '../models/marketData'; 

class MarketService {
    
  // Get market data
  public async getMarketData() {
    const marketData = await MarketData.find().populate('creditId');
    return marketData.map(data => ({
      creditId: data.creditId,
      price: data.priceHistory[data.priceHistory.length - 1]?.price || 0, 
      tradingVolume: data.tradingVolume,
      priceHistory: data.priceHistory,
    }));
  }

  // Get market analytics
  public async getMarketAnalytics() {
    const marketData = await MarketData.find().populate('creditId');

    // Calculate insights
    const mostTradedCredits = marketData
      .sort((a, b) => b.tradingVolume - a.tradingVolume)
      .slice(0, 5)
      .map(data => ({
        creditId: data.creditId,
        tradingVolume: data.tradingVolume,
      }));

    const averagePrices = marketData.map(data => {
      const totalPrice = data.priceHistory.reduce((acc, priceData) => acc + priceData.price, 0);
      const averagePrice = totalPrice / data.priceHistory.length;
      return {
        creditId: data.creditId,
        averagePrice,
      };
    });

    // dummy news
    const marketNews = "Market is trending upwards with increasing trading volume."; // Placeholder for actual market news

    return {
      mostTradedCredits,
      averagePrices,
      marketNews,
    };
  }
}

// Export an instance of the service
export default new MarketService();