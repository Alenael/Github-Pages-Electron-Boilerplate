import axios from "axios";
import axiosThrottle from "axios-request-throttle";

const api_key = "Dond1UGpHXYeUip0KfNJ6XH2gL8p80T9deU6zJ83";

const igdb = axios.create({
  baseURL: "https://mv90lq9x3d.execute-api.us-west-2.amazonaws.com/production/v4/",
  headers: {
    "x-api-key": `${api_key}`,
  },
});

axiosThrottle.use(axios, { requestsPerSecond: 4 });

igdb.interceptors.response.use(
  (response) => {
    if (response.data["message"] == "Too Many Requests") {
      return new Promise((resolve) => resolve(igdb(response.config)));
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default igdb;

const data = (begin_date: number, end_date: number) =>
  `fields *,game.*; where category = 0 & game.category = (0, 8, 9, 11) & region = (2, 8) & date >= ${begin_date} & date <= ${end_date} & game.platforms = (167) & game.themes != (42); limit 500;`;
//, 49, 167, 130, 169
export const GetRecentReleases = async (begin_date: number, end_date: number) => {
  const response = await igdb.post("release_dates", data(begin_date, end_date));
  return response.request.response;
};
