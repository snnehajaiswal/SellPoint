import { useEffect, useState } from "react";
import axios from "axios";
import toast ,{Toaster} from "react-hot-toast";
const Home = () => {
  const [products,setProducts]=useState([])
  const [editing,setIsEditing]=useState(false)
  const [isProductEditing,setIsProductEditing]=useState({})
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
  });

  useEffect(()=>{
    fetchProducts()
  },[])

const fetchProducts=async ()=>{
    try{
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/products/getAll-product`,products);
      if(response.status===200){
        setProducts(response.data.message)
        console.log(response.data.message)
      }
    }catch(error){
      console.log(error)
    }
}

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(editing){
      try{
        const response=await axios.put(`${import.meta.env.VITE_BASE_URL}/products/product-update/${isProductEditing._id}`,formData)
         if(response.status===200){
          toast.success("Product updated  Successfully")
          fetchProducts()
          setFormData({ name: "", brand: "", category: "", price: "" });
          setIsEditing(false)
         }
      }catch(error){
        console.log(error)
      }
    }else{
      try{
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/products/add-product`,formData)
         if(response.status===201){
          toast.success("Product added Successfully")
          fetchProducts()
          setFormData({ name: "", brand: "", category: "", price: "" });
         }
      }catch(error){
        console.log(error)
      }
    }
  };

  const handleDeleteButton=async (id)=>{
    try{
     const response=await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/product-delete/${id}`)
     if(response.status===200){
      toast.success("Product delete Successfully")
      fetchProducts()
     }
    }catch(error){
     console.log(error)
    }
  }

  const handleEditButton=(product)=>{
        setFormData(product)
        setIsEditing(true)
        setIsProductEditing(product)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right"/>
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 text-center text-lg font-bold">
        Product Management
      </nav>
      
      {/* Main Content */}
      <div className="flex-grow p-6 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-100 rounded-lg shadow-lg">
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{editing? "Edit Product":"Add Product"}</button>
        </form>
        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
              <div>
                <img className="h-52 w-full" src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS7U65GiE_3KDbsPL6767fx_yGIkRgaDmYkS97SVwcUkYOOUK895Nk2JQECyaXl5GEXbI1_kNFhFpiWilJn-9P-MESF5HNB80T0g1P6USMVqFxZfqFSY17MMg" alt="image" />
              </div>
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-600">Brand: {product.brand}</p>
              <p className="text-gray-800 font-semibold">Price: ${product.price}</p>
            <div className="flex gap-4 mt-2">
              <button onClick={()=>handleEditButton(product)} className="bg-green-500 p-1 w-1/2 rounded-sm text-white hover:bg-white hover:border-2 hover:border-green-600 hover:text-black">Edit</button>
              <button onClick={()=> handleDeleteButton(product._id)} className="bg-red-600 p-1 w-1/2 rounded-sm text-white hover:bg-white hover:border-2 hover:border-red-600 hover:text-black">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
           
      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-6">
        &copy; 2025 Product Management. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
