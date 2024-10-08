import "../../App.css";
import { useEffect, useState } from "react";

import EditForm from "../../componentes/EditForm/EditForm";
import Welcome from "../../componentes/Welcome/Welcome";
import AdminCard from "../../componentes/AdminCard/AdminCard";
import Logout from "../../componentes/Logout/Logout";
import AddNewProduct from "../../componentes/AddNewProduct/AddNewProduct";
import peek from "../../utils/peek";
import { Button, Drawer } from "antd";

import { getUser } from "../../functions/cookieHandler";

import { useAdminStore } from "../../stores/useAdminStore";


function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState("");
  const [filterByMinPrice, setFilterByMinPrice] = useState(0);
  const [filterByMaxPrice, setFilterByMaxPrice] = useState(Infinity);
  const [isSortByMinPrice, setIsSortByMinPrice] = useState(false);
  const [isSortByMaxPrice, setIsSortByMaxPrice] = useState(false);
  const [filterByCategory, setFilterByCategory] = useState("-");

  const isEditDrawerShow = useAdminStore((state) => state.isEditDrawerShow);
  const { setIsEditDrawerShow } = useAdminStore();
  const [isAddProductDrawerShow, setIsAddProductDrawerShow] = useState(false);

  const userCookies = getUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localHost:3000/api/products', {
          headers: {
            'Authorization': `Bearer ${userCookies.token}` // Ajusta el encabezado según tu API
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected an array of products.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userCookies.token]);

  const updateProductsAfterEdit = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  if (loading) return <div>Loading...</div>;

  const categories = products.map((product) => product.category);
  const uniqueCategories = [...new Set(categories)];


  return (
    <>
   <div className="header">
    <div className="header_logo">
      <img src="https://placekitten.com/184/84"></img>

      <h1> Space Store</h1>
    </div>
    <div className="header_links">
      
    <Logout />

      </div>
  </div>
  
<Welcome name={userCookies.name} />
<Drawer
      title={
        <div className="drawer_edit">
          <p>Edit</p>
        </div>
      }
      onClose={() => setIsEditDrawerShow(false)}
      open={isEditDrawerShow}
    >
      <EditForm updateProductsAfterEdit ={updateProductsAfterEdit}/>
    </Drawer>
    <Drawer
      title={
        <div className="drawer_add">
          <p>Add New Product</p>
        </div>
      }
      placement="left"
      onClose={() => setIsAddProductDrawerShow(false)}
      open={isAddProductDrawerShow}
    >
      <AddNewProduct/>
    </Drawer>
    


    <div className="root">
    <Button style={{width: "180px", margin:"auto"}} type="primary" small="large" onClick={() => setIsAddProductDrawerShow(true)}>Add New Product</Button>
      <div className="filters">
        <h3>Buscar por :</h3>

        <div className="filters-input">
          <label htmlFor="filter-name">Nombre</label>
          <input
            type="text"
            id="name"
            name="id"
            onChange={(e) => setFilterByName(e.target.value)}
            defaultValue={filterByName}
          />
        </div>

        <br />
        <div className="filters-input">
          <label htmlFor="filter-min-price">Precio mínimo</label>
          <input
            type="number"
            name="filter-min-price"
            id="filter-min-price"
            onChange={(e) => setFilterByMinPrice(e.target.value)}
            defaultValue={filterByMinPrice}
          />
        </div>

        <br />
        <div className="filters-input">
          <label htmlFor="filter-max-price">Precio máximo</label>
          <input
            type="number"
            name="filter-max-price"
            id="filter-max-price"
            onChange={(e) => setFilterByMaxPrice(e.target.value)}
          />
        </div>

        <br />
        <div className="filters-input">
          <label htmlFor="filter-category">Categoría</label>
          <select
            name="filter-category"
            id="filter-category"
            onChange={(e) => setFilterByCategory(e.target.value)}
          >
            <option value="-">-</option>
            {uniqueCategories.map((category, i) => (
              <option key={`key-option-${category}${i}`} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="filters-input-checkbox">
            <label htmlFor="order-min">
              Order by Min Price :
              <input
                id="order-min"
                type="checkbox"
                defaultChecked={false}
                onClick={(e) => setIsSortByMinPrice(e.currentTarget.checked)}
              />
            </label>
          </div>

          <div className="filters-input-checkbox">
            <label htmlFor="order-max">
              Order by Max Price:
              <input
                id="order-max"
                type="checkbox"
                defaultChecked={false}
                onClick={(e) => setIsSortByMaxPrice(e.currentTarget.checked)}
              />
            </label>
          </div>
      </div>
      
      <div className="products-layout">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(filterByName.toLowerCase())
          )
          .filter((product) => product.price > filterByMinPrice)
          .filter((product) =>
            filterByMaxPrice != 0 ? product.price < filterByMaxPrice : product
          )
          .filter((product) =>
            filterByCategory === "-"
              ? true
              : product.category === filterByCategory
          )
          .slice()
            .sort((a, b) => (isSortByMinPrice ? a.price - b.price : 0))
            .sort((a, b) => (isSortByMaxPrice ? b.price - a.price : 0))
          .map((product) => (
            <AdminCard
              key={`key-${product.title}-${product.id}`}
              title={product.title}
              imageUrl={product.image}
              description={product.description}
              price={product.price}
              product={product}
              id={product.id}
              category = { product.category}
            ></AdminCard>
          ))}
      </div>
    </div>
  </>
  );
}

export default Admin;