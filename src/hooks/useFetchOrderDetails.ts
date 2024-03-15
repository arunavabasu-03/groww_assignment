import useSWR from "swr";
import { useStore } from "@/store/cart";
import { API_ORDER_DETAILS } from "@/constants/constant";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error("An error occurred while fetching the data.");
  return response.json();
};

export function useFetchOrderDetails() {
  const setProducts = useStore((state) => state.setProducts);
  const setPaymentMethods = useStore((state) => state.setPaymentMethods);
  const setError = useStore((state) => state.setError);
  const setLoading = useStore((state) => state.setLoading);

  const { data, error } = useSWR(API_ORDER_DETAILS, fetcher, {
    onSuccess: (data) => {
      setProducts(data.products);
      setPaymentMethods(data.paymentMethods);
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  return {
    isLoading: !error && !data,
    isError: error,
  };
}
