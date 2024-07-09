import './styles.css';
import { Button } from "antd";
import sleep from '../../utils/sleep'; 
import axios from 'axios';
import { useState } from 'react';
import { notification } from "antd";
import useProductsQuery from '../../hooks/useProductsQuery';
const openAddNotification = (title, image) =>
  notification.open({
    message: "Product added!",
    description: title,
    placement: "bottomRight",
    icon: <img src={image} style={{width: "30px", height: "30px", borderRadius: "50%"}} />,
  });

function AddNewProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const { products } = useProductsQuery();

  // States cambiados
  const [title, setNewProductTitle] = useState("");
  const [price, setNewProductPrice] = useState("");
  const [category, setNewProductCategory] = useState("");
  const [description, setNewProductDescription] = useState("");
  const [image, setNewProductImage] = useState("");

  const categories = products.map((product) => product.category);
  const uniqueCategories = [...new Set(categories)];



  async function buttonSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    
    const data = { title, description, image, category, price }


    console.log(data)

    try {
      const response = await axios.post("/api/products", data);
      console.log(response.status);
      if(response.status === 201) {
        console.log('Product added: ', response.data.data);
        const { image, title } = response.data.data;
        await sleep(3000);
        openAddNotification(title, image);
      }
 


    } catch (error) {
      console.error(error.response.status);
    }

    setIsLoading(false);
  }

  return (
    <div className='edit_box'>
      <div className="edit_input">
        <label htmlFor="edit-new-title">New Title</label>
        <textarea
          name="edit-new-title"
          id="edit-new-title"
          cols="25"
          rows="2"
          onChange={(e) => setNewProductTitle(e.target.value)}
        />
      </div>
      <div className="edit_input">
        <label htmlFor="edit-new-price">New Price</label>
        <input
          type="number"
          name="edit-new-price"
          id="edit-new-price"
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
      </div>
      <div className="edit_input_description">
        <label htmlFor="edit-new-description">New Description</label>
        <textarea
          name="edit-new-description"
          id="edit-new-description"
          cols="40"
          rows="5"
          onChange={(e) => setNewProductDescription(e.target.value)}
        />
      </div>
      <div className="edit_input">
        <label htmlFor="edit-new-category">Category
        <select
            style={{marginLeft: "30px", width:"150px", textAlign:"center"}}
            name="filter-category"
            id="filter-category"
            onChange={(e) => setNewProductCategory(e.target.value)}
          >
            {uniqueCategories.map((category, i) => (
              <option key={`key-option-${category}${i}`} value={category}>
                {category}
              </option>
            ))}
          </select>
          </label>
      </div>
      <div className="edit_input">
        <label htmlFor="edit-new-image">New Image</label>
        <textarea
          name="edit-new-image"
          id="edit-new-image"
          cols="25"
          rows="2"

          onChange={(e) => setNewProductImage(e.target.value)}
        />
      </div>
      <div className='edit_button'>
        <Button loading={isLoading ? true : false} style={{width:"200px", textAlign:"center", fontWeight: "bold" }} type='primary' size='large' onClick={buttonSubmit} >Add New Product!</Button>
      </div>
    </div>
  );
}

export default AddNewProduct;