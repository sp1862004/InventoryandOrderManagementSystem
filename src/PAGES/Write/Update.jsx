import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ref as dbRef, get, ref, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import db from '../../../firebase';
import 'animate.css';

const UpdateItem = () => {
    const { id } = useParams();  
    const { register, handleSubmit, reset, setValue } = useForm();
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [quantity, setQuantity] = useState(0); 
    const navigate = useNavigate();
    const storage = getStorage();

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        try {
            const databaseRef = dbRef(db, `InventoryList/${id}`);
            const snapshot = await get(databaseRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                reset(data);  
                setQuantity(data.quantity);  
            } else {
                console.log("No such item found!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };

    const handleImageUpload = async () => {
        if (!imageFile) return null;

        const storageReference = storageRef(storage, `InventoryImages/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageReference, imageFile);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
                () => {
                    setUploading(true);
                }, 
                (error) => {
                    console.error('Image upload failed: ', error);
                    setUploading(false);
                    reject(error);
                }, 
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setUploading(false);
                    resolve(downloadURL);
                }
            );
        });
    };

    const onSubmit = async (data) => {
        try {
            let imageUrl = data.imageUrl;  

            if (imageFile) {
                imageUrl = await handleImageUpload();
            }

            const updatedItem = {
                ...data,
                imageUrl  
            };

            const itemRef = ref(db, `InventoryList/${id}`);
            await set(itemRef, updatedItem);  
            alert("Item updated successfully!");
            reset();
            navigate('/');  
        } catch (error) {
            console.error("Error saving document: ", error);
            alert("Error: " + error.message);
        }
    };

    const getStockIndicatorColor = (quantity) => {
        if (quantity < 10) return 'red';
        if (quantity <= 50) return 'orange';
        return 'green';
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn">
            <h6 className='mb-4 mt-3 text-center'>Update Item Details</h6>
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
                            type="number" 
                            className='form-control shadow py-3 border-primary' 
                            {...register('quantity')} 
                            min="0" 
                            placeholder='Quantity' 
                            onChange={(e) => setQuantity(e.target.value)}  // Update quantity state on change
                        />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <label htmlFor="dateAdded" className="form-label" style={{ color: '#365E32' }}>Date Added</label>
                        <input 
                            type="date" 
                            className='form-control py-3 shadow border-primary' 
                            {...register('dateAdded')} 
                        />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <label htmlFor="imageUpload" className="form-label" style={{ color: '#365E32' }}>Upload New Image (optional)</label>
                        <input 
                            type="file" 
                            className='form-control py-3 shadow border-primary' 
                            id="imageUpload" 
                            onChange={(e) => setImageFile(e.target.files[0])} 
                        />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <input 
                            type="text" 
                            className='form-control shadow py-3 border-primary' 
                            {...register('imageUrl')} 
                            placeholder='Existing Image URL' 
                        />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <textarea 
                            className="form-control shadow py-3 border-primary" 
                            {...register('description')} 
                            rows="8" 
                            placeholder="Describe the item here..."
                        ></textarea>
                    </div>
                    
                    {/* Stock Level Section */}
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
                <button 
                    className='btn btn-success text-center mx-auto py-2 mb-3 d-grid mx-auto mt-3' 
                    disabled={uploading}
                >
                    {uploading ? 'Updating...' : 'Update Item'}
                </button>
            </div>
        </form>
    );
};

export default UpdateItem;
