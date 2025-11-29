import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";


const RegisterPage = () => {
  const { createUserEP, setUser, user, updateUser } = use(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (name.length < 4) {
      setError("Name can't be less than 4 alphabet.");
      return;
    } else {
      setError("");
    }

    createUserEP(email, password)
      .then((result) => {
        // updateUser({ displayName: name, photoURL: photoUrl })
        //   .then(() => {
        //     setUser({ ...user, displayName: name, photoURL: photoUrl });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     setUser(user);
        //   });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl mx-auto mt-11">
      <div className="card-body p-11">
        <h1 className="text-3xl text-center pb-5 font-semibold">
          Register your account
        </h1>
        <form onSubmit={handleRegister} className="fieldset">
          <label className="label font-semibold text-black">Name</label>
          <input
            required
            type="text"
            className="input w-full"
            placeholder="Enter your name here"
            name="name"
          />
          {error && <p className="text-red-500 font-semibold">{error}</p>}
          <label className="label font-semibold text-black">Photo URL</label>
          <input
            required
            type="url"
            className="input w-full"
            placeholder="Enter your photo url here"
            name="photoURL"
          />
          <label className="label font-semibold text-black">Email</label>
          <input
            required
            type="email"
            className="input w-full"
            placeholder="Enter your email here"
            name="email"
          />
          <label className="label font-semibold text-black">Password</label>
          <input
            required
            type="password"
            className="input w-full"
            placeholder="Enter your password here"
            name="password"
          />
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="terms"
              required
              className="checkbox checkbox-sm"
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <Link
                to="/terms"
                className="link text-[#ff5520] hover:text-secondary font-semibold"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>
          <button type="submit" className="btn btn-neutral mt-4">
            Register
          </button>
        </form>
        <p className="py-3 mx-auto">
          Already Have An Account?{" "}
          <Link
            to="/login"
            className="link link-hover text-[#ff5520] hover:text-secondary font-bold"
          >
            Login{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
