import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartProduct from "./pages/CartProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./components/security/AuthContext";

const App = () => {
  return (
    <div>
      <AuthProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/" element= {<Home/>}/>

            <Route path="/home" element= {<Home/>}/>

            <Route path="/login" element= {<Login/>}/>

            <Route path="/register" element= {<Register/>}/>

            <Route path="/productlist" element= {<ProductList/>}/>

            <Route path="/cart" element= {<CartProduct/>}/>

            <Route path="/products/:id" element= {<Product/>}/>

          </Routes>

        </BrowserRouter>

      </AuthProvider>
    </div>
  )
};

export default App;