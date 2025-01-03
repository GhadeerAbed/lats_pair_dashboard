// import axios from "../../../lib/axios/page";
// import { fetcherParametersType, fetcherType } from "../types/page";
// import { getAuthData } from "../../../utils/page";
// import { useLocale } from "next-intl";

// export const fetcher: fetcherType = async ([
//   url,
//   method,
//   options,
// ]: fetcherParametersType) => {
//   const authUser = getAuthData(); 
//   const accessToken = authUser?.accessToken || "";
 

//   try {
//     const response = await axios({
//       url,
//       method,
//       ...options,
//       headers: { Authorization: `Bearer ${accessToken}`},
//     });
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };
// /**
//  *
//  * @param Array [url:string, method:string,options:object]
//  * @param Object {body:body}
//  * @returns
//  */
// export const useCustomFetcher = () => {
//   const authUser = getAuthData(); 
//   const accessToken = authUser?.accessToken || "";
//   const fetcher: fetcherType = async (
//     [url, method, options]: fetcherParametersType,
//     { arg }: any | undefined
//   ) => {
//     try {
//       const response = await axios({
//         url,
//         method,
//         ...(arg ? arg : options),
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });

//       return response.data;
//     } catch (error) {
//       return error;
//     }
//   };
//   return fetcher;
// };

import axios from "../../../lib/axios/page";
import { fetcherParametersType, fetcherType } from "../types/page";
import { getAuthData } from "../../../utils/page";
import { useLocale } from "next-intl";

export const useCustomFetcher = () => {
  const authUser = getAuthData(); 
  const accessToken = authUser?.accessToken || "";
  const locale = useLocale(); // Get locale using useLocale()

  const fetcher: fetcherType = async (
    [url, method, options]: fetcherParametersType,
    { arg }: any | undefined
  ) => {
    try {
      const response = await axios({
        url,
        method,
        ...(arg ? arg : options),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": locale, // Add Accept-Language header
        },
      });

      return response.data;
    } catch (error) {
      return error;
    }
  };

  return fetcher;
};
