import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router'
import { ToastContainer, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Home, { productsLoader } from './components/Home.jsx'
import About from './components/About.jsx'
import Contact, { contactAction } from './components/Contact.jsx'
import Login from './components/Login.jsx'
import Cart from './components/Cart.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import { CartProvider } from './store/cart-context.jsx'

const routeDefinition = createRoutesFromElements(
  <Route path='/' element={<App />}  errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path='/home' element={<Home />} loader={productsLoader} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} action={contactAction}/>
    <Route path='/login' element={<Login />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/products/:productId' element={<ProductDetails />} />  {/*dynamic route*/}
  </Route>
);

const appRouter = createBrowserRouter(routeDefinition);

// alternative method for small app
// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children:[
//       {
//         index: true,
//         element: <Home />
//       },
//       {
//         path: "/home",
//         element: <Home />
//       },
//       {
//         path: "/about",
//         element: <About />
//       },
//       {
//         path: "/contact",
//         element: <Contact />
//       },
//       {
//         path: "/login",
//         element: <Login />
//       },
//       {
//         path: "/cart",
//         element: <Cart />
//       }
//     ]
//   }
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={appRouter} hydrateFallback={<p>Loading app...</p>} />
    </CartProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
      transition={Bounce}
    />
  </StrictMode>,
)
