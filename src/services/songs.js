import API from './api';
const uri = 'song';

const getAllSongs = async () => {
    return await API.get(uri);
};

const saveSong = async song => {
    if(song.id){
        const url =`${uri}/${song.id}`;
        const songData = {
            title: song.title,
            artist: song.artist,
            lyrics: song.lyrics,
            time: song.time
        }
        return await API.put(url, songData);
    }else{
        return await API.post(uri, song);
    }
};

const SongService = {
    getAllSongs,
    saveSong,
};

export default SongService;