import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../utils";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken() && pathname !== "/register") {
      navigate("/login");
    }
  }, [navigate, pathname]);

  return (
    <>
      {pathname === "/login" || pathname === "/register" ? (
        <div> {children}</div>
      ) : (
        <div className="min-h-full">
          <Header />
          {pathname === "/" && (
            <div className="w-full h-96">
              <img
                src="/bgCakeReal.jpg"
                alt="torta"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="py-10">
            <main>
              <div className="mx-auto sm:px-6 lg:px-32">{children}</div>
            </main>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};
