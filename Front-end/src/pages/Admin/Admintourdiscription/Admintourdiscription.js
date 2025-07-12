import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminNavbar from "../../../compornents/Adminnavbar";
import Adminsidebar from "../../../compornents/Adminsidebar";

const AddPackage = () => {
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [packages, setPackages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [tour_topicnumber, setCurrentPackageId] = useState(null);
  const navigate = useNavigate();


  const id_number = localStorage.getItem("selectedPackage");
  

  // Fetch all packages
  const fetchPackages = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/tour-topics");
      const data = await response.json();
      if (Array.isArray(data)) {
        setPackages(data);
      } else {
        console.error("Expected array, got:", data);
        setPackages([]);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Submit Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const packageData = {
      package_name: packageName,
      description: description,
      tour_topicnumber: tour_topicnumber,
    };

    try {
      const response = await fetch(
        editMode
          ? `http://localhost:8080/api/packages/${tour_topicnumber}`
          : "http://localhost:8080/api/tour-topics/save",
        {
          method: editMode ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(packageData),
        }
      );

      if (response.ok) {
        console.log(editMode ? "Package Updated" : "Package Added");
        setPackageName("");
        setDescription("");
        setEditMode(false);
        setCurrentPackageId(null);
        fetchPackages();
      } else {
        console.error("Failed to save package");
      }
    } catch (error) {
      console.error("Error submitting package:", error);
    }
  };

  const handleEdit = (pkg) => {
    setPackageName(pkg.package_name);
    setDescription(pkg.description);
    setEditMode(true);
    setCurrentPackageId(pkg.tour_topicnumber);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tour-topics/${tour_topicnumber}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Package Deleted");
        fetchPackages();
      } else {
        console.error("Failed to delete package");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };




  return (
    
    <div style={{ padding: "0px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Adminsidebar />
      <AdminNavbar />
      <div style={{marginLeft:"23%",marginTop:"8%"}}>
      <Container className="mt-4">
        <Card style={{ padding: "30px", borderRadius: "15px" }}>
          <Card.Body>
            <h3 className="text-center mb-4">
              {editMode ? "Edit Package" : "Add Custom Package"}
            </h3>
            <p style={{display:"none"}}>{id_number}</p>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Package Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter package name"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                {editMode ? "Update Package" : "Add Package"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Container>
        <h4 className="text-center mb-4">Available Packages</h4>
        <Row>
          {packages.map((pkg) => (
            <Col md={6} lg={4} key={pkg.tour_topicnumber} className="mb-4">
              <Card style={{ padding: "20px", borderRadius: "15px" }}>
                <Card.Body>
                  <p style={{display:"none"}}>{pkg.tour_topicnumber}</p>
                  <h5 className="mb-2">{pkg.package_name}</h5>
                  <p style={{ fontSize: "14px" }}>{pkg.description}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEdit(pkg)}
                    >
                      Edit
                    </Button>
                    <Link to="/Admintourplaces">
                    <Button
                      variant="outline-success"
                      onClick={() =>{localStorage.setItem("selectedPackage", pkg.tour_topicnumber)
                        localStorage.setItem("packagename",pkg.package_name)
                      }}
                    >
                     
                      Add PLaces
                    </Button>
                    </Link>

                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(pkg.tour_topicnumber)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
      </Container>
      </div>
    </div>
  );
};

export default AddPackage;
