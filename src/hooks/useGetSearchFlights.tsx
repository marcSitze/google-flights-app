// import { useQuery } from '@tanstack/react-query';

// const useGetSearchFlights = () => {
//   const searchFlights = async () => {
//     const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${searchData.from}&destinationSkyId=${searchData.to}&originEntityId=${searchData.originEntityId}&destinationEntityId=${searchData.destinationEntityId}&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US&date=${searchData.departure}`;
//     const options = {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key":
//           "API_KEY",
//         "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
//       },
//     };

//     try {
//       const response = await fetch(url, options);
//       const result = await response.json();
//       return result
//     }catch (error) {
//       throw error;
//     }

//   }
//   const query = useQuery({
//     queryKey: ["SEARCH_FLIGHTS"],
//     // queryFn:
//   })
// }

// export default useGetSearchFlights