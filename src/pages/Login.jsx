import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MeContext } from "../contexts/MeContext";

const Login = () => {
  const navigate = useNavigate();
  const me = useContext(MeContext);

  useEffect(() => {
    if (me.isLoggedIn) {
      navigate("/");
    }
  }, [me.isLoggedIn]);

  return (
    <div className="w-screen h-screen items-center flex justify-center flex-col">
      <form
        action="http://localhost:8000/login/password"
        method="post"
        className="flex flex-col items-center gap-5 w-[24rem] h-[16rem] border-blue-400 border-2 rounded-lg"
      >
        <h1 className="p-2 text-xl font-bold">Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
          autoFocus
          required
          className="bg-blue-200 text-center rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          className="bg-blue-200 text-center rounded-md"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500">
          Log In
        </button>
        <h1>
          Don't have an account ?
          <Link to={"/register"} className="ml-1">
            <span className="font-bold cursor-pointer">Register here</span>
          </Link>
        </h1>
      </form>
      <div className="flex flex-col items-center gap-2 mt-5">
        <div>
          <a href="http://localhost:8000/login/federated/google">
            <button>Sign in with Google</button>
          </a>
        </div>
        <div>
          <a href="http://localhost:8000/login/federated/facebook">
            <button>Sign in with Facebook</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
