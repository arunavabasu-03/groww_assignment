import useSWR from "swr";
import { useCartStore } from "@/store/cartStore";
import { API_ORDER_DETAILS } from "@/constants/constant";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error("An error occurred while fetching the data.");
  return response.json();
};

export function useFetchOrderDetails() {
  
  // getting the state from the store
  const setProducts = useCartStore((state) => state.setProducts);
  const setPaymentMethods = useCartStore((state) => state.setPaymentMethods);
  const setError = useCartStore((state) => state.setError);
  const setLoading = useCartStore((state) => state.setLoading);

  
  // fetching the products
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
