import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@material-tailwind/react";
import Pagination from "../Product/Paginationv2";
import { getProductListPage } from "../../api/apiProduct";
import { toast } from "react-toastify";

export default function Productv2Card() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [sortBy, setSortBy] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    fetchProducts(currentPage, productsPerPage, sortBy, isAscending, keywords);
  }, [currentPage, sortBy, isAscending, keywords]);

  const fetchProducts = async () => {
    try {
      const response = await getProductListPage(currentPage, productsPerPage, sortBy, isAscending);
      console.log("Data fetched: ", response.data);

      const productsData = response.data.data?.$values || [];
      setProducts(productsData);
      setTotalProducts(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching products", error);
      toast.error("Error fetching products");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div className="flex mb-10 bg-white shadow-md rounded-lg overflow-hidden" key={product.id}>
            <div className="w-1/4 p-2">
              <img
                src={product.mainImagePath}
                alt="Product"
                className="rounded-lg w-full"
              />
            </div>
            <div className="w-1/3 p-4">
              <h4 className="text-xl font-bold text-blue-500">{product.categoryName}</h4>
              <h2 className="text-2xl font-bold text-blue-700 underline">
                {product.productName}
              </h2>
              <p className="text-gray-600 my-4">{product.description}</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>Available in colors</li>
                <li>Size ranges from 36 to 45</li>
              </ul>
            </div>
            <div className="w-px bg-gray-300 mx-6"></div>
            <div className="w-1/3 flex flex-col justify-between items-center p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-800">
                  {product.price}
                </div>
                <div className="flex items-center justify-center text-blue-500 mt-2">
                  <Rating value={product.reviews.$values.reduce((acc, review) => acc + review.star, 0) / product.reviews.$values.length || 0} readonly />
                  <span className="text-gray-600 ml-2">
                    ({product.reviews.$values.length})
                  </span>
                </div>
                <div className="text-gray-600 mt-2">
                  <span className="font-bold">Stock:</span> {product.stock}{" "}
                  Available
                </div>
              </div>
              <div className="flex text-center mt-4 space-x-2 my-2 w-fit">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded w-[200px] h-10">
                  ADD TO CART
                </button>
                <div className="flex justify-center space-x-2 w-full">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded w-10 h-10">
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded w-10 h-10">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-blue-700 font-bold mt-10">No products found.</p>
      )}
      <Pagination
        total={totalProducts}
        current={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}
