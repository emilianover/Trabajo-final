import { useCartStore } from "../app/useCartStore";
import { List, Avatar } from "antd";
import { peek } from "../utils/peek";
import { Fragment } from "react";

const Cart = () => {
  const productsGlobal = useCartStore((state) => state.products);
  return (
    <div className="container">
      <h3 className="buscadpr">
        Total:$
        {productsGlobal
          .map((product) => product.price)
          .reduce((a, b) => a + b, 0)}
      </h3>{" "}
      <List
        itemLayout="horizontal"
        dataSource={productsGlobal}
        renderItem={(product, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={peek(product).image} />}
              title={<a href="https://ant.design">{product.title}</a>}
              description={<p>${product.price}</p>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export { Cart };
