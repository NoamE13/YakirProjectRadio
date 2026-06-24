import express from "express";
import radioRoutes from './routes/ApiRadioRoute.js';

const app = express();
const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

app.use(express.json());

app.use('/api', radioRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`External API URL: ${API_URL}`);
});
    