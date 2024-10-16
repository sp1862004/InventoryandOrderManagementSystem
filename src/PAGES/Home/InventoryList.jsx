import { useEffect, useState } from 'react';
import { ref, onValue, remove } from 'firebase/database'; 
import db from '../../../firebase'; 
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 
import 'animate.css';

const InventoryList = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart, removeFromCart, isInCart } = useCart(); 
    useEffect(() => {
        const itemsRef = ref(db, 'InventoryList');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const itemList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setItems(itemList);
            }
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            const itemRef = ref(db, `InventoryList/${id}`);
            remove(itemRef)
                .then(() => {
                    alert("Item deleted successfully.");
                    setItems(prevItems => prevItems.filter(item => item.id !== id));
                })
                .catch(error => {
                    alert("Error deleting item: " + error.message);
                });
        }
    };

    const filteredItems = items.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStockIndicatorColor = (quantity) => {
        if (quantity < 10) {
            return 'red'; 
        } else if (quantity >= 10 && quantity <= 50) {
            return 'orange'; 
        } else {
            return 'green'; 
        }
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control shadow-lg p-3 mb-5 bg-light rounded"
                        placeholder="Search items by name or category..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                {filteredItems.map((item) => (
                    <div key={item.id} className="col-md-4 mb-5">
                        <div className="card h-100 shadow-lg border-0 animated animate__fadeIn">
                            {item.imageUrl && (
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.itemName} 
                                    className="card-img-top img-fluid" 
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title text-primary">{item.itemName}</h5>
                                <p className="card-text">
                                    <strong>Category:</strong> {item.category}<br />
                                    <strong>Supplier Name:</strong> {item.supplierName}<br />
                                    <strong>Supplier Contact:</strong> {item.supplierContact}<br />
                                    <strong>Supplier Address:</strong> {item.supplierAddress}<br />
                                    <strong>Quantity:</strong> {item.quantity}<br />
                                    <strong>Date Added:</strong> {new Date(item.dateAdded).toLocaleDateString()}<br />
                                </p>
                                <div 
                                    className="badge"
                                    style={{
                                        backgroundColor: getStockIndicatorColor(item.quantity),
                                        color: 'white',
                                        padding: '10px',
                                        fontSize: '14px'
                                    }}
                                >
                                    Stock Level: {item.quantity < 10 ? 'Low' : item.quantity <= 50 ? 'Medium' : 'Sufficient'}
                                </div>
                                <div className="mt-3 d-flex justify-content-between">
                                    {isInCart(item.id) ? (
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove from Cart
                                        </button>
                                    ) : (
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => addToCart({ id: item.id, ...item })} 
                                        >
                                           <i className="fa-solid fa-cart-shopping"></i>
                                        </button>
                                    )}
                                    <Link to={`/ItemDetails/${item.id}`} className="btn btn-info">Show More</Link>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item.id)}  
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredItems.length === 0 && (
                    <div className="text-center fs-1 mt-5 text-danger mb-5">
                        <h5>No items found.</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InventoryList;
