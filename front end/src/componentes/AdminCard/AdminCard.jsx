import { useAdminStore } from "../../stores/useAdminStore";
import useEditStore from "../../stores/useEditStore";

function AdminCard({ title, imageUrl, description, price, id, product, category }) {
  const editStore = useEditStore();
  const { setIsEditDrawerShow } = useAdminStore();

  return (
    <div className="card">
      <h3>{title.slice(0, 20)}...</h3>
      <img src={imageUrl} alt="" />
      <h6>{description.slice(0, 40)}...</h6>
      <h4>{price}</h4>
      <button
        onClick={() => {
          setIsEditDrawerShow(true);
          editStore.actions.productToEdit({
            id: id,
            price: price,
            category: category,
            description: description,
            title: title,
            image: imageUrl,
          });
        }}
      >
        Edit
      </button>
    </div>
  );
}

export default AdminCard;
