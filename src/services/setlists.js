import API from './api';
const setlistUri = 'setlist';
const setlistSongUri = 'setlistSong';

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

const updateSongToSetlist = async (setlistId, songId, data) => {
    const setlistSongPutUri = `${setlistsong}/${setlistId}/${songId}`;
    return await API.put(setlistSongPutUri, data);
};

const SetlistService = {
    getSetlists,
    saveSetlist,
    addSongToSetlist,
    updateSongToSetlist,
};

export default SetlistService;