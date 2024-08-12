import {Button} from 'antd';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import {getUser } from '../../functions/cookieHandler';
import axios from 'axios';
import {useCartStore} from '../../stores/useCartStore'
import sleep from '../../utils/sleep'





 

function OrderButton() {
  const userCookies = getUser();
    const globalProducts = useCartStore((state) => state.products);
    const navigate = useNavigate();
    const actions = useCartStore(state => state.actions);
    const [isLoading, setIsLoading] = useState(false)
  return (
    <Button
    loading={isLoading? true: false}
    style={{width: "100px"}}
    disabled= {userCookies.rol === "admin"}
      type="primary"
      size="large"
      onClick={async () => {
        setIsLoading(true)
          const userId = getUser().id;
          
      
        const products = globalProducts.map((product) => product.title).join(", ");
      
        const data = {
          userId,
          products,
        };
        try {
          const userData = localStorage.getItem("user")
         
          const user = JSON.parse(userData)
          console.log(user)
          const response = await axios.post("http://localhost:3000/api/orders", data ,{
            // Datos que deseas enviar
           headers:{
            "Authorization":"bearer " + user.token
           }
          });
          
          if(response.status === 200) {
            await sleep(3000)
            setIsLoading(false)
            actions.resetCart();
              navigate('/success')
          }
      
          return response.status;
        } catch (error) {
          console.error(error);

        }
      
        
      }

      }
    >
      Confirm
    </Button>
  );
}

export default OrderButton