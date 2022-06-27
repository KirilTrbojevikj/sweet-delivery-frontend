import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TextInput } from "../components/Inputs/TextInput";
import { AuthService } from "../service/AuthService";
import { RegisterRequest, Status } from "../types";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Email isn't valid").required("Required field"),
  username: Yup.string().required("Required field"),
  password: Yup.string().required("Required field"),
  firstName: Yup.string().required("Required field"),
  lastName: Yup.string().required("Required field"),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const handleRegister = (register_in: RegisterRequest) => {
    AuthService.register(register_in).then((resp) => {
      if (resp.status === Status.SUCCESS) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Register</h2>
          </div>

          <div className="mt-6">
            <Formik
              initialValues={{
                email: "",
                password: "",
                repeatPassword: "",
                username: "",
                firstName: "",
                lastName: "",
              }}
              onSubmit={(values, actions) => {
                handleRegister({
                  username: values.username,
                  password: values.password,
                  email: values.email,
                  firstName: values.firstName,
                  lastName: values.lastName,
                });
              }}
              validationSchema={RegisterSchema}
            >
              {(props) => (
                <Form>
                  <TextInput
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    label="Email"
                  ></TextInput>
                  <TextInput
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    label="Username"
                  ></TextInput>
                  <TextInput
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    label="First Name"
                  ></TextInput>
                  <TextInput
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    label="Last Name"
                  ></TextInput>
                  <TextInput
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    label="Password"
                  ></TextInput>
                  <TextInput
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    placeholder="Repeat password"
                    label="Repeat password"
                  ></TextInput>
                  <div className="text-sm mx-auto text-center mb-3">
                    <Link
                      to="/login"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Already have an account? Sign in here!
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="cake.jpg"
          alt=""
        />
      </div>
    </div>
  );
};
