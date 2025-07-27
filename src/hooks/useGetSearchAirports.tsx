// import type { AirportType, ResponseType } from "@/types/flights";
// import { useQuery } from "@tanstack/react-query";

// const useGetSearchAirports = () => {
//   const searchAirports = async (): Promise<ResponseType<AirportType[]>> => {
//     const url =
//       "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=new&locale=en-US";
//     const options = {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key": "API_KEY",
//         "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
//       },
//     };

//     try {
//       const response = await fetch(url, options);
//       const result = await response.json();
//       // console.log(result);
//       return result
//     } catch (error) {
//       console.error(error);
//       throw error
//     }
//   };

//   const query = useQuery({
//     queryKey: ["GET_SEARCH_AIRPORTS"],
//     queryFn: searchAirports,
//   });
//   return query;
// };

// export default useGetSearchAirports;
