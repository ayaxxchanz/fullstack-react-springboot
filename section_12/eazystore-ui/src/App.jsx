import Header from "./components/Header"
import Footer from "./components/footer/Footer"
import { Outlet, useNavigation } from "react-router";

function App() {
  const navigation = useNavigation();
  
  return (
    <>
      <Header />
      {
        navigation.state === "loading" ? (
          <div className="flex items-center justify-center min-h-[852px]">
             <span className="text-xl font-semibold text-light dark:text-dark">Loading products...</span>
         </div>
        ) : (<Outlet />)
      }
      <Footer />
    </>
  )
}

export default App
