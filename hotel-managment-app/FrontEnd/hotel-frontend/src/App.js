import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateCustomer from "./components/CreateCustomer";
import ManageBookings from "./components/ManageBookings";
import ManageRooms from "./components/ManageRooms";
import './App.css';  // Εισαγωγή του CSS αρχείου

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/">Αρχική</Link>
              </li>
              <li>
                <Link to="/create-customer">Προσθήκη Πελάτη</Link>
              </li>
              <li>
                <Link to="/manage-bookings">Διαχείριση Κρατήσεων</Link>
              </li>
              <li>
                <Link to="/manage-rooms">Διαχείριση Δωματίων</Link>
              </li>
            </ul>

            {/* Κείμενο στο κάτω μέρος */}
            <footer>
              <p>© 2025 Hotel Management App. All Rights Reserved.</p>
            </footer>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-customer" element={<CreateCustomer />} />
            <Route path="/manage-bookings" element={<ManageBookings />} />
            <Route path="/manage-rooms" element={<ManageRooms />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Home = () => (
  <div>
    <h1>Καλώς Ήρθατε στη Διαχείριση Ξενοδοχείου</h1>
    <p>Επιλέξτε από το μενού για να ξεκινήσετε.</p>
  </div>
);

export default App;
