import './styles.css';
import { Button } from "antd";
import useEditStore from "../../stores/useEditStore";
import sleep from '../../utils/sleep'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import { notification } from "antd";
const openAddNotification = (title, image) =>
  notification.open({
    message: "Product updated!",
    description: title,
    placement: "bottomLeft",
    icon: <img src={image} style={{width: "30px", height: "30px", borderRadius: "50%"}} />,
  });

function EditForm({ updateProductsAfterEdit }) {
  const editStore = useEditStore();
  const { product } = editStore;
  const [isLoading, setIsLoading] = useState(false);

  // States cambiados
  const [newTitle, setNewTitle] = useState(product.title);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newCategory, setNewCategory] = useState(product.category);
  const [newDescription, setNewDescription] = useState(product.description);
  const [newImage, setNewImage] = useState(product.image);

  useEffect(() => {
    setNewTitle(product.title);
    setNewPrice(product.price);
    setNewCategory(product.category);
    setNewDescription(product.description);
    setNewImage(product.image);
  }, [product]);

  async function buttonSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    
    

    const data = {
      idProduct: product.id,
      newTitle,
      newPrice,
      newDescription,
      newCategory,
      newImage,
    };

    try {
      const response = await axios.put("/api/products", data);
      console.log(response.status);
      console.log('Product updated: ', response.data.data);
      const { image, title } = response.data.data;
      await sleep(3000);
      openAddNotification(title, image);

      //Actualiza los productos en Admin.jsx

      updateProductsAfterEdit(response.data.data)


    } catch (error) {
      console.error(error.response.status);
    }

    setIsLoading(false);
  }

  return (
    <div className='edit_box'>
      <img style={{width: "200px", height: "200px", borderRadius: "30%"}} src={product.image} alt="" />
      <div className="edit_input">
        <label htmlFor="edit-new-title">New Title</label>
        <textarea
          name="edit-new-title"
          id="edit-new-title"
          cols="25"
          rows="2"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div className="edit_input">
        <label htmlFor="edit-new-price">New Price</label>
        <input
          type="number"
          name="edit-new-price"
          id="edit-new-price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
      </div>
      <div className="edit_input_description">
        <label htmlFor="edit-new-description">New Description</label>
        <textarea
          name="edit-new-description"
          id="edit-new-description"
          cols="40"
          rows="5"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>
      <div className="edit_input">
        <label htmlFor="edit-new-category">New Category</label>
        <input
          type="text"
          name="edit-new-category"
          id="edit-new-category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      </div>
      <div className="edit_input">
        <label htmlFor="edit-new-image">New Image</label>
        <textarea
          name="edit-new-image"
          id="edit-new-image"
          cols="25"
          rows="2"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
      </div>
      <div className='edit_button'>
        <Button loading={isLoading ? true : false} style={{width:"100px", textAlign:"center", fontWeight: "bold" }} type='primary' size='large' onClick={buttonSubmit} >Edit!</Button>
      </div>
    </div>
  );
}

export default EditForm;
