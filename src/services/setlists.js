import API from './api';
const uri = 'setlist';

const getSetlists = async () => {
    return await API.get(uri);
};

const saveSetlist = async setlist => {
    return await API.post(uri, setlist);
};

const SetlistService = {
    getSetlists,
    saveSetlist,
};

export default SetlistService;