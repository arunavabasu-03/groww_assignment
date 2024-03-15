"use client";
import Loading from "./Loading";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserInfoStore } from "@/store/userinfoStore";
import { usePaymentMethodsStore } from "@/store/paymentStore";
import styles from "@/styles/components/Userinfo.module.css";
import { useFetchPaymentMethods } from "@/hooks/useFetchPaymentMethods";

const UserInfoForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, isError } = useFetchPaymentMethods();
  const paymentMethods = usePaymentMethodsStore(
    (state) => state.paymentMethods
  );

  const selectPaymentMethod = usePaymentMethodsStore(
    (state) => state.selectPaymentMethod
  );
  const error = usePaymentMethodsStore((state) => state.error);

  const { setAddress, setCity, setPin, setSelectedPaymentMethod } =
    useUserInfoStore();

  const onSubmit = (data: any) => {
    setPin(data.pin);
    setCity(data.city);
    setAddress(data.address);
    selectPaymentMethod(data.paymentMethod);
    router.push("/ordersummery");
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h2>Your Details</h2>
      <h4>Address</h4>

      {/*address*/}
      <div>
        <p>Address 1</p>
        <input
          id="address"
          {...register("address", { required: "Address is required" })}
          className={styles.input}
        />
        {errors.address && (
          <p className={styles.error}>
            {errors.address.message as React.ReactNode}
          </p>
        )}
      </div>
      {/*city*/}
      <div>
        <p>City</p>
        <input
          id="city"
          {...register("city", { required: "City is required" })}
          className={styles.input}
        />
        {errors.city && (
          <p className={styles.error}>
            {errors.city.message as React.ReactNode}
          </p>
        )}
      </div>
      {/*pin code*/}
      <div>
        <p>PIN Code</p>
        <input
          {...register("pin", {
            required: "PIN is required",
            pattern: {
              value: /^\d{6}$/,
              message: "PIN must be a 6-digit number",
            },
          })}
          placeholder="PIN"
          className={styles.input}
        />
        {errors.pin && (
          <p className={styles.error}>
            {errors.pin.message as React.ReactNode}
          </p>
        )}
      </div>
      {/*payment method*/}
      <div>
        <h4>Payment method</h4>
        {paymentMethods.map((method, index) => (
          <div key={index}>
            <input
              {...register("paymentMethod", {
                required: "Payment method is required",
              })}
              type="radio"
              value={method}
              id={method}
              style={{
                marginBottom: "20px",
              }}
            />
            <span>{method}</span>
          </div>
        ))}
        {errors.paymentMethod && (
          <p className={styles.error}>
            {errors.paymentMethod.message as React.ReactNode}
          </p>
        )}
      </div>

      <button type="submit" className={styles.button}>
        Save and Continue
      </button>
    </form>
  );
};

export default UserInfoForm;
