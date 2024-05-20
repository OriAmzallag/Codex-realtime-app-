import React, { useState, useEffect } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"; // Import withRouter

const FirstCase = () => {
  const [editorValue, setEditorValue] = useState("");
  const [isReadOnly, setReadOnly] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Function to fetch data from db.
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/FirstCase");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.text();
        setEditorValue(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    
    fetchData();

    // Connection to the socket
    const socket = io.connect("http://localhost:3001");
    setSocket(socket);

    // Changing the code in realtime
    socket.on("recieve change", (msg) => {
      setEditorValue(msg);
    });

    socket.on("user status", (role) => {
      const readOnly = role === "mentor";
      setReadOnly(readOnly);
    });

    // Cleanup function
    return () => {
      socket.off("recieve change");
      socket.off("user status");
      socket.disconnect();
    };

  }, []); // Empty dependency array to run the effect only once

  const handleChange = (editor, data, value) => {
     if (!isReadOnly) {
      // Emit the updated code to the server
     socket.emit("text change", value);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <h1>Async Case: Incorrect Async Function Usage</h1>
      <div>
        <CodeMirror
          value={editorValue}
          options={{
            lineNumbers: true,
            mode: "javascript",
            theme: "default",
            readOnly: isReadOnly,
          }}
          onChange={handleChange}
        />
      </div>
      <span className="message">{isReadOnly ? "Welcome Mentor! You are in read-only mode." : "Welcome Student! You can modify the code above."}</span>
      <button className="homeClick" onClick={() => navigate(-1)}>Homepage</button>
    </>
  );
};

export default FirstCase;
