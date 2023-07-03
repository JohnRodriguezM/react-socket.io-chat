import { useEffect, useState } from "react";
import "./css/App.css";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export const App = () => {
  const [message, setMessage] = useState<string>("");
  const [received, setReceivedMessages] = useState<string[]>([]);

  useEffect(() => {
    // the other clients are listening to the "message" event
    socket.on("message", (message: string) => {
        console.log(message);
    });

    socket.on("message", (message: string) => {
      setReceivedMessages((received) => [...received, message]);
    });
  }, []);



  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(message);
    // Send message to server
    socket.emit("message", message);
    setMessage("");
    // Receive message from server



  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          type="text"
          placeholder="Enter your message"
        />
        <button>Send</button>
      </form>

      <div className="messages">
        {received.map((message, index) => {
          return <div key={index}>{message}</div>;
        })}
      </div>

      <button
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          margin: "10px",
          padding: "10px",
          backgroundColor: "red",
          color: "white",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => {
          setReceivedMessages([]);
        }}
      >
        Clean Chat
      </button>
    </>
  );
};
