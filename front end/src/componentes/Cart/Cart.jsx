import { useCartStore } from "../../app/useCartStore";
import { List, Avatar } from "antd";
import { peek } from "../../utils/peek";
import { Fragment } from "react";
import "./Cart.css";  // Asegúrate de importar el archivo CSS

const Cart = () => {
  const productsGlobal = useCartStore((state) => state.products);
  return (
    <div className="cart-container">
      <h3 className="cart-total">
        Total: $
        {productsGlobal
          .map((product) => product.price)
          .reduce((a, b) => a + b, 0)}
      </h3>
      <List
        itemLayout="horizontal"
        dataSource={productsGlobal}
        renderItem={(product, index) => (
          <List.Item className="cart-item">
            <List.Item.Meta
              avatar={<Avatar src={peek(product).image} />}
              title={<a href="https://ant.design" className="cart-item-title">{product.title}</a>}
              description={<p className="cart-item-price">${product.price}</p>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export { Cart };
