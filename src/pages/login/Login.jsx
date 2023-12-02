import { useState } from "react";
import styles from "./Login.module.css";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import Face5Icon from "@mui/icons-material/Face5";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = login.email;
    const password = login.password;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch (error) {
      setError(true);
    }

    setLogin({
      email: "",
      password: "",
    });
  };

  return (
    <div className={classNames(styles.logForm, "form")}>
      <p className="main-name">
        MooD<b>Y</b>
      </p>
      {error && <p style={{ color: "red" }}>Something went wrong!</p>}
      <form onSubmit={handleSubmit}>
        <Box
          component="section"
          sx={{ width: 300, p: 3, border: "1px solid #55A5DF" }}
        >
          <p>Login</p>
          <div>
            <TextField
              required
              type="email"
              label="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Face5Icon />
                  </InputAdornment>
                ),
              }}
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>
          <div>
            <TextField
              required
              type="password"
              label="Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </div>
          <div>
            <Button type="submit" variant="outlined">
              Login
            </Button>
            <br />
            <Button variant="text" color="info">
              <Link to="/register">create account</Link>
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Login;
