import React from "react";
import SideBar from "../../components/sidebar/SideBar";
import Chat from "../../components/chat/Chat";

const Home = () => {
  return (
    <div className="home">
      <div className="profile">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
