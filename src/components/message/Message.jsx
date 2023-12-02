import styles from "./Message.module.css";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import classNames from "classnames";

const Message = ({ mes }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const owner = mes.senderId === currentUser.uid && styles.owner

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [mes]);


  console.log(mes)

  return (
    <div className={classNames(styles.message, owner)}>
      <div className={styles.hidden}></div>
      <div className={styles.messageInfo}>
        <img
          src={
            mes.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          className={styles.messageImg}
        />
        <p>just now</p>
      </div>
      <div className={styles.messageContent}>
        <p>{mes.text}</p>
        {mes.img && <img src={mes.img} />}
      </div>
    </div>
  );
};

export default Message;
