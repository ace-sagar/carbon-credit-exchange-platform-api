import { Router } from 'express';
import CarbonCreditController from '../controllers/carbonCredit.controller';

const router = Router();

// Routes
router.get('/credits', CarbonCreditController.getAllCredits);
router.get('/credits/:creditId', CarbonCreditController.getCreditById);
router.post('/credits', CarbonCreditController.createCredit);
router.put('/credits/:creditId', CarbonCreditController.updateCredit);
router.delete('/credits/:creditId', CarbonCreditController.deleteCredit);

export default router;
