import { useState } from "react";
import { Link } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

const SignUpSchema = Yup.object().shape({
  fname: Yup.string()
    .min(2, "First name is too short.")
    .required("First name is required."),
  lname: Yup.string()
    .min(2, "Last name is too short.")
    .required("Last name is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
  termsAgreed: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions.")
    .required("You must agree to the terms and conditions."),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details below to create an account!
            </p>
          </div>
          <div>
            <Formik
              initialValues={{
                fname: "",
                lname: "",
                email: "",
                password: "",
                termsAgreed: false,
              }}
              validationSchema={SignUpSchema}
              onSubmit={async (values, { setSubmitting }) => {
                console.log("Sign Up Values:", values);
                // Simulate an API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSubmitting(false);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                touched,
                errors,
                setFieldValue,
                isSubmitting,
              }) => (
                <Form>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* First Name */}
                    <div className="sm:col-span-1">
                      <Label htmlFor="fname">
                        First Name<span className="text-error-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="fname"
                        name="fname"
                        placeholder="Enter your first name"
                        value={values.fname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.fname && Boolean(errors.fname)}
                        hint={errors.fname}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="sm:col-span-1">
                      <Label htmlFor="lname">
                        Last Name<span className="text-error-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="lname"
                        name="lname"
                        placeholder="Enter your last name"
                        value={values.lname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lname && Boolean(errors.lname)}
                        hint={errors.lname}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">
                      Email<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      hint={errors.email}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password">
                      Password<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        hint={errors.password}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-[22px]"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Checkbox for Terms */}
                  <div>
                    <div className="flex items-start gap-3 mt-2">
                      <div className="mt-0.5">
                        <Checkbox
                          id="termsAgreed"
                          checked={values.termsAgreed}
                          onChange={(checked) =>
                            setFieldValue("termsAgreed", checked)
                          }
                        />
                      </div>
                      <Label
                        htmlFor="termsAgreed"
                        className="inline-block font-normal text-gray-500 dark:text-gray-400 mb-0 cursor-pointer"
                      >
                        By creating an account, you agree to the{" "}
                        <span className="text-gray-800 dark:text-white/90">
                          Terms and Conditions
                        </span>
                        , and our{" "}
                        <span className="text-gray-800 dark:text-white/90">
                          Privacy Policy
                        </span>
                      </Label>
                    </div>

                    {/* FIX 2: Wrapped the checkbox error in an h-[22px] container to reserve space and prevent layout shifts */}
                    <div className="h-5 mt-1 overflow-hidden">
                      {touched.termsAgreed && errors.termsAgreed && (
                        <div className="text-error-500 text-xs">
                          {errors.termsAgreed as string}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing up..." : "Sign Up"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account? {""}
                <Link
                  to="/"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
