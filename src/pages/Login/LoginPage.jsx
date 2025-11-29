import React from 'react';
import { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";
import AuthContext from '../../context/AuthContext';
import { auth } from '../../firebase/firebase.config';

const LoginPage = () => {

  const { signInUser, forgotPass, signInGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        // navigate(`${location.state ? location.state : "/"}`);
        navigate('/');
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const handleGoogleLogin = () => {
    signInGoogle()
      .then((result) => {
        navigate(location.state || "/");
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL
        };
        //create user in db
        fetch("http://localhost:3333/users", {
          method: "POST",
          headers:{
            'content-type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        .then(res =>res.json())
        .then(data =>{
          console.log('data after user save', data);
        })
      })
      .catch((error) => setError(error.message));
  };

  const handleForgotPass = () => {
    const emailFromRef = emailRef.current.value;
    if (emailFromRef) {
      forgotPass(emailFromRef)
        .then((result) => {
          toast.success("A password reset email has sent to your email.");
        })
        .catch((error) => {
          setError(error?.message);
        });
    }else{
      return setError("Must need an email")
    }
  };
  return (
    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl mx-auto mt-22">
      <div className="card-body p-11">
        <h1 className="text-3xl text-center pb-5 font-semibold">
          Login your account
        </h1>
        <form onSubmit={handleSubmit} className="fieldset">
          <label className="label font-semibold text-black">Email</label>
          <input
            required
            type="email"
            className="input w-full"
            placeholder="Enter your email here"
            name="email"
            ref={emailRef}
          />
          <label className="label font-semibold text-black">Password</label>
          <input
            required
            type="password"
            className="input w-full"
            placeholder="Enter your password here"
            name="password"
          />
          <div>
            <a
              onClick={handleForgotPass}
              className="link link-hover hover:text-secondary"
            >
              Forgot password?
            </a>
          </div>
          {error && <p className="text-red-500 font-semibold mt-1">{error}</p>}
          <button type="submit" className="btn btn-neutral mt-4">
            Login
          </button>
        </form>
        <h1 className="font-semibold text-lg text-center">Or,</h1>
        <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
        <p className="pt-2 mx-auto">
          Don't Have An Account?{" "}
          <Link
            to="/register"
            className="link link-hover text-[#ff5520] hover:text-secondary font-bold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;