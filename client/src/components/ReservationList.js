import "./ReservationList.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";


const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(
    () => {
      async function loadReservations() {
        const response = await fetch("http://localhost:5001/reservations");
        const json = await response.json();

        setReservations(json);
      }
      loadReservations();
    },
    []
  );

  return (
    <div>
    <h1>Upcoming reservations</h1>
    <ul>
      {reservations.map((reservation) => {
        return (
        <li key={reservation.id}>
          <p>{reservation.partySize}</p>
          <p>{formatDate(reservation.date, "2023-11-17T06:30:00.000Z")}</p>
          <p>{reservation.userId}</p>
          <p>{reservation.restaurantName}</p>
          <Link to={`/reservations/${reservations.id}`}>View details</Link>
          </li>
        );
      })}
      </ul>
      
    </div>
  );
};

export default ReservationList;
