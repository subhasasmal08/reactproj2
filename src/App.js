import "./App.css";
import { useState } from "react";
import youtube from "../src/assets/images/yt.png";
import insta from "../src/assets/images/ig.jpeg";
import fb from "../src/assets/images/fb.png";
import visible from "../src/assets/images/visible.png";
import unvisible from "../src/assets/images/unvisible.png";
import axios from "axios";

function App() {
  const [Visibility, setVisibility] = useState(false);
  const [Visiblee, setVisiblee] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [country, setcountry] = useState("");
  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const [isFirstNameEmpty, setisFirstNameEmpty] = useState(false);
  const [isCountryEmpty, setisCountryEmpty] = useState(false);
  const [isEmailEmpty, setisEmailEmpty] = useState(false);
  const [isNewPasswordEmpty, setisNewPasswordEmpty] = useState(false);
  const [isConfirmPasswordEmpty, setisConfirmPasswordEmpty] = useState(false);
  const [isPasswordLengthEmpty, setisPasswordLengthEmpty] = useState(false);
  const [isPasswordSame, setisPasswordSame] = useState(false);
  const [userExists, setuserExists] = useState(false);

  const checkEmpty = (e) => {
    if (firstName === "") {
      // setisFirstNameEmpty(true);
      document.getElementById("firstname").style.border = "1px solid red";
      // document.getElementById("firstname").classList.add("fnameempty")
    }

    if (country === "") {
      setisCountryEmpty(true);
    }
    if (email === "") {
      setisEmailEmpty(true);
    }
    if (newpassword === "") {
      setisNewPasswordEmpty(true);
    }
    if (confirmpassword === "") {
      setisConfirmPasswordEmpty(true);
      return;
    }
    if (newpassword.length < 8) {
      setisPasswordLengthEmpty(true);
      return;
    }
    if (newpassword !== confirmpassword) {
      setisPasswordSame(true);
      return;
    }
   
    
    if (
      firstName !== "" &&
      country !== "" &&
      email !== "" &&
      newpassword !== ""
    ) {
      postRegistrationData();
    }
  };

  const postRegistrationData = () => {
    axios
      .post(
        // `http://192.168.1.7:8000/api/v1/user/create?username=${email}&password=${newpassword}`,
        `http://192.168.1.7:8000/api/v1/user/create`,
        {
          username: email,
          fullname: firstName,
          password: confirmpassword,
          email: email,
        },
        {
          headers: {
            username: email,
            password: confirmpassword,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) =>  {
        console.log(error.response.status)
        if(error.response.status === 409){
          setuserExists(true)
        }
      } );
  };

  return (
    <div className="container">
      {console.log(firstName)}
      <div className="subcontainer">
        <div className="content">
          <div className="content1">
            <h2 className="lets">Let's get started</h2>
            <p className="exp">
              Log in to your account so you can continue using our customer
              experience.
            </p>
            <div className="content1a">
              <p className="login">Login</p>
              <p className="register">Register</p>
            </div>
          </div>
          <div className="content2">
            <div className="content2a">
              <div className="fullname">
                <p className="pfullname">Full Name</p>
                <input
                  type="text"
                  className={
                    isFirstNameEmpty ? "inputfname empty" : "inputfname"
                  }
                  placeholder="First Name"
                  value={firstName}
                  id="firstname"
                  onChange={(e) => {
                    setfirstName(e.target.value);
                  }}
                  onFocus={() => {
                    document.getElementById("firstname").style.border = "none";
                    //setisFirstNameEmpty(false);
                    document
                      .getElementById("firstname")
                      .classList.remove("fnameempty");
                  }}
                />
              </div>

              <div className="country">
                <p className="pcountry">Country</p>
                <label for="choosecountry"></label>
                <select
                  name="choosecountry"
                  id="choosecountry"
                  className={
                    isCountryEmpty ? "inputcountry empty" : "inputcountry"
                  }
                  value={country}
                  onChange={(e) => {
                    setcountry(e.target.value);
                  }}
                  onFocus={() => {
                    setisCountryEmpty(false);
                  }}
                >
                  <option value="" disabled selected hidden>
                    Choose Country{" "}
                  </option>
                  <option value="India">India</option>
                  <option value="South Africa">South Africa</option>
                  <option value="USA">USA</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
            <div className="content2b">
              <div className="email">
                <p className="pemail">Email</p>
                <input
                  type="text"
                  className={isEmailEmpty ? "inputemail empty" : "inputemail"}
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  onFocus={() => setisEmailEmpty(false)}
                />
              </div>
            </div>
            <div className="content2c">
              <div className="NewPassword">
                <p className="pnewpassword">New Password</p>
                <img
                  src={Visibility ? visible : unvisible}
                  className="visible"
                  alt="visibleimg"
                  onClick={() => setVisibility(!Visibility)}
                />
                <input
                  type={Visibility ? "text" : "password"}
                  className={
                    isNewPasswordEmpty
                      ? "inputnpassword empty"
                      : "inputnpassword"
                  }
                  value={newpassword}
                  onChange={(e) => setnewpassword(e.target.value)}
                  onFocus={() => {
                    setisNewPasswordEmpty(false);
                    setisPasswordLengthEmpty(false);
                    setisPasswordSame(false);
                  }}
                />
                {isPasswordLengthEmpty && (
                  <p className="font"> 8 characters required</p>
                )}
              </div>
              <div className="ConfirmPassword">
                <p className="pconfirmpassword">Confirm Password</p>
                <img
                  src={Visiblee ? visible : unvisible}
                  className="unvisible"
                  alt="unvisibleimg"
                  onClick={() => setVisiblee(!Visiblee)}
                />
                <input
                  type={Visiblee ? "text" : "password"}
                  className={
                    isConfirmPasswordEmpty
                      ? "inputcpassword empty"
                      : "inputcpassword"
                  }
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                  onFocus={() => {
                    setisConfirmPasswordEmpty(false);
                    setisPasswordSame(false);
                  }}
                />
              </div>
            </div>
          </div>
          {console.log(country)}
          <div className="content3">
            <div className="content3a">
              <div className="content3a1">
                <p className="rememberme">Remember me</p>
                <input className="checkbox" type="checkbox" />
                <p className="forgotpassword">Forgot password?</p>
              </div>
              <div className="content3a2">
                {isPasswordSame && (
                  <p style={{ textAlign: "center" }} className="font">
                    Passwords doesn't match, please try again!
                  </p>
                )}
                {userExists && (<p style={{textAlign: "center"}} className="font"> {""}
                Username already exists</p>)}
                <button onClick={checkEmpty} className="signup" type="button">
                  SIGN UP
                </button>
              </div>
            </div>
            <div className="content3b">
              <div className="content3b1">
                <p className="followus">Follow Us</p>
                <div className="icons">
                  <a href="https://www.google.com" target="_blank">
                    <img src={youtube} className="youtube" alt="youtubeimg" />
                  </a>
                  <a href="https://www.google.com" target="_blank">
                    <img src={fb} className="fb" alt="fbimg" />
                  </a>
                  <a href="https://www.google.com" target="_blank">
                    <img src={insta} className="insta" alt="instaimg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// const initialValues = { fullname: "", email: "", country: "", newpassword:"", confirmpassword:"" };
// const [formValues, setformValues] = useState(initialValues);
// const [formErrors, setformErrors] = useState({});
// const [isSubmit, setIsSubmit] = useState(false);

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setformValues({ ...formValues, [name]: value });
// };
// const handleSubmit = (e) => {
//   e.preventDefault();
//   setformErrors(validate(formValues))
//   setIsSubmit(true);
// };

// useEffect(() => {
//   console.log(formErrors);
//   if(Object.keys(formErrors).length === 0 && isSubmit) {
//     console.log(formValues);
//   }
//   ,[formErrors]
// })
// const validate = (values) => {
//   const errors = {}
//   if (!values.fullname){
//     errors.fullname = "required";
//   }
//   if (!values.country){
//     errors.country = "required";
//   }
//   if (!values.newpassword){
//     errors.newpassword = "required";
//   }
//   if (!values.confirmpassword){
//     errors.confirmpassword = "required";
//   }
//   if (!values.email){
//     errors.email = "required";
//   }
//   return errors;
// };
