import { useState } from "react";
import { updateProductStatus } from "../../api/apiProduct";
import AddProductModal from "./AddProductModal";
const ProductTable = ({
  products,
  setProducts,
  fetchProducts,
  handleSortChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChangeStatus = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure to change status this product?`
    );
    if (!confirmDelete) return;
    const currentStatus = products.find((product) => product.id === id).status;
    const response = await updateProductStatus(id, !currentStatus);
    const status = response.status;
    if (status === 200) {
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        const newProducts = [...products];
        newProducts[index].status = !currentStatus;
        setProducts(newProducts);
      }
    }
  };

  const handleClickDetail = (product) => {
    console.log(product);
    setSelectProduct(product);
    openModal();
  };

  return (
    <div className="overflow-x-auto">
      <div className="overflow-auto rounded p-2 w-60">
        {isModalOpen && (
          <AddProductModal
            closeModal={closeModal}
            product={selectProduct}
          />
        )}
      </div>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th
              onClick={() => handleSortChange("productName")}
              className="py-3 px-6 text-left cursor-pointer"
            >
              Product Name
            </th>
            <th
              onClick={() => handleSortChange("brandName")}
              className="py-3 px-6 text-left cursor-pointer"
            >
              Brand
            </th>
            <th
              onClick={() => handleSortChange("sportName")}
              className="py-3 px-6 text-left cursor-pointer"
            >
              Sport
            </th>
            <th
              onClick={() => handleSortChange("classificationName")}
              className="py-3 px-6 text-left cursor-pointer"
            >
              Classification
            </th>
            <th
              onClick={() => handleSortChange("categoryName")}
              className="py-3 px-6 text-left cursor-pointer"
            >
              Category
            </th>
            <th
              onClick={() => handleSortChange("price")}
              className="py-3 px-6 text-right cursor-pointer"
            >
              Price
            </th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{product.productName}</td>
              <td className="py-3 px-6 text-left">{product.brandName}</td>
              <td className="py-3 px-6 text-left">{product.sportName}</td>
              <td className="py-3 px-6 text-left">
                {product.classificationName}
              </td>
              <td className="py-3 px-6 text-left">{product.categoryName}</td>
              <td className="py-3 px-6 text-right">{product.price}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => {
                    handleClickDetail(product);
                  }}
                  className="bg-amber-400 hover:bg-orange-400 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out mr-2"
                >
                  Detail
                </button>
                {product.status ? (
                  <button
                    onClick={() => {
                      handleChangeStatus(product.id);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleChangeStatus(product.id);
                    }}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out"
                  >
                    Active
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
