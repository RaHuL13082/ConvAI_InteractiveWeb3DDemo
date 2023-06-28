import ChatBubblev3 from "./ChatBubblev3";
import ChatBubblev2 from "./ChatBubblev2";
import ChatBubblev1 from "./ChatBubblev1";
import ChatBubblev4 from "./ChatBubblev4";
import ChatHistory from "./ChatHistory";
import { Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";

const ChatBubble = (props) => {
  const {
    variant,
    chatHistory,
    characterId,
    npcText,
    userText,
    sessionId,
    keyPressed,
    userInput,
    setUserText,
    setNpcText,
    setEnter,
  } = props;
  const [pos, setPos] = useState([-8.7, -3, 3]);
  const [session, setSession] = useState(-1);
  const [history, setHistory] = useState(1);
  const [messages, setMessages] = useState([]);
  const [characterID, setCharacterID] = useState(characterId);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const showHistory = () => {
    setHistory(!history);
  };

  const ResetHistory = () => {
    const storedData = localStorage.getItem("messages");
    if (storedData) {
      // Parse the retrieved data from JSON format
      const parsedData = JSON.parse(storedData);
      // Update the messages for the current character ID in the stored data
      parsedData[characterId] = {
        sessionID: -1,
        message: [],
      };
      // Update the stored data in localStorage
      localStorage.setItem("messages", JSON.stringify(parsedData));
    }
    setMessages([]);
    setUserText("");
    setNpcText("");
  };

  const handleRedirect = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Retrieve stored data from localStorage
    const storedData = localStorage.getItem("messages");

    if (characterID) {
      if (storedData) {
        // Parse the retrieved data from JSON format
        const parsedData = JSON.parse(storedData);

        const characterIDs = Object.keys(parsedData);

        // Check if character ID matches the stored character ID
        if (characterIDs.includes(characterID)) {
          // Retrieve the sessionID for the current character ID
          const parsedSessionID = parsedData[characterID].sessionID;
          if (parsedSessionID) {
            // Update the sessionID state
            setSession(parsedSessionID);
          }

          // Retrieve the messages for the current character ID
          const parsedMessage = parsedData[characterID].message;
          if (parsedMessage) {
            const storedMessages = JSON.parse(parsedMessage);

            // Update the messages state
            setMessages(storedMessages);
          }
        } else {
          // No stored messages for the current character ID
          setSession("-1");
          setMessages([]);
        }
      } else {
        // No stored data
        setSession("-1");
        setMessages([]);
      }
    }
  }, [characterID]);

  useEffect(() => {
    if (sessionId) {
      setSession(sessionId);
    }
    if (characterID && messages) {
      // console.log("M", messages);
      const messagesJSON = JSON.stringify(messages);
      const storedData = localStorage.getItem("messages");

      if (storedData) {
        // Parse the retrieved data from JSON format
        const parsedData = JSON.parse(storedData);

        // Update the messages for the current character ID in the stored data
        parsedData[characterID] = {
          sessionID: session,
          message: messagesJSON,
        };
        // Update the stored data in localStorage
        localStorage.setItem("messages", JSON.stringify(parsedData));
      } else {
        // No stored data, create a new entry for the current character ID
        const messagesData = {
          [characterID]: {
            sessionID: session,
            message: messagesJSON,
          },
        };
        localStorage.setItem("messages", JSON.stringify(messagesData));
      }
    }
  }, [characterID, messages, session]);

  // Stores User message
  useEffect(() => {
    const newMessage = {
      sender: "user",
      content: userText,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, [userText]);

  // Stores Npc's message
  useEffect(() => {
    const newMessage = {
      sender: "npc",
      content: npcText,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, [npcText]);

  return (
    <>
      <Html position={[-8.45, 4.49, 3]}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "10px",
              width: "2.5vw",
              height: "2.5vw",
              color: "white",
              display: "flex",
              cursor: "pointer",
              marginBottom: "10px",
              marginRight: "10px",
            }}
            onClick={handleRedirect}
          >
            <img
              style={{
                position: "absolute",
                left: "0.5vw",
                top: "0.5vw",
                cursor: "pointer",
              }}
              src="redirect.png"
              height="25vh"
              width="25vw"
            ></img>
          </div>
          <div
            style={{
              backgroundColor: isHovered
                ? "rgba(0, 0, 0, 1)"
                : "rgba(0, 0, 0, 0.7)",
              borderRadius: "10px",
              width: "8vw",
              height: "2.5vw",
              color: "white",
              display: "flex",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={ResetHistory}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "0.8vw",
              }}
            >
              <img src="reset.png" height="20vw" width="20vw"></img>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "7px",
                marginRight: "0.5vw",
                fontWeight: "bold",
              }}
            >
              <p style={{ fontSize: "0.78vw" }}>Reset Session</p>
            </div>
          </div>
        </div>
        {chatHistory === "Show" && (variant === 3 || variant === 1) && (
          <ChatHistory
            history={history}
            messages={messages}
            showHistory={showHistory}
          ></ChatHistory>
        )}
      </Html>

      <Html position={pos}>
        {variant === 1 ? (
          <ChatBubblev1
            npcText={npcText}
            userText={userText}
            setPos={setPos}
            messages={messages}
            keyPressed={keyPressed}
          ></ChatBubblev1>
        ) : variant === 2 ? (
          <ChatBubblev2
            chatHistory={chatHistory}
            npcText={npcText}
            userText={userText}
            setPos={setPos}
            messages={messages}
            userInput={userInput}
            keyPressed={keyPressed}
            setEnter={setEnter}
          ></ChatBubblev2>
        ) : variant === 3 ? (
          <ChatBubblev3
            npcText={npcText}
            userText={userText}
            setPos={setPos}
            messages={messages}
            keyPressed={keyPressed}
          ></ChatBubblev3>
        ) : (
          <ChatBubblev4
            chatHistory={chatHistory}
            npcText={npcText}
            userText={userText}
            setPos={setPos}
            messages={messages}
            keyPressed={keyPressed}
            userInput={userInput}
            setEnter={setEnter}
          ></ChatBubblev4>
        )}
      </Html>
    </>
  );
};

export default ChatBubble;
