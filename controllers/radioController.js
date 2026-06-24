import { getRadioStations } from '../services/radioService.js'; 
import { getStations, saveStations, searchInStations} from '../dal/DalStations.js';



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
        res.status(500).json({ error: 'Failed to fetch radio stations from API' });
    }
}

export async function getStationsFromDal(req, res)
{
    try {
        let stations = getStations();

        if (stations.length === 0) 
        {
            stations = await fetchandSaveStations();

            return res.status(200).json({
                message: 'No stations found in Dal, saved new stations from API',
                total_stations: stations.length,
                data: stations,
            });
        }

        res.status(200).json({
            message: 'Stations fetched from Dal',
            total_stations: stations.length,
            data: stations,
        });
    }
    catch (error)
    {
        console.error(error);
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
            return res.status(404).json({
                message: 'No stations found matching the search criteria',
            });
        }
        res.status(200).json({
            data: results
        });
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: 'Failed to search radio stations' });
    }
}
