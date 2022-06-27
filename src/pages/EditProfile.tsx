import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useTokenData } from "../hooks/useTokenData";
import { AuthService } from "../service/AuthService";
import { Status, User } from "../types";

const EditProfileSchema = Yup.object().shape({
  username: Yup.string(),
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string().email("Not a valid email address"),
  address: Yup.string(),
});

export const EditProfile: React.FC = () => {
  const [user, setUser] = useState<User>({} as User);
  const tokenData = useTokenData();
  useEffect(() => {
    AuthService.getUserByUsername(tokenData?.sub!).then((resp) => {
      if (resp.status === Status.SUCCESS) {
        setUser(resp.value);
        console.log(user);
      }
    });
  }, [tokenData?.sub, user]);

  return (
    <>
      {user ? (
        <Formik
          initialValues={{
            username: user.username || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            address: user.address || "",
          }}
          validationSchema={EditProfileSchema}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            console.log(values);
          }}
        >
          <Form>
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Profile
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <Field
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="address"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <div className="flex">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      ) : null}
    </>
  );
};
