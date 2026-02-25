import { useState } from "react";
import { Link } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import Select from "../form/Select";

// Define the role options
const ROLE_OPTIONS = [
  { value: "hospital", label: "Hospital" },
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "receptionist", label: "Receptionist" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "lab", label: "Lab" },
];

const SignInSchema = Yup.object().shape({
  role: Yup.string().required("Please select a role."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>

          <Formik
            initialValues={{
              role: "hospital", // Set default to hospital
              email: "",
              password: "",
              rememberMe: false,
            }}
            validationSchema={SignInSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("Form Values:", values);
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
            }) => {
              return (
                <Form>
                  <div>
                    <Label htmlFor="role">
                      Login As <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Select
                      name="role"
                      options={ROLE_OPTIONS}
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.role && Boolean(errors.role)}
                      hint={errors.role as string}
                    />
                  </div>
                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="info@gmail.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      hint={errors.email as string}
                    />
                  </div>
                  {/* Password Field */}
                  <div>
                    <Label htmlFor="password">
                      Password <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        hint={errors.password as string}
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
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="rememberMe"
                        checked={values.rememberMe}
                        onChange={(checked) =>
                          setFieldValue("rememberMe", checked)
                        }
                      />
                      <Label
                        htmlFor="rememberMe"
                        className="mb-0 font-normal text-gray-700 text-theme-sm dark:text-gray-400"
                      >
                        Keep me logged in
                      </Label>
                    </div>
                    <Link
                      to="/reset-password"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full"
                      size="sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don&apos;t have an account? {""}
              <Link
                to="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
