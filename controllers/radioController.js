import { getRadioStations } from '../services/radioService.js'; 
import { getStations, saveStations, searchInStations} from '../dal/DalStations.js';
import logger from '../utils/logger.js';



async function fetchandSaveStations() 
{
    const result = await getRadioStations('israel');
    
        const stations = result.map((station, index) => ({
            id: index + 1,
            name: station.name,
            url: station.url_resolved,
            image: station.favicon,
            genres: station.tags,
            votes: station.votes,
        }));
        
        saveStations(stations);
        logger.info(`Fetched and saved ${stations.length} stations from API to Dal`);
        return stations;
}

export async function getStationsInIsrael(req, res) 
{
    try{
        const result = await fetchandSaveStations();


        res.status(200).json({
            message: 'Radio stations from israel fetched into the Dal',
        });
    }
    
    catch(error)
    {        
        console.error(error);
        logger.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch radio stations from API' });
    }
}

export async function getStationsFromDal(req, res)
{
    try {
        let stations = getStations();

        if (stations.length === 0) 
        {
            logger.warn('No stations found in Dal, fetching from API...');
            stations = await fetchandSaveStations();

            return res.status(200).json({
                message: 'No stations found in Dal, saved new stations from API',
                total_stations: stations.length,
                data: stations,
            });
        }
        
        logger.info(`Fetched ${stations.length} stations from Dal`);
        res.status(200).json({
            message: 'Stations fetched from Dal',
            total_stations: stations.length,
            data: stations,
        });
    }
    catch (error)
    {
        console.error(error);
        logger.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch radio stations from Server Dal' });
    }
}

export async function searchStations(req, res)
{
    try 
    {
        const { searchInfo } = req.params;

        const results = searchInStations(searchInfo);

        if (results.length === 0)
        {
            logger.error('search Failed: No stations found matching the search criteria');
            return res.status(404).json({
                message: 'No stations found matching the search criteria',
            });
        }
        logger.info(`Search results: ${results.length} stations found matching the search criteria: ${searchInfo}`);
        res.status(200).json({
            data: results
        });
    }
    catch (error)
    {
        console.error(error);
        logger.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to search radio stations' });
    }
}
