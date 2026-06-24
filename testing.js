import { getRadioStations } from './services/radioService.js'; 

// פונקציה אסינכרונית קטנה כדי להריץ את הבדיקה
const runTest = async () => {
    try {
        console.log("Testing radio service...");
        const stations = await getRadioStations('israel');
        console.log("Success! Found", stations.length, "stations.");
        console.log(stations[3]); // נדפיס רק את התחנה הראשונה כדי לראות את הפורמט
    } catch (error) {
        console.error("Test failed:", error);
    }
};

runTest();