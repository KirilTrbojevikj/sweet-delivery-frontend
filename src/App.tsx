import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import CartContext from "./contexts/CartContext";
import { Cart } from "./pages/Cart";
import { EditProfile } from "./pages/EditProfile";
//import CartContext from "./contexts/CartContext";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Order } from "./pages/Order";
import { RecipeDetail } from "./pages/RecipeDetail";
import { RecipesList } from "./pages/RecipesList";
import { RegisterPage } from "./pages/RegisterPage";
import { loadShoppingCart } from "./utils";
import 'react-app-polyfill/stable';

const App: React.FC = () => {
  console.log(loadShoppingCart());
  return (
    <BrowserRouter>
      <CartContext>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/recipes" element={<RecipesList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </Layout>
      </CartContext>
    </BrowserRouter>
  );
};
export default App;
