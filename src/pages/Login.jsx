import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-screen h-screen items-center flex justify-center">
      <form className="flex flex-col items-center gap-5 w-[24rem] h-[16rem] border-blue-400 border-2 rounded-lg">
        <h1 className="p-2 text-xl font-bold">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="bg-blue-200 text-center rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
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
    </div>
  );
};

export default Login;
