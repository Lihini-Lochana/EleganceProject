import axios from 'axios';

class PackagePlaceService {
    getAllPackagePlaces() {
        return axios.get('http://localhost:8080/api/package-places');
    }

    getPackagePlaceById(id) {
        return axios.get(`http://localhost:8080/api/package-places/${id}`);
    }

    getPackagePlacesByTourPackageId(tourPackageId) {
        return axios.get(`http://localhost:8080/api/package-places/tour-package/${tourPackageId}`);
    }

    createPackagePlace(packagePlace) {
        return axios.post('http://localhost:8080/api/package-places', packagePlace);
    }

    updatePackagePlace(id, packagePlace) {
        return axios.put(`http://localhost:8080/api/package-places/${id}`, packagePlace);
    }

    deletePackagePlace(id) {
        return axios.delete(`http://localhost:8080/api/package-places/${id}`);
    }
}

const packagePlaceService = new PackagePlaceService();
export default packagePlaceService;
