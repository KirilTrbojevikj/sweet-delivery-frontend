import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useTokenData } from "../../hooks/useTokenData";
import { logout } from "../../utils";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const tokenData = useTokenData();
  const { items } = useCart();
  console.log(items.length);
  const navigation = [
    { name: "Home", href: "/", current: pathname === "/" },
    { name: "Recipes", href: "/recipes", current: pathname === "/recipes" },
    // { name: "Projects", href: "#", current: false },
    // { name: "Calendar", href: "#", current: false },
  ];
  const userNavigation = [
    {
      name: `${tokenData?.sub}`,
      href: "/profile",
      current: pathname === "/profile",
    },
    //{ name: "Sign out", href: "/login" },
  ];
  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex justify-between items-center">
                  <Link to={"/"}>
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="/sdlogo.png"
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "text-black font-bold"
                          : " text-gray-600 hover:text-gray-800 ",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/cart"
                      className={`my-auto relative ${
                        items.length > 0 && "bg-red-100 rounded-md p-3"
                      }`}
                    >
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </>
                      {items.length > 0 && (
                        <span className="font-bold text-black my-auto">
                          {items.length} recipes
                        </span>
                      )}
                    </Link>
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "text-black font-bold"
                            : " text-gray-600 hover:text-gray-800 ",
                          "inline-flex items-center px-1 pt-1 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <Link
                      to={"/login"}
                      className={
                        "inline-flex items-center px-4 py-2 text-sm text-gray-700 hover:text-black"
                      }
                      onClick={() => logout()}
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                    "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <Link to={item.href}>
                    <Disclosure.Button
                      key={item.name}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
                {/* <Disclosure.Button
                  as="a"
                  href={item.href}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  {item.name}
                </Disclosure.Button> */}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};
