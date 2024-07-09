
import { useEffect, useState } from 'react';
import peek from '../../utils/peek';
import { getUser } from '../../functions/cookieHandler';
import splitProducts from '../../utils/splitProducts';

function UserDrawer () {
  const [orders, setOrders] = useState([]);
  const userCookies = getUser();

  useEffect(() => {
    fetch(peek("/api/orders"))
      .then((data) => peek(data.json()))
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, []);

  const userOrders = orders.filter(order => order.userId === userCookies.id);

  console.log(userOrders);

  return (
    <>
    <div style={{backgroundColor: "aliceblue", display: "flex", flexDirection: "column", gap: "1rem"}}>
      <h2>Record of your Orders: :</h2>
      {userOrders
      .sort((a, b) => (b.id - a.id))
      .map((item) => 
        (
          <div style = {{border: "1px solid black", padding:"20px"}} key={`key-${item.id}-${item.userId}`}>
            <h3 style={{margin: "4px"}}>Order Tracking Number: {item.id}</h3>
            <h3>List of products: </h3>
            <ul>
            {splitProducts(item.products).map((object) => (
              <li key={`${object.name} - ${object.quantity}`}>
                <p>-{object.name.slice(0, 40)}...</p> : <span style={{color: "blue"}}> x {object.quantity} Units </span>
              </li>
            ))}
            </ul>
            

          </div>
          
        )
      )}
      </div>
    </>
  );
}

export default UserDrawer;
