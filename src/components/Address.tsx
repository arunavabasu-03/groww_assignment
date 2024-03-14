import { useAddressStore } from "@/store/address";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/components/Address.module.css";

const AddressForm = () => {
  const { setAddress, setCity, setPin } = useAddressStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    setAddress(data.address);
    setCity(data.city);
    setPin(data.pin);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <p>Address</p>
      <input
        {...register("address")}
        placeholder="Address"
        className={styles.input}
      />
      {errors.address && <div>{errors.address.message as React.ReactNode}</div>}
      <p>City</p>
      <input
        {...register("city", { required: "City is required" })}
        placeholder="City"
      />
      {errors.city && <p>{errors.city.message as React.ReactNode}</p>}

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
      />
      {errors.pin?.message && <p>{errors.pin.message as React.ReactNode}</p>}
      <button type="submit" className={styles.button}>
        Save Address
      </button>
    </form>
  );
};

export default AddressForm;
