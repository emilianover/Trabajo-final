/* eslint-disable react/prop-types */
import { useCartStore } from "../../stores/useCartStore";

function Card({ title, imageUrl, description, price, product }) {
  const actions = useCartStore(state => state.actions);
  return (
    <div className="card">
      <h3>{title.slice(0, 20)}...</h3>
      <img src={imageUrl} alt="" />
      <h6>{description.slice(0, 40)}...</h6>
      <h4>{price}</h4>
      <button onClick={() => actions.addProduct(product)}>Comprar!</button>
    </div>
  );
}

export { Card };
