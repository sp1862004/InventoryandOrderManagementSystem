import { push, ref, set } from 'firebase/database';
import { useForm } from 'react-hook-form';
import db from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref as dbRef, get } from 'firebase/database'; 
import 'animate.css';

const AdminDashboard = () => {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);  
    const [imageUrl, setImageUrl] = useState('');
    const quantity = watch('quantity');  

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                const roleRef = dbRef(getDatabase(), `users/${user.uid}/role`);
                get(roleRef).then((snapshot) => {
                    if (snapshot.exists() && snapshot.val() === 'admin') {
                        setIsAdmin(true);  
                    } else {
                        setIsAdmin(false);  
                        navigate('/not-authorized');  
                    }
                });
            } else {
                navigate('/getauth');
            }
        });
    }, [navigate]);

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

    
    if (!isAuthenticated) {
        return null; 
    }

    if (!isAdmin) {
        return <p>You do not have permission to view this page.</p>;  
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn">
            <h4 className='mb-4 mt-3 text-center'>Add Inventory Item</h4>
            <div className="container">
                <div className="row d-flex mx-auto justify-content-center">
                    {/* Form inputs for adding items */}
                    {/* Rest of the form goes here */}
                </div>
            </div>
            <button className='btn btn-primary text-center mx-auto py-2 mb-3 d-grid mx-auto mt-3'>Add Item</button>
        </form>
    );
};

export default AdminDashboard;
