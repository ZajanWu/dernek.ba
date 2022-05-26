import { useState } from "react";
import { BsXCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line
import { app, ROUTE_PATHS } from "lib/constants";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuth } from "lib/contexts/AuthContext";

function Signin() {
  const [data, setData] = useState({
    email: "",
    
    password: "",
  });

  const { setUserData } = useAuth();

  const navigate = useNavigate();

  const auth = getAuth();

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const userData = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      localStorage.setItem("user_data", JSON.stringify(userData));
      setUserData(userData);
      navigate(ROUTE_PATHS.HOME);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmitLogIn = async (event) => {
    event.preventDefault();

    try {
      const userData = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      localStorage.setItem("user_data", JSON.stringify(userData));
      setUserData(userData);
      navigate(ROUTE_PATHS.HOME);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-wrap justify-center mt-20 mb-20">
      <div className="w-full max-w-sm">
        <form className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-row justify-between">
            <label className="block text-grey-700 text-sm font-bold font-mono mb-2">
              E-mail
            </label>
            <Link to={ROUTE_PATHS.HOME}>
              <BsXCircle />
            </Link>
          </div>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none       focus:shadow-outline"
            name="email"
            type="email"
            placeholder="E-Mail"
            id="email"
            onChange={handleInputs}
          />

          <label className="block text-grey-700 text-sm font-bold font-mono mt-2  mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2   px-3 text-gray-700 leading-tight focus:outline-none   focus:shadow-outline"
            name="password"
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleInputs}
          ></input>

          <div className="flex justify-between items-baseline">
            <div>
              <button
                className="bg-yellow-400  hover:bg-yellow-500  rounded  px-2 py-2 mt-5  font-semibold"
                onClick={handleSubmitLogIn}
              >
                Log in
              </button>
              <button
                className="bg-yellow-400  hover:bg-yellow-500  rounded  px-2 py-2 mt-5  font-semibold ml-2"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
            <a className="font-mono font-bold text-yellow-400" href="/">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
