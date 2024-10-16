import { createContext, useContext, useState, useEffect } from 'react';
import { get, ref, remove, set } from 'firebase/database';
import db from '../../firebase';  

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const dbRef = ref(db, "InventoryList");  
        const snapshot = await get(dbRef);
        let itemArray = [];
        if (snapshot.exists()) {
            for (const key in snapshot.val()) {
                const item = snapshot.val()[key];
                itemArray.push({ id: key, ...item });
            }
        }
        setItems(itemArray);  
    };

    const handleDelete = async (id) => {
        const dbRef = ref(db, `InventoryList/${id}`);  
        await remove(dbRef);
        fetchItems();  
    };

    const updateItem = async (id, updatedData) => {
        const dbRef = ref(db, `InventoryList/${id}`); 
        await set(dbRef, updatedData);
        fetchItems();  
    };

    useEffect(() => {
        fetchItems();  
    }, []);

    return (
        <InventoryContext.Provider value={{ items, handleDelete, updateItem }}>
            {children}
        </InventoryContext.Provider>
    );
};
