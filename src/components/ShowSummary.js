// ShowSummary.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ShowSummary.css';

const ShowSummary = () => {
  const [showDetails, setShowDetails] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const price = 10;
  const { showId } = useParams();

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data = await response.json();
        console.log(data);
        setShowDetails(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [showId]);

  const handleBookTicket = () => {
    setIsBookingOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsBookingOpen(false);
    setIsFormSubmitted(true);
    setFormData({});
    const ticketDetails = `Ticket booked successfully!\n\nMovie: ${
      showDetails.name
    }\nTiming: ${showDetails.schedule.time}\nNumber of Tickets: ${
      formData.numTickets
    }`;
    alert(ticketDetails);
  };

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  if (!showDetails) {
    return <div>Loading...</div>;
  }

  const totalCost =
    price && formData.numTickets
      ? parseFloat(price) * parseInt(formData.numTickets, 10)
      : 0;

  return (
    <div className="show-summary-container">
      <img src={showDetails.image.medium} alt={showDetails.name} />
      <h2>{showDetails.name}</h2>
      <p>{showDetails.summary}</p>
      <p>Timing: {showDetails.schedule.time}</p>
      <p>Days: {showDetails.schedule.days}</p>
      <p>Rating: {showDetails.rating.average}</p>
      <p>OfficialSite: {showDetails.officialSite}</p>
      <p>Price per ticket: ${price}</p>

      <button onClick={handleBookTicket}>Book Tickets</button>

      {isBookingOpen && (
        <div className="booking-form-container">
          <h3>Total Cost: ${totalCost.toFixed(2)}</h3>

          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="numTickets"
              placeholder="Number of Tickets"
              required
              onChange={handleInputChange}
            />
            {/* Additional form fields */}
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date"
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              required
              onChange={handleInputChange}
            />
            {/* Move the total cost element here */}
            <p>Total Cost: ${totalCost.toFixed(2)}</p>
            <button type="submit">Submit</button>
          </form>
          {isFormSubmitted && <p>Total Cost: ${totalCost.toFixed(2)}</p>}
        </div>
      )}
    </div>
  );
};

export default ShowSummary;