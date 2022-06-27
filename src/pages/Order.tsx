import { TrashIcon } from "@heroicons/react/outline";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useTokenData } from "../hooks/useTokenData";
import { AuthService } from "../service/AuthService";
import { CreateOrder, Status, User } from "../types";
import * as Yup from "yup";
import { OrderService } from "../service/OrderService";

const OrderSchema = Yup.object().shape({
  address: Yup.string().required("Required field"),
});

export const Order: React.FC = () => {
  const {
    items,
    removeShoppingCartItem,
    addShoppingCartItem,
    calculateTotal,
    clearCart,
  } = useCart();
  const [user, setUser] = useState<User>({} as User);
  const tokenData = useTokenData();
  useEffect(() => {
    AuthService.getUserByUsername(tokenData?.sub!).then((resp) => {
      if (resp.status === Status.SUCCESS) {
        setUser(resp.value);
      }
    });
  }, [tokenData?.sub]);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50">
      {user && (
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Checkout</h2>
          <Formik
            onSubmit={(values, actions) => {
              console.log(values);
              const req: CreateOrder = {
                amount: calculateTotal(),
                deliveryAddress: values.address,
                userId: user.id,
                orderContent: items.map((i) => {
                  return {
                    recipeId: i.recipe.id,
                    recipeQuantity: i.quantity,
                  };
                }),
              };
              console.log(req);
              OrderService.createOrder(req).then((resp) => {
                console.log(resp);
                if (resp.status === Status.SUCCESS) {
                  clearCart();
                  navigate("/");
                }
              });
            }}
            validationSchema={OrderSchema}
            initialValues={{
              address: user.address || "",
            }}
          >
            <Form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div>
                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shipping information
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-1 sm:gap-x-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <Field
                          type="text"
                          name="address"
                          id="address"
                          autoComplete="street-address"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul className="divide-y divide-gray-200">
                    {items.map((product) => (
                      <li
                        key={product.recipe.id}
                        className="flex py-6 px-4 sm:px-6"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={product.recipe.img_url}
                            alt={product.recipe.name}
                            className="w-20 rounded-md"
                          />
                        </div>

                        <div className="ml-6 flex-1 flex flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">
                                <Link
                                  to={`/recipes/${product.recipe.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.recipe.name}
                                </Link>
                              </h4>
                            </div>

                            <div className="ml-4 flex-shrink-0 flow-root">
                              <button
                                type="button"
                                className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                                onClick={() => {
                                  removeShoppingCartItem(product.recipe.id);
                                }}
                              >
                                <span className="sr-only">Remove</span>
                                <TrashIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex-1 pt-2 flex items-end justify-between">
                            <p className="mt-1 text-sm font-bold text-gray-900">
                              {product.quantity} * ${product.recipe.price} = $
                              {product.quantity * product.recipe.price}
                            </p>

                            <div className="ml-4">
                              <label htmlFor="quantity" className="sr-only">
                                Quantity
                              </label>
                              <select
                                value={product.quantity}
                                onChange={(e) => {
                                  addShoppingCartItem({
                                    recipe: product.recipe,
                                    quantity: parseInt(e.target.value),
                                  });
                                }}
                                id="quantity"
                                name="quantity"
                                className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="py-6 px-4 space-y-6 sm:px-6">
                    <div className="flex items-center justify-between pt-6">
                      <dt className="text-base font-medium">Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${calculateTotal()}
                      </dd>
                    </div>
                  </dl>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                      Confirm order
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};
