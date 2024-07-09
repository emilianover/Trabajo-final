import { Button, Result, List, Avatar } from "antd";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";
import './styles.css'
import { getUser } from "../../functions/cookieHandler";
import OrderButton from "../../components/OrderButton/OrderButton";
const Confirm = () => {
  const userCookies = getUser();
  const globalProducts = useCartStore((state) => state.products);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div style={{ backgroundColor: "white" }}>
        <Result
          status="success"
          title="You order is Almost Complete"
          subTitle={
            <div>
              <List
                itemLayout="horizontal"
                dataSource={globalProducts}
                renderItem={(item, ) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar className="avatar" src={item.image} />}
                      title={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <a
                            className="cart_list_item_title"
                            href="https://ant.design"
                          >{`${item.title.slice(0, 50)}`}</a>
                        </div>
                      }
                      description={
                        <p className="cart_list_item_price">{`$ ${item.price}`}</p>
                      }
                    />
                  </List.Item>
                )}
              />
              <div style={{borderTop: "1px solid blue"}} className="drawer_total">
                <h2>Total</h2>
                <p>
                  ${" "}
                  {globalProducts
                    .map((product) => product.price)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="box_user_info">
                <h2 style={{textAlign: "center", margin: "10px"}}>User dates</h2>
                <div className="box_user_info_cookies">
                    <h3>Name: {userCookies.name} {userCookies.lastName} </h3>
                    <h3>Adress: {userCookies.adress}</h3>
                    <h3>Tel: {userCookies.tel} </h3>

                </div>
              </div>
            </div>
          }
          extra={[
            <OrderButton key={'order-button'} />,
            <Button onClick={() => navigate("/")} key={'Home'}> Home </Button>
          ]}
        />
      </div>
    </>
  );
};

export default Confirm;
