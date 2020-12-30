import axios from "axios";

export const instance = axios.create({
  baseURL: "https://localhost:44366/api",
});

// /Route/getRouteByNameDate?fromCity=wanganui&toCity=palmerstonnorth&date=tuesday%2C29december2020
