import { useSWR } from "../../../lib/swr/page";
import { fetcherParametersType, fetcherType } from "../types/page";
import axios from "axios";
import { API_ENDPOINT } from "../../../data/page";
import { getAuthData } from "../../../utils/page";
import { useRouter } from "next/navigation";


const useFetcher = () => {
  const authUser = getAuthData(); 
  const accessToken = authUser?.tokens.access.token || "";
  const router = useRouter();
  
  const fetcher: fetcherType = async ([url, method, options]: fetcherParametersType) => {
    if (url == API_ENDPOINT || url.includes("undefined")) return;
    
    try {
      const response = await axios({
        url,
        method,
        ...options,
        headers: { 
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authUser");
        router.push(`/login`); // Redirect to login in the correct locale
      }
      throw error;
    }
  };
  
  return { fetcher };
};

export const useSWRHook = (url: string | null, options = {}, config = {}) => {
  const { fetcher } = useFetcher();
  const { data, error, isLoading, mutate } = useSWR(
    [`${API_ENDPOINT}${url}`, "get", options],
    fetcher,
    config
  );
  return { data, error, isLoading, mutate };
};

export default useSWRHook;
