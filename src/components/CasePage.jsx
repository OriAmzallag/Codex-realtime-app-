import React, { useState, useEffect } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"; // Import withRouter
import { Skeleton, Box } from '@mui/material';


const CasePage = ({ caseName, title }) => {
  const [editorValue, setEditorValue] = useState("");
  const [isReadOnly, setReadOnly] = useState(false);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    // Function to fetch data from db.
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${caseName}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.text();
        setEditorValue(data);

        // Set loading to false after data is fetched with delay.
        setTimeout(() => {
          setLoading(false); 
        },500);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    
    fetchData();

    // Connection to the socket
    const socket = io.connect(process.env.REACT_APP_BACKEND_URL);
    setSocket(socket);

    socket.emit("join room" , caseName);

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

  }, [caseName]); // Empty dependency array to run the effect only once

  const handleChange = (editor, data, value,) => {
     if (!isReadOnly) {
      // Emit the updated code to the server
     socket.emit("text change", value, caseName);
     }
  };

  return (
    <>
      <h1>{title}</h1>
      <Box display="flex" flexDirection="column" alignItems="center">
        {loading ? (
          <Skeleton width="20%" height={30} sx={{ bgcolor: 'grey.800' }} />
        ) : (
          <p className="role">{isReadOnly ? "Mentor" : "Student"}</p>
        )}
      </Box>
      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            sx={{
              bgcolor: 'grey.800',
              '&::before': {
                bgcolor: 'grey.700',
              },
              '&::after': {
                bgcolor: 'grey.900',
              },
            }}
          />
          <Skeleton width="60%" height={30} sx={{ bgcolor: 'grey.800' }} />
        </Box>
      ) : (
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
          <span className="message">
            {isReadOnly
              ? "Welcome Mentor! You are in read-only mode."
              : "Welcome Student! You can modify the code above."}
          </span>
        </div>
      )}
      <button className="homeClick" onClick={() => navigate(-1)}>Homepage</button>
    </>
  );
};

export default CasePage;