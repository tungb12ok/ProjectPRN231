import React, { useState, useEffect } from "react";
import { addProduct, getSportList, getCategoryList, getBrandList, updateProduct } from "../../api/apiProduct";
import { uploadImage } from "../../services/imageUploadService";
import { toast } from "react-toastify";

const AddProductModal = ({ closeModal, handleAddProduct, token, product }) => {
  const [productName, setProductName] = useState("");
  const [listedPrice, setListedPrice] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [offers, setOffers] = useState("");
  const [mainImageName, setMainImageName] = useState("");
  const [mainImagePath, setMainImagePath] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [sportId, setSportId] = useState("");
  const [classificationId, setClassificationId] = useState("");
  const [productCode, setProductCode] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState(true);
  const [sports, setSports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchSports();
    fetchCategories();
    fetchBrands();

    if (product) {
      setProductName(product.productName || "");
      setListedPrice(product.listedPrice || "");
      setPrice(product.price || "");
      setSize(product.size || "");
      setDescription(product.description || "");
      setColor(product.color || "");
      setOffers(product.offers || "");
      setMainImageName(product.mainImageName || "");
      setMainImagePath(product.mainImagePath || "");
      setCategoryId(product.categoryId || "");
      setBrandId(product.brandId || "");
      setSportId(product.sportId || "");
      setClassificationId(product.classificationId || "");
      setProductCode(product.productCode || "");
      setStatus(product.status !== undefined ? product.status : true);
    }
  }, [product]);

  const fetchSports = async () => {
    try {
      const sports = await getSportList(token);
      setSports(sports);
    } catch (error) {
      console.error("Error fetching sports", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await getCategoryList(token);
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const brands = await getBrandList(token);
      setBrands(brands);
    } catch (error) {
      console.error("Error fetching brands", error);
    }
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      try {
        const imageUrl = await uploadImage(imageFile);
        return imageUrl;
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }
    return mainImagePath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();
    const newProduct = {
      productName,
      listedPrice: parseFloat(listedPrice),
      price: parseFloat(price),
      size,
      description,
      status,
      color,
      offers,
      mainImageName,
      mainImagePath: imageUrl,
      categoryId: parseInt(categoryId),
      brandId: parseInt(brandId),
      sportId: parseInt(sportId),
      classificationId: parseInt(classificationId),
      productCode
    };

    try {
      if (product) {
        await updateProduct({ ...newProduct, id: product.id }, token);
        toast.success("Product updated successfully");
      } else {
        const response = await addProduct(newProduct, token);
        handleAddProduct(response.data);
        toast.success("Product added successfully");
      }
      closeModal(); // Close modal on success
    } catch (error) {
      console.error("Error submitting product", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-h-screen overflow-y-auto">
        <span className="block text-right text-gray-500 cursor-pointer" onClick={closeModal}>&times;</span>
        <h2 className="text-2xl font-bold mb-4">{product ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Product Name:</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Listed Price:</label>
              <input type="number" value={listedPrice} onChange={(e) => setListedPrice(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Price:</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Size:</label>
              <input type="text" value={size} onChange={(e) => setSize(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-3 py-2 border rounded"></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Color:</label>
              <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Offers:</label>
              <input type="text" value={offers} onChange={(e) => setOffers(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Main Image Name:</label>
              <input type="text" value={mainImageName} onChange={(e) => setMainImageName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Category:</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="w-full px-3 py-2 border rounded">
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.categoryName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Brand:</label>
              <select value={brandId} onChange={(e) => setBrandId(e.target.value)} required className="w-full px-3 py-2 border rounded">
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Sport:</label>
              <select value={sportId} onChange={(e) => setSportId(e.target.value)} required className="w-full px-3 py-2 border rounded">
                <option value="">Select Sport</option>
                {sports.map((sport) => (
                  <option key={sport.id} value={sport.id}>{sport.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Classification:</label>
              <select value={classificationId} onChange={(e) => setClassificationId(e.target.value)} required className="w-full px-3 py-2 border rounded">
                <option value="">Select Classification</option>
                <option value="1">New</option>
                <option value="2">Secondhand</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Product Code:</label>
              <input type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Image:</label>
              <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="w-full px-3 py-2 border rounded" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              {product ? "Update" : "Add"}
            </button>
            <button type="button" onClick={closeModal} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
