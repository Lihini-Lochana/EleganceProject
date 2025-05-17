import axios from 'axios';

class VehicleService {

    uploadImage(file) {
        const formData = new FormData();
        formData.append('file', file);

        return axios.post('http://localhost:8080/api/vehicles/upload-vehicle-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    async createVehicle(vehicleData) {
        try {
            if (vehicleData.imageUrl) {
                const imageResponse = await this.uploadImage(vehicleData.imageUrl);
                vehicleData.imageUrl = imageResponse.data; 
            }

            const response = await axios.post('http://localhost:8080/api/vehicles', vehicleData);
            return response.data;
        } catch (error) {
            console.error("Error creating place:", error);
            throw error;
        }
    }

    getAllVehicles() {
        return axios.get('http://localhost:8080/api/vehicles');
    }

    getVehicleById(id) {
        return axios.get(`http://localhost:8080/api/vehicles/${id}`);
    }

    getAvailableVehicles(passengerCount) {
        return axios.get(`http://localhost:8080/api/vehicles/available`, {
            params: { passengerCount }
        });
    }


    deleteVehicle(id) {
        return axios.delete(`http://localhost:8080/api/vehicles/${id}`);
    }
}

const vehicleService = new VehicleService();
export default vehicleService;
