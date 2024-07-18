import React, { useState, useEffect } from "react";
import HeaderStaff from "./HeaderStaff";
import SidebarStaff from "./SidebarStaff";
import ProductTable from "../Product/ProductTable";
import AddProductModal from "../Product/AddProductModal";
import Pagination from "../../components/Product/Pagination";
import { getProductList } from "../../api/apiProduct";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        try {
            const response = await getProductList({ currentPage: page });
            setProducts(response.data.data.$values);
            setTotalProducts(response.data.total);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
        closeModal();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <HeaderStaff />
            <SidebarStaff className="w-2/12 h-full fixed" />
            <div className="flex flex-col w-10/12 ml-fixed">
                <main className="flex-1 p-2 mt-16 ml-3">
                    <h1 className="text-2xl font-bold mb-4">Product Management</h1>
                    <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mb-4">
                        Add Product
                    </button>
                    <div className="overflow-auto bg-white shadow-md rounded p-2">
                        <ProductTable products={products} setProducts={setProducts} fetchProducts={fetchProducts} />
                    </div>
                    <Pagination total={totalProducts} current={currentPage} onChange={handlePageChange} />
                    {isModalOpen && <AddProductModal closeModal={closeModal} handleAddProduct={handleAddProduct} />}
                </main>
            </div>
        </div>
    );
};

export default ProductManagement;