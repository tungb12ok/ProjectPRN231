import React, { useState, useEffect } from "react";
import HeaderStaff from "./HeaderStaff";
import SidebarStaff from "./SidebarStaff";
import ProductTable from "../Product/ProductTable";
import AddProductModal from "../Product/AddProductModal";
import Pagination from "../../components/Product/Pagination";
import { getProductListPaginationAdmin } from "../../api/apiProduct";
import { toast } from "react-toastify";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [keywords, setKeywords] = useState('');
    const perPage = 5;

    useEffect(() => {
        fetchProducts(currentPage, sortBy, isAscending, keywords);
    }, [currentPage, sortBy, isAscending, keywords]);

    const fetchProducts = async () => {
        try {
            const response = await getProductListPaginationAdmin({ currentPage, perPage, sortBy, isAscending, keywords });
            setProducts(response.data.data.$values);
            setTotalProducts(response.data.total);
        } catch (error) {
            console.error("Error fetching products", error);
            toast.error("Error fetching products");
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

    const handleSearch = (event) => {
        setKeywords(event.target.value);
        setCurrentPage(1); // Reset to first page when searching
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
                    <div className="mb-4 flex">
                        <input
                            type="text"
                            placeholder="Search by product name"
                            className="border rounded py-2 px-4 w-full"
                            value={keywords}
                            onChange={handleSearch}
                        />
                        <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ml-4">
                            Add Product
                        </button>
                    </div>
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
