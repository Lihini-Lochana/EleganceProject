import axios from 'axios';

class SeasonService {
    getAllSeasons() {
        return axios.get('http://localhost:8080/api/seasons');
    }

    getSeasonById(id) {
        return axios.get(`http://localhost:8080/api/seasons/${id}`);
    }

    createSeason(season) {
        return axios.post('http://localhost:8080/api/seasons', season);
    }

    deleteSeason(id) {
        return axios.delete(`http://localhost:8080/api/seasons/${id}`);
    }
}

const seasonService = new SeasonService();
export default seasonService;
