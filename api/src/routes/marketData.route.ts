import  express  from "express";
import MarketDataController from "../controllers/marketData.controller";

const router = express.Router();


//route of fetch market data 
router.get('/marketData',MarketDataController.fetchMarketData);

//route of fetch market analytics
router.get('/marketAnalytics',MarketDataController.fetchMarketAnalytics)

export default router;