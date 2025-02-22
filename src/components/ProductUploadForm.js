import React, { useState } from 'react';
import axios from 'axios';
import './ProductUploadForm.css';

const ProductUpload = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);



  
  const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      try {
          const response = await axios.post("http://localhost:8000/api/products/", formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Add authentication if required
              },
          });
          alert("Product uploaded successfully!");
          console.log(response.data);



          setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      } catch (error) {
          console.error("Error uploading product:", error.response?.data || error.message);
      }
  };

  return (
    <div className="product-upload-container">
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit} className="product-upload-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Upload
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;