import React, { useState } from "react";
import { createBooking } from '../api/api.js';

const ManageBookings = () => {
  const [formData, setFormData] = useState({
    phone: "",
    numPeople: "",
    checkInDate: "",
    checkOutDate: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending booking data: ", formData);
    try {
      const response = await createBooking(formData);
      console.log("Booking response: ", response);
      setSuccessMessage("Η κράτηση δημιουργήθηκε με επιτυχία!");
      setErrorMessage("");
      setFormData({ phone: "", numPeople: "", checkInDate: "", checkOutDate: "" });
    } catch (error) {
      console.error("Error during booking submission:", error);
      setErrorMessage(error.message || "Σφάλμα κατά την προσθήκη κράτησης. Δοκιμάστε ξανά.");
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
      
      <h2 className="form-title">Δημιουργία Νέας Κράτησης</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Τηλέφωνο Πελάτη:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numPeople">Αριθμός Ατόμων:</label>
          <input
            type="number"
            id="numPeople"
            name="numPeople"
            value={formData.numPeople}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkInDate">Ημερομηνία Άφιξης:</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkOutDate">Ημερομηνία Αναχώρησης:</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-button">Δημιουργία Κράτησης</button>
      </form>
    </div>
  );
};

export default ManageBookings;
