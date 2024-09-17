"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register/route.ts', data,  {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })
      .then(() => {
        toast.success("Account created");

        signIn("credentials", {
          email: data.email,
          password: data.Password,
          redirect: false,
        }).then((callback) => {
          if(callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged in");
          }

          if(callback?.error) {
            toast.error(callback.error);
          }
        })
      })
      .catch(function (error) {
        console.log(error.toJSON())})
      .finally(() => {
        setIsLoading(false);
      });
    };

    //====================FIXED CODEIUM COMMAND====================
    //fetch('/api/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('Success:', data);
  //     toast.success("Account created");

  //     signIn("credentials", {
  //       email: data.email,
  //       password: data.hashedpassword,
  //       redirect: false,
  //     }).then((callback) => {
  //       if (callback?.ok) {
  //         router.push("/cart");
  //         router.refresh;
  //         toast.success("Logged in");
  //       }

  //       if (callback?.error) {
  //         toast.error(callback.error);
  //       }
  //     });
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   })
  //   .finally(() => {
  //     setIsLoading(false);
  //   });
  // };

  return (
    <>
      <Heading title="Sign up for E-Shop" />
      <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Sign up"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?{""}
        <Link className="underline" href="/login">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
