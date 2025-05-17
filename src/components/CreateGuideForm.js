import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateGuideForm.css";

const CreateGuideForm = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const handleImageUpload = async () => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append("file", imageFile);

        try {
            const response = await axios.post("http://localhost:8080/api/guides/upload-guide-image", formData);
            return response.data; 
        } catch (error) {
            console.error("Image upload failed:", error);
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const imageUrl = await handleImageUpload();

        if (!imageUrl) {
            alert("Image upload failed. Please try again.");
            return;
        }

        const guideData = {
            name,
            phone,
            email,
            address,
            imageUrl,
        };

        try {
            await axios.post("http://localhost:8080/api/guides", guideData);
            navigate("/view-guides");
        } catch (error) {
            console.error("Error creating guide:", error);
            alert("Failed to create guide.");
        }
    };

    return (
        <div className="add-guide-container">
            <h2>Add New Guide</h2>
            <form onSubmit={handleSubmit} className="add-guide-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Save Guide</button>
            </form>
        </div>
    );
};

export default CreateGuideForm;
