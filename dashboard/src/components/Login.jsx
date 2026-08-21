import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3002/login",
        {
          ...inputValue,
        },
        { withCredentials: true },
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="offset-md-2 col-md-8">
          <div className="card">
            <h5 className="card-header">Log In</h5>
            <div className="card-body">
              <form
                onSubmit={handleSubmit}
                className="needs-validation"
                noValidate
              >
                <div>
                  <label htmlFor="email" className="form-label mt-1">
                    Email :
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    className="form-control"
                    pattern="^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                    minLength="8"
                    placeholder="Enter your email"
                    onChange={handleOnChange}
                    aria-describedby="emailHelpBlock"
                    required
                  />
                  <div className="valid-feedback"> Look good </div>
                  <div className="invalid-feedback">
                    please enter a valid email
                  </div>
                  <div id="emailHelpBlock" className="form-text">
                    Your email must be 8 characters long,must contain one
                    capital letters, one small letter,one numbers, and one
                    special characters.
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="form-label mt-3">
                    Password :
                  </label>

                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={password}
                    placeholder="Enter your password"
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z][A-Za-z0-9@$!%*?&]{7,}$"
                    required
                    minLength="8"
                    onChange={handleOnChange}
                    aria-describedby="passwordHelpBlock"
                  />
                  <div className="valid-feedback"> Look good </div>
                  <div className="invalid-feedback">
                    password must be have 1 uppearcase character,1 lowercase
                    character,1 special character,1 number and minimum 8
                    character
                  </div>
                  <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters
                    ,special characters and numbers, and must not contain
                    spaces, or emoji.
                  </div>
                </div>

                <div className="col text-center mt-3">
                  <button
                    className="btn btn-primary text-white mb-2 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                  <span>
                    Not have an account?{" "}
                    <Link
                      onClick={() => {
                        window.location.href = "http://localhost:5174/signup";
                      }}
                    >
                      Signup
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
