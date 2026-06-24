
const API_URL = process.env.API_URL;


export const getRadioStations = async (country) => 
{
    const url = `${API_URL}/stations/bycountry/${country}`;

    console.log(url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching radio stations: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}