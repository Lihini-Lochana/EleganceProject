import axios from 'axios';

class TourPackageService {
    getAllTourPackages() {
        return axios.get('http://localhost:8080/api/tour-packages');
    }

    getTourPackageById(id) {
        return axios.get(`http://localhost:8080/api/tour-packages/${id}`);
    }

    getTourPackagesBySeason(seasonId) {
        return axios.get(`http://localhost:8080/api/tour-packages/season/${seasonId}`);
    }

    async createTourPackage(packageData) {
        try {
            const response = await axios.post('http://localhost:8080/api/tour-packages', packageData);
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data);
            } else {
                throw new Error("Failed to create tour package.");
            }
        }
    }

    deleteTourPackage(id) {
        return axios.delete(`http://localhost:8080/api/tour-packages/${id}`);
    }
}

const tourPackageService = new TourPackageService();
export default tourPackageService;
