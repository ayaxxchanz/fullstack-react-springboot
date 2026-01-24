import { createContext, useContext, useReducer } from "react";


// const initialCartContext = {
//   cart:[],
//   setCart:()=>{},
//   addToCart:()=>{console.log("Item added to cart.")},
//   removeFromCart:()=>{},
//   totalQuantity:0,
// }

export const CartContext = createContext();

// to remove the repeatition of useContext(CartContext) to every child that uses CartContext
export const useCart = () => useContext(CartContext);

const ADD_TOCART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

const cartReducer = (prevCart, action) => {
    switch(action.type){
        case ADD_TOCART: {
            const { product, quantity } = action.payload;
            const existingItem = prevCart.find(
                (item) => item.productId === product.productId
            );

            if (existingItem) {
                return prevCart.map((item) =>
                item.productId === product.productId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        }
        case REMOVE_FROM_CART: {
            return prevCart.filter((item) => item.productId !== action.payload.productId);
        }
        case CLEAR_CART: {
            return [];
        }
        default: {
            return prevCart;
        }
    }
};

export const CartProvider = ({ children }) => {
    const initialCartState = (() => {
        try {
            const storedCart = localStorage.getItem("localCart");
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage:", error);
            return [];
        }
    })();

    const [cart, dispatch] = useReducer(cartReducer, initialCartState);

    function addToCart(product, quantity) {
        dispatch({type: ADD_TOCART, payload: {product, quantity}});
    }

    function removeFromCart(productId) {
        dispatch({type: REMOVE_FROM_CART, payload: {productId}});
    }

    function clearCart() {
        dispatch({type: CLEAR_CART});
    }

    // USING useState INSTEAD OF useReducer
    // const [cart, setCart] = useState(() => {
    //     // This initializer function runs only once on the component's initial render
    //     // to determine the starting value of the "cart" state.
    //     try{
    //         // To avoid confusion of localStorage "cart" and state "cart",
    //         // "localCart" key is used for localStorage
    //         const storedCart = localStorage.getItem("localCart");
            
    //         // JSON.parse(storedCart) converts the JSON string content from localStorage 
    //         // into a usable JavaScript Object or Array.
            
    //         // If storedCart is null (i.e., no item in localStorage), 
    //         // it returns an empty array ([]) as the initial value.
    //         return storedCart ? JSON.parse(storedCart) : [];
    //     }
    //     catch (error){
    //         console.log("Failed to parse cart from localStorage: ", error);
    //         // Fallback to an empty array if parsing fails (e.g., malformed JSON)
    //         return [];
    //     }
    // });

    // // Save cart to localStorage whenever it changes.
    // // This is to avoid the data being wiped out everytime user refresh the page
    // // or close the browser.
    // useEffect(()=>{
    //     // This code executes after every render where the 'cart' state has changed.
    //     try {
    //         // Converts the current JavaScript array/object state of 'cart' to a JSON string 
    //         // and saves it under the "localCart" key in localStorage.
    //         localStorage.setItem("localCart", JSON.stringify(cart));
    //     } catch (error) {
    //         // Handles potential storage quota errors or other issues
    //         console.log("Failed to save cart to localStorage: ", error);
    //     }
    // }, [cart]);

    // const addToCart = (product, quantity) => {
    //     // before React state changes, you can access the previous state using arrow function with the "set" function
    //     // more about it: https://www.dhiwise.com/post/best-practices-for-preservingprevious-state-in-react-usestate
    //     setCart((prevCart) => {
    //     const existingItem = prevCart.find(
    //         (item) => item.productId === product.productId
    //     );

    //     if (existingItem) {
    //         // Use map() to create a new array with updated quantity
    //         return prevCart.map((item) =>
    //         item.productId === product.productId
    //             ? { ...item, quantity: item.quantity + quantity }
    //             : item
    //         );
    //     }

    //     // If the product is not in the cart, add it
    //     return [...prevCart, { ...product, quantity }];
    //     });
    // };

    // // Function to remove an item from the cart
    // const removeFromCart = (productId) => {
    //     setCart((prevCart) =>
    //     prevCart.filter((item) => item.productId !== productId)
    //     );
    // };

    // Calculate total quantity
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalQuantity }}>
            {children}
        </CartContext.Provider>
        )
}