import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cartItems } = useCart(); 

    return (
        <div className="container mb-5">
            <h3 className="mt-5 mb-5">Shopping Cart</h3>
            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty!</p>
            ) : (
                <ul className="list-group">
                    {cartItems.map((item, index) => (
                        <li key={index} className="list-group-item">
                            <h6>{item.itemName}</h6>
                            <p>Category: {item.category}</p>
                            <p>Supplier: {item.supplierName}</p>
                            <p>Quantity: {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/" className="btn btn-primary mt-3">
                Continue Shopping
            </Link>
        </div>
    );
};

export default CartPage;
