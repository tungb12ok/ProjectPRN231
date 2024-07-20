import React, { useState, useEffect } from "react";
import HeaderStaff from "./HeaderStaff";
import SidebarStaff from "./SidebarStaff";
import ProductTable from "../Product/ProductTable";
import AddProductModal from "../Product/AddProductModal";
import Pagination from "../../components/Product/Pagination";
import { getProductListPage } from "../../api/apiProduct";
import { toast } from "react-toastify";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const perPage = 5;

    useEffect(() => {
        fetchProducts(currentPage, sortBy, isAscending);
    }, [currentPage, sortBy, isAscending]);

    const fetchProducts = async () => {
        try {
            const response = await getProductListPage({ currentPage, perPage, sortBy, isAscending });
            setProducts(response.data.data.$values);
            setTotalProducts(response.data.total);
            toast.success("Go to page " + currentPage)
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

    const handleSortChange = (sortKey) => {
        setSortBy(sortKey);
        setIsAscending(!isAscending);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-2/12 h-full fixed">
                <SidebarStaff />
            </div>
            <div className="flex flex-col w-10/12 ml-auto">
                <HeaderStaff />
                <main className="flex-1 p-2 mt-16 ml-3">
                    <h1 className="text-2xl font-bold mb-4">Product Management</h1>
                    <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mb-4">
                        Add Product
                    </button>
                    <div className="overflow-auto bg-white shadow-md rounded p-2">
                        <ProductTable products={products} setProducts={setProducts} fetchProducts={fetchProducts} handleSortChange={handleSortChange} />
                    </div>
                    <Pagination total={totalProducts} current={currentPage} onChange={handlePageChange} perPage={perPage} />
                    <div className="overflow-auto rounded p-2 w-60">
                        {isModalOpen && <AddProductModal closeModal={closeModal} handleAddProduct={handleAddProduct} />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductManagement;