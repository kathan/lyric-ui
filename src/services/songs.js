import API from './api';
const uri = 'song';

const getAllSongs = async () => {
    return await API.get(uri);
};

const saveSong = async song => {
    return await API.post(uri, song);
};

const SongService = {
    getAllSongs,
    saveSong,
};

export default SongService;