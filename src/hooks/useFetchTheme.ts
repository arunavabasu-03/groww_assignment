import useSWR from "swr";
import useThemeStore from "@/store/themeStore";
import { API_THEME } from "@/constants/constant";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch theme data");
  return response.json();
};

// getting the state from store
export const useFetchTheme = () => {
  const setTheme = useThemeStore((state) => state.setTheme);

  // fetching the theme
  const { data, error } = useSWR(API_THEME, fetcher, {
    onSuccess: (data) => {
      setTheme(data.theme);
    },
  });

  return {
    theme: data?.theme,
    isLoading: !error && !data,
    isError: error,
  };
};
