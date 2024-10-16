import { useCart } from '../../context/CartContext'; 
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const { cartItems, removeFromCart } = useCart(); 

    return (
        <div className="container mb-5">
            <h3 className="mt-5 mb-5">Shopping Cart</h3>
            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty!</p>
            ) : (
                <div className="row">
                    {cartItems.map((item) => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                {item.imageUrl && (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.itemName}
                                        className="card-img-top"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{item.itemName}</h5>
                                    <p className="card-text">
                                        <strong>Category:</strong> {item.category}<br />
                                        <strong>Supplier:</strong> {item.supplierName}<br />
                                        <strong>Quantity:</strong> {item.quantity}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeFromCart(item.id)} 
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Link to="/" className="btn btn-primary mt-3">
                Continue Shopping
            </Link>
            
        </div>
    );
};

export default OrderHistory;
