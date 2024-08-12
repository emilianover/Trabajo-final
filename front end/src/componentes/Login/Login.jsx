import { useState } from "react";
import axios from "axios";
import sleep from "../../utils/sleep";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useLoginStore } from "../../stores/useLoginStore";
import { useAdminStore } from "../../stores/useAdminStore";
import { createCookies } from "../../functions/cookieHandler";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const { toggleLoginShow } = useLoginStore();
  const navigate = useNavigate();
  const { setIsAdminLogged } = useAdminStore();

  return (
    <>
      <div className="login">
        <button className="close_button" onClick={() => toggleLoginShow()}>
          <CloseOutlined />{" "}
        </button>
        <label htmlFor="email">Email <span className="span">{isUserNotFound ? '*User not Found' : ""}</span></label>
        <input
          value={email}
          type="text"
          id="email"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="password">Password <span className="span">{isInvalidPassword ? '*Invalid Password' : ""}</span> </label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="primary"
          loading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            const data = {
              email,
              password,
            };
            try {
              const userData = localStorage.getItem("user")
              const response = await axios.post("http://localhost:3000/api/users/login", data);
              console.log('Response:', response); // Verifica la respuesta completa
              if (response.status === 200) {
                const { id, adress, tel, email, name, lastName, rol } = response.data.data.userData;
                const token = response.data.data.token;
                localStorage.setItem("user", JSON.stringify({
                  id,
                  adress,
                  tel,
                  email,
                  name,
                  lastName,
                  rol,
                  token
                }))
                
                await sleep(3000);
                setIsInvalidPassword(false);
                setIsUserNotFound(false);
                createCookies(id, adress, tel, email, name, lastName, rol);
                if (rol !== 'admin') {
                  toggleLoginShow();
                } else {
                  setIsAdminLogged(true);
                  navigate("/admin");
                  toggleLoginShow();
                }
              }
            } catch (error) {
              console.error('Error en la solicitud:', error);
              if (error.response) {
                // La respuesta del servidor fue recibida pero con un error
                if (error.response.status === 401) {
                  setIsInvalidPassword(true);
                  setIsUserNotFound(false);
                } else if (error.response.status === 404) {
                  setIsUserNotFound(true);
                  setIsInvalidPassword(false);
                } else {
                  console.error('Error del servidor:', error.response.status);
                }
              } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error('No se recibió respuesta del servidor:', error.request);
              } else {
                // Errores de configuración de la solicitud
                console.error('Error de configuración de la solicitud:', error.message);
              }
            }
            setIsLoading(false);
          }}
        >
          Login!
        </Button>
      </div>
    </>
  );
}

export default Login;