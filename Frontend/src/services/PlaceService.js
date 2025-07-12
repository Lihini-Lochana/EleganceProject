import axios from 'axios';

class PlaceService {
    uploadImage(file) {
        const formData = new FormData();
        formData.append('file', file);

        return axios.post('http://localhost:8080/api/places/upload-place-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    async createPlace(placeData) {
        try {
            if (placeData.imageUrl) {
                const imageResponse = await this.uploadImage(placeData.imageUrl
                );
                placeData.imageUrl = imageResponse.data; 
            }

            const response = await axios.post('http://localhost:8080/api/places', placeData);
            return response.data;
        } catch (error) {
            console.error("Error creating place:", error);
            throw error;
        }
    }

    getAllPlaces() {
        return axios.get('http://localhost:8080/api/places');
    }

    getPlaceById(id) {
        return axios.get(`http://localhost:8080/api/places/${id}`);
    }

    updatePlace(id) {
        return axios.put(`http://localhost:8080/api/places/${id}`);
    }

    deletePlace(id) {
        return axios.delete(`http://localhost:8080/api/places/${id}`);
    }

  
}

const placeService = new PlaceService();
export default placeService;
