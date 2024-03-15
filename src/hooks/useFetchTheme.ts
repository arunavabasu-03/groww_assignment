import useSWR from "swr";
import useThemeStore from "@/store/themeStore";



const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch theme data");
  return response.json();
};



export const useFetchTheme = () => {
  const setTheme = useThemeStore((state) => state.setTheme);

  const { data, error } = useSWR(
    "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata",
    fetcher,
    {
      onSuccess: (data) => {
        setTheme(data.theme);
      },
    }
  );

  return {
    theme: data?.theme,
    isLoading: !error && !data,
    isError: error,
  };
};
