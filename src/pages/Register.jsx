import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-screen h-screen items-center flex justify-center">
      <form className="flex flex-col items-center gap-5 w-[24rem] h-[18rem] border-blue-400 border-2 rounded-lg">
        <h1 className="p-2 text-xl font-bold">Register</h1>
        <input
          type="text"
          placeholder="Username"
          className="bg-blue-200 text-center rounded-md"
        />
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
          Register
        </button>
        <h1>
          Already have an account ?
          <Link to={"/login"} className="ml-1">
            <span className="font-bold cursor-pointer">Log In</span>
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default Register;
