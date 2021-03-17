import axios from "axios";

const BASE_URL = "https://intercity-api.azurewebsites.net/api/";
//https://localhost:44366/api/

export const ENDPOINTS = {
  ROUTE: "Route",
  ROUTELIST: "Route/getRouteByNameDate?",
  BOOKINGS: "Booking",
};

export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + endpoint;

  return {
    fetchByCityAndDate: (fromCity, toCity, date) =>
      axios.get(`${url}&fromCity=${fromCity}&toCity=${toCity}&date=${date}`),
    createRoute: (fromCity, toCity, date) =>
      axios.post(url, {
        fromCityName: fromCity,
        toCityName: toCity,
        departureDate: date,
      }),
    getBookings: (referenceNumber) => axios.get(`${url}/${referenceNumber}`),
    deleteBooking: (referenceNumber) =>
      axios.delete(`${url}/${referenceNumber}`),
    createBooking: (
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      noOfPassengers,
      fareType,
      totalCost,
      routeId
    ) =>
      axios.post(url, {
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        noOfPassengers,
        fareType,
        totalCost,
        routeId,
      }),
  };
};
