import { useCartStore } from "../../stores/useCartStore";
import { List, Avatar, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons"
import { } from '../../stores/useCartStore'
import "./Cart.css";

const Cart = () => {
  const globalProducts = useCartStore((state) => state.products);
  const actions = useCartStore(state => state.actions)

  return (
    <><div className="drawer_total">
    <h2>Total</h2>
    <p>$ {globalProducts
    .map((product) => product.price)
    .reduce((a,b) => a + b, 0 )
    .toFixed(2)}</p>
  </div>
  <List
      itemLayout="horizontal"
      dataSource={globalProducts}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar className="avatar" src={item.image} />}
            title={<div style={{display: "flex", justifyContent: "space-between"}}>
              <a
                className="cart_list_item_title"
                href="https://ant.design"
              >{`${item.title.slice(0, 25)}...`}</a>
              <Button type="primary" size="small" style={{backgroundColor: "white"}} onClick={() => actions.removeProduct(index)}> <CloseOutlined style= {{ color: "red" }}  /> </Button>
              </div>
            }
            description={<p className="cart_list_item_price">{item.price}</p>}
          />
        </List.Item>
      )}
    />
  
  </>
    
  );
};
export { Cart };
