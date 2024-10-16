import { push, ref, set } from 'firebase/database';
import { useForm } from 'react-hook-form';
import db from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import 'animate.css';

const Inventory = () => {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const navigate = useNavigate();
    const [isPdfVisible, setIsPdfVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const quantity = watch('quantity');  

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            addedAt: new Date().toLocaleString(),
            imageUrl,  
        };

        const newDocRef = push(ref(db, "InventoryList"));
        set(newDocRef, formattedData)
            .then(() => {
                alert("Item added successfully");
                reset();
                navigate("/");  
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    };

    const getStockIndicatorColor = (quantity) => {
        if (quantity < 10) {
            return 'red';  
        } else if (quantity >= 10 && quantity <= 50) {
            return 'orange';  
        } else {
            return 'green';  
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target.result);  
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn">
            <h4 className='mb-4 mt-3 text-center'>Add Inventory Item</h4>
            <div className="container">
                <div className="row d-flex mx-auto justify-content-center">
                    <div className="col-lg-10 mx-auto mt-3 mb-2">
                        <input 
                            type="text" 
                            className='form-control shadow py-3 border-primary' 
                            {...register('itemName')} 
                            autoFocus 
                            placeholder='Item Name' 
                        />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <input 
                            type="number" 
                            className='form-control shadow py-3 border-primary' 
                            {...register('quantity')} 
                            placeholder='Quantity' 
                        />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <input 
                            type="text" 
                            className='form-control shadow py-3 border-primary' 
                            {...register('category')} 
                            placeholder='Category' 
                        />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <input 
                            type="text" 
                            className='form-control shadow py-3 border-primary' 
                            {...register('supplierName')} 
                            placeholder='Supplier Name' 
                        />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <input 
                            type="text" 
                            className='form-control shadow py-3 border-primary' 
                            {...register('supplierContact')} 
                            placeholder='Supplier Contact' 
                        />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <textarea 
                            className='form-control shadow py-3 border-primary' 
                            {...register('supplierAddress')} 
                            placeholder='Supplier Address'
                        />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <label htmlFor="dateInput" className="form-label" style={{ color: '#365E32' }}>Date Added</label>
                        <input 
                            type="date" 
                            className='form-control py-3 shadow border-primary' 
                            {...register('dateAdded')} 
                        />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <label htmlFor="itemImage" className="form-label" style={{ color: '#365E32' }}>Item Image</label>
                        <input 
                            type="file" 
                            className="form-control shadow py-3 border-primary" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                        />
                    </div>

                    <div className="col-lg-10 mt-3">
                        <div className="form-group">
                            <label htmlFor="stockLevel" className="form-label" style={{ color: '#365E32' }}>Stock Level</label>
                            <div className="form-control shadow py-3 border-primary">
                                <span className="badge" style={{
                                    backgroundColor: getStockIndicatorColor(quantity || 0),  
                                    color: 'white',
                                    padding: '10px',
                                    fontSize: '14px'
                                }}>
                                    Stock Level: {quantity < 10 ? 'Low' : quantity <= 50 ? 'Medium' : 'Sufficient'}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <button className='btn btn-primary text-center mx-auto py-2 mb-3 d-grid mx-auto mt-3'>Add Item</button>
        </form>
    );
};

export default Inventory;
