import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MeContext } from "../contexts/MeContext";

const Register = () => {
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
        action={`${import.meta.env.VITE_BE_URL}/signup`}
        method="post"
        className="flex flex-col items-center gap-5 w-[24rem] h-[18rem] border-blue-400 border-2 rounded-lg"
      >
        <h1 className="p-2 text-xl font-bold">Register</h1>
        <input
          type="text"
          name="username"
          autoComplete="username"
          autoFocus
          required
          placeholder="Username"
          className="bg-blue-200 text-center rounded-md"
        />
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="Email"
          className="bg-blue-200 text-center rounded-md"
        />
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          required
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
      {/* TODO: fix this */}
      <div className="flex flex-col items-center gap-2 mt-5">
        <div>
          <a href={`${import.meta.env.VITE_BE_URL}/login/federated/google`}>
            <button>Sign in with Google</button>
          </a>
        </div>
        <div>
          <a href={`${import.meta.env.VITE_BE_URL}/login/federated/facebook`}>
            <button>Sign in with Facebook</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
