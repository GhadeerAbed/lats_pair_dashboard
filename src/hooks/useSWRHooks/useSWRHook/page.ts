import { useSWR } from "../../../lib/swr/page";
import { fetcherParametersType, fetcherType } from "../types/page";
import axios from "axios";
import { API_ENDPOINT } from "../../../data/page";
import { getAuthData } from "../../../utils/page";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const useFetcher = () => {
  const authUser = getAuthData(); 
  const accessToken = authUser?.accessToken || "";
  const router = useRouter();
  const locale = useLocale(); // Get the current locale

  const fetcher: fetcherType = async ([url, method, options]: fetcherParametersType) => {
    if (url == API_ENDPOINT || url.includes("undefined")) return;
    
    try {
      const response = await axios({
        url,
        method,
        ...options,
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": locale, // Add Accept-Language header
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authUser");
        router.push(`/${locale}/login`); // Redirect to login in the correct locale
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
