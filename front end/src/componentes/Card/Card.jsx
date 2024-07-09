import React from "react";
import { Image } from "antd";
import { useCartStore } from "../../app/useCartStore";

const Card = (props) => {
  const addProduct = useCartStore((state) => state.addProduct);
  return (
    <div className="card">
      <h3>{props.title.slice(0, 40)}...</h3>
      <Image src={props.image} alt="producto" />
      <h4>{props.price}</h4>

      <p>{props.description.slice(0, 40)}...</p>

      <button
        onClick={() => {
          addProduct(props.product);
        }}
      >
        Aceptar
      </button>
    </div>
  );
};

export { Card };
