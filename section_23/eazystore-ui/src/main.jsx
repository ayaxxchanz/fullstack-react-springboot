import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router'
import { ToastContainer, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Home, { productsLoader } from './components/Home.jsx'
import About from './components/About.jsx'
import Contact, { contactAction, contactLoader } from './components/Contact.jsx'
import CheckoutForm from './components/CheckoutForm.jsx'
import Login, { loginAction } from './components/Login.jsx'
import Cart from './components/Cart.jsx'
import Profile, { profileAction, profileLoader } from './components/Profile.jsx'
import Orders, { ordersLoader } from './components/Orders.jsx'
import AdminOrders, { adminOrdersLoader } from './components/admin/AdminOrders.jsx'
import Messages, { messagesLoader } from './components/admin/Messages.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import { AuthProvider } from './store/auth-context.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Register, { registerAction } from './components/Register.jsx'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import OrderSuccess from './components/OrderSuccess.jsx'

import { Provider } from 'react-redux'
import store from './store/store.js'

export const stripePromise = loadStripe("pk_test_51St1ggRazSsvveOPqPO3gQiwHYZGT5LBf580oIjL3OGI7QuZmKjyGkVo8ycphvGHurYS1sjLfZ7YRLoqKzcCYgUX001gwum7I5");


const routeDefinition = createRoutesFromElements(
  <Route path='/' element={<App />}  errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path='/home' element={<Home />} loader={productsLoader} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} action={contactAction} loader={contactLoader} />
    <Route path='/login' element={<Login />} action={loginAction}/>
    <Route path='/register' element={<Register />} action={registerAction}/>
    <Route path='/cart' element={<Cart />} />
    <Route path='/products/:productId' element={<ProductDetails />} />  {/*dynamic route*/}
    <Route element={<ProtectedRoute />}>
      <Route path='/checkout' element={<CheckoutForm />} />
      <Route path='/order-success' element={<OrderSuccess />} />
      <Route path='/profile' element={<Profile />} loader={profileLoader} action={profileAction} shouldRevalidate={({actionResult}) => {return !actionResult?.success;}} /> {/*shouldRevalidate is to avoid the the rest API inside profileLoader gets invoked again when user update the profile*/}
      <Route path='/orders' element={<Orders />} loader={ordersLoader} />
      <Route path='/admin/orders' element={<AdminOrders />} loader={adminOrdersLoader} />
      <Route path='/admin/messages' element={<Messages />} loader={messagesLoader} />
    </Route>
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
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <RouterProvider router={appRouter} hydrateFallback={<p>Loading app...</p>} />
      </Provider>
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
    </Elements>
  </StrictMode>,
)
