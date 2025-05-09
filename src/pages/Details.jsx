import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Select from 'react-select';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import SERVER_URL from '../services/serverURL';

const keralaDistricts = [
  "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod",
  "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad",
  "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
];
const districtOptions = keralaDistricts.map(d => ({ label: d, value: d }));

const Details = () => {
  const { updateImage } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    phone: '',
    email: '',
    district: '',
    panchayat: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const maxSizeMB = 1;
      const fileSizeMB = file.size / (1024 * 1024);

      if (fileSizeMB > maxSizeMB) {
        alert("File size exceeds 1 MB. Please upload a smaller image.");
        e.target.value = '';
        setSelectedFile(null);
        setPreviewURL(null);
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
        updateImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    setError("");

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('dob', formData.dob);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('district', formData.district);
    data.append('panchayat', formData.panchayat);

    if (selectedFile) {
      data.append('image', selectedFile);
    }

    try {
      const response = await axios.post(`${SERVER_URL}/api/form/submit`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.message);

      if (selectedFile) {
        const fileURL = URL.createObjectURL(selectedFile);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = selectedFile.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(fileURL);
      }

    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Please fill the form completely...");
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', flexShrink: 0, backgroundColor: '#f8f9fa' }}>
        <Sidebar />
      </div>

      {/* Main Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Navbar */}
        <div style={{ flexShrink: 0 }}>
          <Navbar />
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX:'hidden',
            display: 'flex',
            flexWrap: 'wrap',
            padding: '20px',
            gap: '20px',
            backgroundColor: '#f5f5f5',
            boxSizing: 'border-box',
            maxHeight: 'calc(100vh - 56px)',
          }}
        >
          {/* Left Form Section */}
          <div style={{ flex: '1 1 60%', minWidth: '300px' }}>
            <Card className="bg-success bg-opacity-10 p-4 border-0 shadow-sm h-100">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Your Full Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Type Text here"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row className="g-3 align-items-start">
                  <Col md={7}>
                    <Form.Group className="mb-3">
                      <Form.Label>Add Your Images</Form.Label>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Label htmlFor="fileInput" className="btn btn-outline-success mb-0">
                          <i className="fas fa-upload me-2"></i> Choose File
                        </Form.Label>
                        <Form.Control
                          type="file"
                          id="fileInput"
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                        <small className="text-danger">Less than 1 Mb file</small>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    placeholder="+91 6282600896"
                    onChange={handleChange}
                  />
                  {error && <small className="text-danger">{error}</small>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Id <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>District <span className="text-danger">*</span></Form.Label>
                  <Select
                    options={districtOptions}
                    value={districtOptions.find(option => option.value === formData.district)}
                    onChange={(selectedOption) =>
                      setFormData({ ...formData, district: selectedOption ? selectedOption.value : '' })
                    }
                    placeholder="Select or search district"
                    isClearable
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Panchayat <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="panchayat"
                    value={formData.panchayat}
                    onChange={handleChange}
                  >
                    <option value="">Select Panchayat</option>
                    <option value="Kanchiyar">Kanchiyar</option>
                    <option value="Kumarakom">Kumarakom</option>
                    <option value="Devikulam">Devikulam</option>
                    <option value="Vellanad">Vellanad</option>
                    <option value="Kottarakkara">Kottarakkara</option>
                    <option value="Mallappally">Mallappally</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="success" className="w-100 rounded-pill" onClick={handleSubmit}>
                  Submit & Download
                </Button>
              </Form>
            </Card>
          </div>

          {/* Right Preview Section */}
          <div style={{ flex: '1 1 35%', minWidth: '280px' }}>
            <Card className="p-3 bg-light border-0 shadow-sm text-center h-100 d-flex flex-column justify-content-center">
              <div className="mb-3">
                <img
                  src={previewURL || "/card-preview.png"}
                  alt="Preview"
                  className="img-fluid"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              </div>
              <h4 className="mb-2 text-muted">Profile Preview</h4>
              <p className="text-muted">This is how your profile will appear</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
