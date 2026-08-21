import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL;
function Signup() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => {
    toast.error(err, { position: "bottom-right" });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, { position: "bottom-right" });
  };

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
        `${API_URL}/signup`,
        { ...inputValue },
        { withCredentials: true },
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(async () => {
          window.location.href = `${DASHBOARD_URL}`;
        }, 6000);
      } else {
        if (message === "User already exists") {
          setTimeout(async () => {
            window.location.href = `${DASHBOARD_URL}`;
          }, 6000);
        }
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="container m-5">
      <div className="row text-center">
        <h3 className="mt-5">Open a free demat and trading account online</h3>
        <p className="text-muted fs-5 mt-3">
          Start investing brokerage free and join a community of 1.6+ crore
          investors and traders
        </p>
      </div>

      <div className="form_container">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row m-5">
            <h2 className="mb-4">Signup now</h2>
            <div className="col-4">
              <label htmlFor="email" className="form-label">
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
              <div className="invalid-feedback">please enter a valid email</div>
              <div id="emailHelpBlock" className="form-text">
                Your email must be 8 characters long,must contain one capital
                letters, one small letter,one numbers, and one special
                characters.
              </div>
            </div>

            <div className="col-4">
              <label htmlFor="username" className="form-label">
                Username :
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                className="form-control"
                pattern="^(?=.{6,15}$)[A-Za-z]+(?: [A-Za-z]+)*$"
                minLength="6"
                maxLength="15"
                placeholder="Enter your username"
                onChange={handleOnChange}
                aria-describedby="usernameHelpBlock"
                required
              />
              <div className="valid-feedback"> Username is right</div>
              <div className="invalid-feedback">
                Username only have albhabet and space and minimum 6 and maximum
                15 characters
              </div>
              <div id="usernameHelpBlock" className="form-text">
                Your username must be 6-12 characters long, contain one capital
                letter , small letters and must not contain numbers, spaces,
                special characters, or emoji.
              </div>
            </div>

            <div className="col-4">
              <label htmlFor="password" className="form-label">
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
                character,1 special character,1 number and minimum 8 character
              </div>
              <div id="passwordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters
                ,special characters and numbers, and must not contain spaces, or
                emoji.
              </div>
            </div>
          </div>

          <div className="col text-center">
            <button
              className="btn btn-primary btn-lg border border-0 text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
