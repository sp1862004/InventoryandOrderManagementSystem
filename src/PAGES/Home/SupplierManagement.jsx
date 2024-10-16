import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref as dbRef, get, set, remove } from 'firebase/database';
import db from '../../../firebase';

const SupplierManagement = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [suppliers, setSuppliers] = useState([]);
    const [editingSupplierId, setEditingSupplierId] = useState(null);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const snapshot = await get(dbRef(db, 'Suppliers'));
            const suppliersList = [];
            snapshot.forEach((childSnapshot) => {
                suppliersList.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            setSuppliers(suppliersList);
        } catch (error) {
            console.error("Error fetching suppliers: ", error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const supplierRef = dbRef(db, `Suppliers/${editingSupplierId || Date.now()}`);
            await set(supplierRef, data);
            alert(editingSupplierId ? "Supplier updated successfully!" : "Supplier added successfully!");
            reset();
            setEditingSupplierId(null);
            fetchSuppliers();
        } catch (error) {
            console.error("Error saving supplier: ", error);
            alert("Error: " + error.message);
        }
    };

    const handleEdit = (supplier) => {
        setEditingSupplierId(supplier.id);
        setValue('name', supplier.name);
        setValue('contact', supplier.contact);
        setValue('email', supplier.email);
        setValue('itemsSupplied', supplier.itemsSupplied);
    };

    const handleDelete = async (id) => {
        try {
            await remove(dbRef(db, `Suppliers/${id}`));
            alert("Supplier deleted successfully!");
            fetchSuppliers();
        } catch (error) {
            console.error("Error deleting supplier: ", error);
            alert("Error: " + error.message);
        }
    };

    const handleCancelEdit = () => {
        reset();
        setEditingSupplierId(null);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Supplier Management</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <input 
                    type="text" 
                    className="form-control mb-2" 
                    {...register('name', { required: true })} 
                    placeholder="Supplier Name" 
                />
                <input 
                    type="text" 
                    className="form-control mb-2" 
                    {...register('contact')} 
                    placeholder="Contact Details" 
                />
                <input 
                    type="email" 
                    className="form-control mb-2" 
                    {...register('email')} 
                    placeholder="Email Address" 
                />
                <input 
                    type="text" 
                    className="form-control mb-2" 
                    {...register('itemsSupplied')} 
                    placeholder="Items Supplied (comma-separated)" 
                />
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                        {editingSupplierId ? 'Update Supplier' : 'Add Supplier'}
                    </button>
                    {editingSupplierId && (
                        <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
            <h4 className="mb-3">Existing Suppliers</h4>
            <ul className="list-group mt-5 mb-5">
                {suppliers.map(supplier => (
                    <li key={supplier.id} className="list-group-item d-flex justify-content-between align-items-center mt-2">
                        <div>
                            <h5>{supplier.name}</h5>
                            <p>Contact: {supplier.contact}</p>
                            <p>Email: {supplier.email}</p>
                            <p>Items: {supplier.itemsSupplied}</p>
                        </div>
                        <div>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(supplier)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(supplier.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SupplierManagement;
