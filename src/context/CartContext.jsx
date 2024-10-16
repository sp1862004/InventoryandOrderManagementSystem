import  { createContext, useContext, useReducer } from 'react';

const initialState = {
    cartItems: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cartItems: [...state.cartItems, action.payload] };
        case 'REMOVE_FROM_CART':
            return { 
                ...state, 
                cartItems: state.cartItems.filter(item => item.id !== action.payload) 
            };
        case 'CLEAR_CART':
            return { ...state, cartItems: [] };
        default:
            return state;
    }
};

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const removeFromCart = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    };

    const getCartItems = () => {
        return state.cartItems; 
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const isInCart = (itemId) => {
        return state.cartItems.some(item => item.id === itemId);
    };

    return (
        <CartContext.Provider value={{ 
            cartItems: state.cartItems, 
            addToCart, 
            removeFromCart, 
            getCartItems,
            clearCart, 
            isInCart 
        }}>
            {children}
        </CartContext.Provider>
    );
};
