Radio Stations API

A robust Node.js and Express backend service designed to fetch, cache, and search for radio stations using an external API. 

Features:
- Fetch & Cache: Retrieves live radio station data from an external API and stores it locally in the server's DAL to improve performance.
- Smart Search: Allows users to search for specific stations by their exact ID or by partial matches in the station's name (case-insensitive).
- Modular Architecture: Built with clean code principles, separating Routes, Controllers, Services, and the DAL.

Prerequisites:
- Node.js installed on your machine.

Installation:
1. Clone the repository and navigate to the project directory.
2. Install the required dependencies using: npm install

Environment Variables:
This project requires a .env file to run properly. Please create a .env file in the root directory and add the following variables:
PORT=1306
API_URL=[https://de1.api.radio-browser.info/json](https://de1.api.radio-browser.info/json)

Running the Server:
- Development mode: npm run dev
- Production mode: npm start
Once running, the server will be available at http://localhost:1306.

API Endpoints (All endpoints are prefixed with /api):
- GET /api/Api-stations : Fetches data directly from the external API, cleans it, and overwrites the local DAL.
- GET /api/dal-stations : Retrieves all saved stations from the local DAL. Acts as a smart fallback if empty.
- GET /api/dal-stations/search/:searchInfo : Searches the local DAL for a specific station by ID or name.