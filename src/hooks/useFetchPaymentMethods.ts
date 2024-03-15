import useSWR from "swr";
import { usePaymentMethodsStore } from "@/store/paymentStore";
import { API_ORDER_DETAILS } from "@/constants/constant";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("API call failed");
  return response.json();
};

export function useFetchPaymentMethods() {
  const setPaymentMethods = usePaymentMethodsStore(
    (state) => state.setPaymentMethods
  );
  const setLoading = usePaymentMethodsStore((state) => state.setLoading);
  const setError = usePaymentMethodsStore((state) => state.setError);

  
  // fet
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
