import React, { useRef, useState } from "react";
import styles from "./Register.module.css";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import KeyIcon from "@mui/icons-material/Key";
import Face5Icon from "@mui/icons-material/Face5";
import classNames from "classnames";
import { Link , useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate()
  const photoRef = useRef();
  const [register, setRegister] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = register.displayName;
    const email = register.email;
    const password = register.password;

    try {
      setError(false);

      const res = await createUserWithEmailAndPassword(auth, email, password);

      const file = photoRef.current.files[0];
      if (!file) {
        return;
      }

      const storageRef = ref(storage, `image/${Date.now() + file.name}`);

      uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {})


            navigate("/")
          } catch (err) {
            setError(true);
          }
        });
      });
    } catch (error) {
      setError(true);
    }

    setRegister({
      displayName: "",
      email: "",
      password: "",
      photoRef: null
    });
  };
  

  return (
    <div className={classNames(styles.regForm, "form")}>
      <p className="main-name">
        MooD<b>Y</b>
      </p>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>Something went wrong!</p>}
        <Box
          component="section"
          sx={{ width: 300, p: 3, border: "1px solid #55A5DF" }}
        >
          <p>Register</p>
          <div>
            <TextField
              required
              label="Username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonPinIcon />
                  </InputAdornment>
                ),
              }}
              value={register.displayName}
              onChange={(e) =>
                setRegister({ ...register, displayName: e.target.value })
              }
            />
          </div>
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
              value={register.email}
              onChange={(e) =>
                setRegister({ ...register, email: e.target.value })
              }
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
              value={register.password}
              onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
              }
            />
          </div>
          <div>
            <input
              style={{ display: "none" }}
              type="file"
              id="reg-upload-file"
              ref={photoRef}
            />
            <label htmlFor="reg-upload-file" style={{ cursor: "pointer" }}>
              <FaFileUpload /> upload avatar
            </label>
          </div>
          <div>
            <Button type="submit" variant="outlined">
              Register
            </Button>
            <Button variant="text" color="info">
              <Link to="/login">already have an account?</Link>
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Register;
