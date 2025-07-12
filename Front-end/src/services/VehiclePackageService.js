import axios from 'axios';

class VehiclePackageService {
    getAllVehiclePackages() {
        return axios.get('http://localhost:8080/api/vehicle-packages');
    }

    getVehiclePackageById(id) {
        return axios.get(`http://localhost:8080/api/vehicle-packages/${id}`);
    }

    getVehiclePackagesByTourPackageId(tourPackageId) {
        return axios.get(`http://localhost:8080/api/vehicle-packages/tour-package/${tourPackageId}`);
    }

    createVehiclePackage(vehiclePackage) {
        return axios.post('http://localhost:8080/api/vehicle-packages', vehiclePackage);
    }

    updateVehiclePackage(id, vehiclePackage) {
        return axios.put(`http://localhost:8080/api/vehicle-packages/${id}`, vehiclePackage);
    }

    deleteVehiclePackage(id) {
        return axios.delete(`http://localhost:8080/api/vehicle-packages/${id}`);
    }
}

const vehiclePackageService = new VehiclePackageService();
export default vehiclePackageService;
