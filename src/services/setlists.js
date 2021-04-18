
import API from './api';

const getSetlists = async () => {
    return await API.get('setlist');
};

const SetlistService = {
    getSetlists,
};

export default SetlistService;