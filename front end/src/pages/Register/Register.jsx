import "./styles.css";
import Header from "../../componentes/Header/Header";
import axios from "axios";
import { useState } from "react";
import sleep from "../../utils/sleep";
import { Button } from "antd";
import { notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [adress, setAdress] = useState("");

  const [tel, setTel] = useState("");

  const [password, setPassword] = useState("");

  const [isMatchPassword, setIsMatchPassword] = useState("");
 
  const [isErrorSpan, setIsErrorSpan] = useState(false);

  const openAddNotification = (email) =>
  notification.open({
    message: "Registration Successful",
    description: email,
    placement: "bottomLeft",
    icon: <CheckOutlined style={{color: "green"}} />,
  });

  async function buttonSubmit() {
    setIsLoading(true)
    // e.preventDefault();
    const data = {
      name,
      lastName,
      email,
      adress,
      tel,
      password,
    };
    
    try {
      const response = await axios.post("api/users/register", data);
      console.log(response.status);
      if(response.status === 201) {
        await sleep(3000);
        openAddNotification(email)
      } else if (response.status === 400) {
        setIsErrorSpan(true)
      }
    } catch (error) {
      console.error(error.response.status);
      

    }
    setIsErrorSpan(false)
    
    setIsLoading(false)
  }
  return (
    <>
      <Header />
      <div className="testbox">
        <div className="form" action="">
          <div className="banner">
            <h1 className="h1">Register</h1>
          </div>
          <br />
          <fieldset>
            <legend> User Information </legend>
            <div className="item">
              <label htmlFor="name">
                Name<span className="item_span">*</span>
              </label>
              <input
                value={name}
                className="input"
                id="name"
                type="text"
                name="fname"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="item">
              <label htmlFor="lastName">
                Last Name <span className="item_span">*</span>
              </label>
              <input
                value={lastName}
                className="input"
                id="lastName"
                type="text"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="item">
              <label htmlFor="email">
                Email<span className="item_span">*</span>
              </label>
              <input
                value={email}
                className="input"
                id="email"
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="item">
              <label htmlFor="password">
                password <span className="item_span">*</span>
              </label>
              <input
                value={password}
                className="input"
                id="password"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="item">
              <label htmlFor="password-confirm">
                Confirm your Password <span className="item_span">*</span>{" "}
                <span
                  className={
                    isMatchPassword === "Ok" ? "item_span_green" : "item_span"
                  }
                >
                  {isMatchPassword}
                </span>
              </label>
              <input
                className="input"
                id="password-confirm"
                type="password"
                name="password-confirm"
                onChange={(e) =>
                  e.target.value === password
                    ? setIsMatchPassword("Ok")
                    : setIsMatchPassword("Password does not match")
                }
              />
            </div>

            <div className="item">
              <label htmlFor="adress">
                Adress <span className="item_span">*</span>
              </label>
              <input
                value={adress}
                className="input"
                id="adress"
                type="text"
                name="adress"
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>
            <div className="item">
              <label htmlFor="tel">
                Telephone Number <span className="item_span">*</span>
              </label>
              <input
                value={tel}
                className="input"
                id="tel"
                type="number"
                name="tel"
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
            {isErrorSpan ? <span>Please complete all required fields</span> : ""}
            <div className="btn-block">
              <Button loading={isLoading ? true : false} className="button" type="submit" onClick={buttonSubmit}> Submit </Button>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default Register;
