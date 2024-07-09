
import Admin from "./Admin";
import { getUser } from "../../functions/cookieHandler";
import {Result, Button} from 'antd'
import { useNavigate } from "react-router-dom";

function IsNotAdmin() {
    const navigate = useNavigate();

    const userCookies = getUser()
  return userCookies.rol === 'admin' ? <Admin /> : 
  <div style={{backgroundColor: "white"}}>
  <div className="header">
    <div className="header_logo">
      <img src="https://placekitten.com/184/84"></img>

      <h1> My E-commerce</h1>
    </div>
  </div>
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button onClick={() => navigate("/")} type="primary">Back Home</Button>}
  />
  </div>
}

export default IsNotAdmin
