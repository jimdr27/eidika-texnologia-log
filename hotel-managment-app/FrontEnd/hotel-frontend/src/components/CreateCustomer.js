import React, { useState } from "react";
import { createCustomer } from '../api/api.js';

const CreateCustomer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form Data:', formData); // Debug για το τι στέλνεται

    try {
      const response = await createCustomer(formData);
      console.log('Response Data:', response); // Debug για την απόκριση
      setSuccessMessage("Ο πελάτης προστέθηκε με επιτυχία!");
      setErrorMessage("");
      setFormData({ name: "", email: "", phone: "" }); // Καθαρισμός φόρμας
    } catch (error) {
      console.error('Error during submit:', error);
      setErrorMessage(error.message ||"Σφάλμα κατά την προσθήκη πελάτη. Δοκιμάστε ξανά.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="form-container">
      <style>
        {`
          .form-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0;
            padding: 20px;
          }

          .form-title {
            font-size: 1.8rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
          }

          .form-group {
            margin-bottom: 20px;
            width: 100%;
            max-width: 400px;
          }

          .form-group label {
            display: block;
            font-size: 14px;
            margin-bottom: 8px;
          }

          .form-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
          }

          .form-button {
            width: 100%;
            padding: 12px;
            background-color: #3b82f6;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .form-button:hover {
            background-color: #2563eb;
          }
        `}
      </style>
      
      <h2 className="form-title">Δημιουργία Νέου Πελάτη</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Όνομα:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Τηλέφωνο:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Προσθήκη Πελάτη</button>
      </form>
    </div>
  );
};

export default CreateCustomer;
