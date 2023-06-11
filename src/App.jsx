import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartProduct from "./pages/CartProduct";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthProvider, { useAuth } from "./components/security/AuthContext";
import ChangePassword from "./pages/ChangePassword";
import UpdateProfile from "./pages/UpdateProfile";
import OAuth2RedirectHandler from "./components/user/oauth2/OAuth2RedirectHandler";
import TestGetCookie from "./pages/TestGetCookie";


function AuthenticatedRoute({children}) {
  const authContext = useAuth()
  
  if(authContext.isAuthenticated)
      return children

  return <Navigate to="/login" />
}

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

            <Route path="/user/changepassword" element= {<AuthenticatedRoute>
                                                          <ChangePassword/>
                                                        </AuthenticatedRoute>
                                                        }/>

            <Route path="/user/updateprofile" element= {<AuthenticatedRoute>
                                                            <UpdateProfile/>  
                                                        </AuthenticatedRoute>
                                                        }/>
            
            <Route path="/oauth2/redirect" element= {<OAuth2RedirectHandler/>}/>
            
            <Route path="/getcookie" element={<TestGetCookie></TestGetCookie>}></Route>
          </Routes>

        </BrowserRouter>

      </AuthProvider>
    </div>
  )
};

export default App;