import useSWR from "swr";
import { API_ORDER_DETAILS } from "@/constants/constant";
import { usePaymentMethodsStore } from "@/store/paymentStore";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("API call failed");
  return response.json();
};

export function useFetchPaymentMethods() {
  // getting the state from the store
  const setPaymentMethods = usePaymentMethodsStore(
    (state) => state.setPaymentMethods
  );
  const setLoading = usePaymentMethodsStore((state) => state.setLoading);
  const setError = usePaymentMethodsStore((state) => state.setError);

  // fetching the payment methods
  const { data, error } = useSWR(API_ORDER_DETAILS, fetcher, {
    onSuccess: (data) => {
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
