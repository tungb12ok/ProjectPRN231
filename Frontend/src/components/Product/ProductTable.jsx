import React from "react";

const ProductTable = ({ products, setProducts, fetchProducts, handleSortChange }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th onClick={() => handleSortChange("productName")} className="py-3 px-6 text-left cursor-pointer">Product Name</th>
                        <th onClick={() => handleSortChange("brandName")} className="py-3 px-6 text-left cursor-pointer">Brand</th>
                        <th onClick={() => handleSortChange("sportName")} className="py-3 px-6 text-left cursor-pointer">Sport</th>
                        <th onClick={() => handleSortChange("classificationName")} className="py-3 px-6 text-left cursor-pointer">Classification</th>
                        <th onClick={() => handleSortChange("categoryName")} className="py-3 px-6 text-left cursor-pointer">Category</th>
                        <th onClick={() => handleSortChange("price")} className="py-3 px-6 text-right cursor-pointer">Price</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {products.map(product => (
                        <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{product.productName}</td>
                            <td className="py-3 px-6 text-left">{product.brandName}</td>
                            <td className="py-3 px-6 text-left">{product.sportName}</td>
                            <td className="py-3 px-6 text-left">{product.classificationName}</td>
                            <td className="py-3 px-6 text-left">{product.categoryName}</td>
                            <td className="py-3 px-6 text-right">{product.price}</td>
                            <td className="py-3 px-6 text-center">
                                <button onClick={() => alert(`Details of ${product.productName}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out mr-2">
                                    Detail
                                </button>
                                <button onClick={() => alert(`Delete ${product.productName}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
