import express from 'express';
import { getStationsInIsrael, getStationsFromDal, searchStations } from '../controllers/radioController.js';

const router = express.Router();

router.get('/Api-stations', getStationsInIsrael);
router.get('/dal-stations', getStationsFromDal);
router.get('/dal-stations/search/:searchInfo', searchStations);

export default router;