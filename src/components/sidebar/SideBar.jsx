import React, { useContext } from "react";
import styles from "./SideBar.module.css";
import Search from "../search/Search";
import { signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { auth } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";

const SideBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <p className="main-name">
          MooD<b>Y</b>
        </p>
        <div className={styles.user}>
          <p className={styles.username}>{currentUser.displayName}</p>
          <img
            src={currentUser.photoURL}
            className={styles.userLogo}
          />
        </div>
      </div>
      <div className={styles.chatUsers}>
        <Search />
      </div>
      <Button color="inherit" variant="contained" onClick={() => signOut(auth)}>
        Log out
      </Button>
    </div>
  );
};

export default SideBar;
