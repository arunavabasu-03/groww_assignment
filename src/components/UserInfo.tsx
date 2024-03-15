import Loading from "./Loading";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserInfoStore } from "@/store/userinfo";
import { usePaymentMethodsStore } from "@/store/payment";
import styles from "@/styles/components/Userinfo.module.css";

const UserInfoForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    paymentMethods,
    fetchPaymentMethods,
    loading,
    error,
    selectPaymentMethod,
  } = usePaymentMethodsStore();
  
  
  const { setAddress, setCity, setPin, setSelectedPaymentMethod } =
    useUserInfoStore();
  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  
  
  const onSubmit = (data: any) => {
    setAddress(data.address);
    setCity(data.city);
    setPin(data.pin);
    console.log(data);
    selectPaymentMethod(data.paymentMethod);
    console.log(data);
    router.push("/ordersummery");
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h2>Your Details</h2>
      <h4>Address</h4>
      <div>
        <p>Address</p>
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
        <p className={styles.error}>{errors.pin.message as React.ReactNode}</p>
      )}
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
      <button type="submit" className={styles.button}>
        Save and Continue
      </button>
    </form>
  );
};

export default UserInfoForm;
