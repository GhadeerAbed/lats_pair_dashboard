

import axios from "../../../lib/axios/page";
import { fetcherParametersType, fetcherType } from "../types/page";
import { getAuthData } from "../../../utils/page";
export const useCustomFetcher = () => {
  const authUser = getAuthData(); 
  const accessToken = authUser?.tokens.access.token || "";
  

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
        },
      });

      return response.data;
    } catch (error) {
      return error;
    }
  };

  return fetcher;
};
