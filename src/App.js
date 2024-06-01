import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";
import ErrorPage from "./pages/ErrorPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/products/:catId" element={<ProductPage />} />
        <Route path="/product/details/:id" element={ <ProductDetailPage /> } />   {/* id here doesn't have to be the same as _id that we used in Product card to pass the id to the url  */} 
        <Route path="/about" element={<AboutPage /> } />
        <Route path="/contact" element={<ContactPage />} /> 
        <Route path ="*" element={<ErrorPage />} />

        <Route path = "/registration" element ={<RegistrationPage />} />
        <Route path ="/login" element ={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
