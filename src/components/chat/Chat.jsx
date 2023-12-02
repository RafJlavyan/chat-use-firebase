import React, { useContext } from "react";
import styles from "./Chat.module.css";
import { HiVideoCamera } from "react-icons/hi2";
import { IoPersonAdd } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import Messages from "../messages/Messages";
import ChatInput from "../chatinput/ChatInput";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const {data} = useContext(ChatContext)
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>{data.user?.displayName}</span>
        <div className={styles.chatIcons}>
          <HiVideoCamera />
          <IoPersonAdd />
          <IoIosMore />
        </div>
      </div>
      <div className={styles.messages}>
        <Messages />
      </div>
        <div className={styles.chatInput}>
        <ChatInput />
        </div>
    </div>
  );
};

export default Chat;
