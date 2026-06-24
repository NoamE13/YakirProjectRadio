let localStations = [];

export const saveStations = (station) => 
{
    localStations = station;
}

export const getStations = () => 
{
    return localStations;
}

export const searchInStations = (searchInfo) => 
{
    const lowerInfo = searchInfo.toLowerCase();

    return localStations.filter(station => {
        if(station.id == searchInfo){
            return true;
        }
        if(station.name){
            const lowername = station.name.toLowerCase();
            if (lowername.includes(lowerInfo)) {
                return true;
            }
        }

        return false;
    });
}
