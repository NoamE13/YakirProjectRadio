import express from "express";
import radioRoutes from './routes/ApiRadioRoute.js';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

app.use(express.json());

app.use((req, res, next) => {
    logger.http(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use('/api', radioRoutes);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    logger.info(`API URL: ${API_URL}`);
});
    