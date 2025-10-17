import Header from "./components/Header"
import Home from './components/Home';
import ProductListings from "./components/ProductListings";
import Footer from "./components/footer/Footer"
import products from "./data/products";

function App() {
  return (
    <>
      <Header />
      <Home />
      <ProductListings products={products} />
      <Footer />
    </>
  )
}

export default App
