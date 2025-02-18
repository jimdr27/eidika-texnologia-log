import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageRooms = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/admin/login", {
        username,
        password,
      });
      setIsAuthenticated(true);
      fetchReservations();
    } catch (err) {
      setError("Λάθος όνομα χρήστη ή κωδικός.");
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/reservations");
      setReservations(response.data);
    } catch (err) {
      setError("Αποτυχία φόρτωσης κρατήσεων.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchReservations();
    }
  }, [isAuthenticated]);

  const cancelReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/reservations/${id}`);
      setReservations(reservations.filter((res) => res.id !== id));
    } catch (err) {
      setError("Αποτυχία ακύρωσης κράτησης.");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <style>
        {`
          .reservation-item {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 8px;
          }

          .reservation-text {
            margin-right: 10px;
            font-size: 14px;
          }

          .noselect {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: red;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .noselect:hover {
            background-color: darkred;
          }

          .title {
            text-align: center;
            margin-bottom: 16px;
            font-size: 1.5rem;
            font-weight: bold;
          }

          .form-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; /* Ensure vertical centering */
            padding: 24px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            margin: auto; /* Ensure horizontal centering */
          }

          .form-title {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 24px;
          }

          .form-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 16px;
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

          .error-message {
            color: red;
            font-size: 14px;
            margin-bottom: 16px;
          }
        `}
      </style>
      {!isAuthenticated ? (
        <div className="form-container">
          <h2 className="form-title">Σύνδεση Διαχειριστή</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Όνομα χρήστη"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Κωδικός"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button onClick={handleLogin} className="form-button">
            Σύνδεση
          </button>
        </div>
      ) : (
        <div>
          <h2 className="title">Λίστα Κρατήσεων</h2>
          {reservations.length === 0 ? (
            <p>Δεν υπάρχουν κρατήσεις.</p>
          ) : (
            <ul>
              {reservations.map((res) => (
                <li key={res.id} className="reservation-item">
                  <span className="reservation-text">
                    {res.customer.name} - Από {res.checkInDate} έως{" "}
                    {res.checkOutDate}
                  </span>
                  <button
                    className="noselect"
                    onClick={() => cancelReservation(res.id)}
                  >
                    <span className="text">ΑΚΥΡΩΣΗ</span>
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                      </svg>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageRooms;
