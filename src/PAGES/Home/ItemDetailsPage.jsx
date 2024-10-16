import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { get, ref, update } from 'firebase/database'; 
import db from '../../../firebase';
import { useCart } from '../../context/CartContext'; 
import 'animate.css'; 

const ItemDetailsPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null); 
    const [userId] = useState('user1'); 
    const navigate = useNavigate(); 
    const { addToCart } = useCart(); 

    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(db, `InventoryList/${id}`); 
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setItem(snapshot.val());
            } else {
                console.log("No such item found!");
            }
        };

        fetchData();
    }, [id]);

    const handleReserve = async () => {
        const reserveRef = ref(db, `InventoryList/${id}/reservedBy/${userId}`);
        await update(reserveRef, { reserved: true });
        alert('Item reserved successfully!');
        navigate('/orderhistory'); 
    };

    const handleAddToCart = () => {
        if (item) {
            addToCart(item); 
            alert(`${item.itemName} added to cart!`);
            navigate('/cart'); 
        }
    };

    if (!item) {
        return <p className="text-center mt-5 mb-5">Loading...</p>;
    }

    return (
        <div className="container mb-5">
            <h3 className="mt-5 mb-5">Item Details</h3>
           
            <div className="row justify-content-center">
                <div className="col-lg-12 border p-3 shadow-lg rounded animate__animated animate__fadeIn">
                    <img 
                        src={item.imageUrl} 
                        height={500} 
                        className="card-img-top shadow-lg rounded" 
                        alt={item.itemName} 
                    />
                    <div className="card-body">
                        <h6 className="card-title">{item.itemName} 
                            <span style={{ color: '#5A639C' }}> Added on: {item.dateAdded}</span>
                        </h6>
                        <p className="card-text mt-4 mb-3"><b>Category</b>: {item.category}</p>
                        <p className="card-text mt-4 mb-3"><b>Supplier</b>: {item.supplierName}</p>
                        <p className="card-text mt-4 mb-3"><b>Quantity</b>: {item.quantity}</p>
                        
                        <p className="card-text">{item.description}</p>
                    </div>
                    <Link 
                        to={`/edit/${id}`} 
                        className="btn btn-warning text-center py-1 mb-3 mx-auto mt-4 shadow-lg rounded"
                    >
                        Update
                    </Link>

                    <div className="reserve-section mt-4">
                        <h5>Reserve this Item</h5>
                        <button onClick={handleReserve} className="btn btn-primary mb-3">
                            Reserve
                        </button>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <div className="add-to-cart-section mt-4">
                        <h5>Add to Cart</h5>
                        <button onClick={handleAddToCart} className="btn btn-success mb-3">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailsPage;
