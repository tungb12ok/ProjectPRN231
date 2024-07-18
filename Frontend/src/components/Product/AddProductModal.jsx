import React, { useState } from "react";
import { addProduct } from "../../api/apiProduct";

const AddProductModal = ({ closeModal, handleAddProduct }) => {
    const [productName, setProductName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [sportName, setSportName] = useState("");
    const [classificationName, setClassificationName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [mainImagePath, setMainImagePath] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { productName, brandName, sportName, classificationName, categoryName, price: parseFloat(price), description, color, mainImagePath };
        try {
            const response = await addProduct(newProduct);
            handleAddProduct(response.data);
        } catch (error) {
            console.error("Error adding product", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
                <span className="block text-right text-gray-500 cursor-pointer" onClick={closeModal}>&times;</span>
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Product Name:</label>
                        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Brand Name:</label>
                        <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Sport Name:</label>
                        <input type="text" value={sportName} onChange={(e) => setSportName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Classification:</label>
                        <input type="text" value={classificationName} onChange={(e) => setClassificationName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category:</label>
                        <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price:</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-3 py-2 border rounded"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Color:</label>
                        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image URL:</label>
                        <input type="text" value={mainImagePath} onChange={(e) => setMainImagePath(e.target.value)} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;