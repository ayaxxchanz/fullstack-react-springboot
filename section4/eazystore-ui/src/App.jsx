import Header from "./components/Header"
import Home from './components/Home';
import ProductListings from "./components/ProductListings";
import Footer from "./components/footer/Footer"
import products from "./data/products";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './custom.scss'

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
