import API from './api';
const setlistUri = 'setlist';
const setlistSongUri = 'setlistsong';

const getSetlists = async () => {
    return await API.get(setlistUri);
};

const saveSetlist = async setlist => {
    return await API.post(setlistUri, setlist);
};

const addSongToSetlist = async (setlistId, songId) => {
    const body = {
        setlistId,
        songId
    };
    return await API.post(setlistSongUri, body);
};

const SetlistService = {
    getSetlists,
    saveSetlist,
    addSongToSetlist,
};

export default SetlistService;