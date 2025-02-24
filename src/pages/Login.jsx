import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken, theme } = useContext(AppContext); // ✅ Using theme
  const navigate = useNavigate();
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "signup") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className={`container ${theme === "light" ? "light-mode" : "dark-mode"}`}>
      <form onSubmit={onSubmitHandler}>
        <div className="loginform container d-flex flex-column justify-content-center align-items-center mt-5 mb-5 border rounded-3 shadow bg-light gap-2 p-2">
          <p className="fs-4 fw-bold">{state === "signup" ? "Create Account " : "Login"}</p>
          <p>Please {state === "signup" ? "sign up" : "log in"} to book appointment</p>
          {state === "signup" && (
            <div className="w-full">
              <p>Fullname</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="rounded-2 p-1 mb-2 form-control"
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-2 p-1 mb-2 form-control"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-2 p-1 mb-2 form-control"
            />
          </div>
          <button type="submit" className="rounded-3 btn btn-primary mt-3 mb-3">
            {state === "signup" ? "Create Account " : "Login"}
          </button>
          {state === "signup" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setState("login")} className="text-primary loginformlink">
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span className="text-primary loginformlink" onClick={() => setState("signup")}>
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
