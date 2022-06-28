import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TextInput } from "../components/Inputs/TextInput";
import { AuthService } from "../service/AuthService";
import { LoginRequest, Status } from "../types";
import { login } from "../utils";
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Field required"),
  password: Yup.string().required("Field required"),
});
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (login_in: LoginRequest) => {
    AuthService.login(login_in).then((resp) => {
      if (resp.status === Status.SUCCESS) {
        login(resp.value);
        navigate("/");
      }
    });
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-6">
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={(values, actions) => {
                handleLogin({
                  username: values.username,
                  password: values.password,
                });
              }}
              validationSchema={LoginSchema}
            >
              {(props) => (
                <Form>
                  <TextInput
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    label="Username"
                  ></TextInput>
                  <TextInput
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    label="Password"
                  ></TextInput>
                  <div className="text-sm mx-auto text-center mb-3">
                    <Link
                      to="/register"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Don't have an account? Register here!
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div id="logo" className="hidden lg:block relative w-0 flex-1">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="logo-holder logo-4">
              <h3>Sweet</h3>
              <h5>Delivery</h5>
              <p>Deliciousness to your front door</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
