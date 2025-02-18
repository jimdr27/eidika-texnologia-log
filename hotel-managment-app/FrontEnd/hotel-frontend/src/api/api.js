// src/api/api.js

const API_URL = 'http://localhost:8080'; // Η διεύθυνση του back-end server

export const createCustomer = async (customerData) => {
  try {
    const response = await fetch(`${API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
	}

    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error.message);
    throw error;
  }
};

// api.js
export const createBooking = async (bookingData) => {
  const { phone, numPeople, checkInDate, checkOutDate } = bookingData;

  // Έλεγχος για τα απαιτούμενα δεδομένα πριν την αποστολή
  if (!checkInDate || !checkOutDate || numPeople <= 0) {
    throw new Error("Invalid input: Ensure all fields are filled correctly.");
  }

  // Μετατροπή της ημερομηνίας στο σωστό format (yyyy-mm-dd)
  const formattedCheckInDate = checkInDate.split('T')[0]; // Αν το checkInDate περιέχει ώρα, διατηρούμε μόνο την ημερομηνία
  const formattedCheckOutDate = checkOutDate.split('T')[0];
  const numPeopleNumber = Number(numPeople);

  console.log("Formatted Check-in Date: ", formattedCheckInDate);
  console.log("Formatted Check-out Date: ", formattedCheckOutDate);
  console.log("Sending data to backend: ", {
    phone: phone,
    num_people: numPeopleNumber,
    check_in_date: formattedCheckInDate,
    check_out_date: formattedCheckOutDate,
  });

  try {
    // Εκτελούμε POST αίτημα στην API για τη δημιουργία κράτησης
    const response = await fetch('http://localhost:8080/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,                   // Τηλέφωνο πελάτη αντί για ID
        num_people: numPeopleNumber,    // Αριθμός ατόμων
        check_in_date: formattedCheckInDate, // Χρησιμοποιούμε τη μετατροπή
        check_out_date: formattedCheckOutDate, // Χρησιμοποιούμε τη μετατροπή
      }),
    });

    // Έλεγχος για σφάλματα στο αίτημα
    if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
	}

    // Αν όλα πάνε καλά, επιστρέφουμε τα δεδομένα που επέστρεψε η API
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error during booking creation:', error);
    throw error; // Ρίχνουμε ξανά το σφάλμα για να το χειριστεί το component
  }
};

