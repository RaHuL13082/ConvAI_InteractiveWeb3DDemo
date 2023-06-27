import ChatBubblev3 from "./ChatBubblev3";
import ChatBubblev2 from "./ChatBubblev2";
import ChatBubblev1 from "./ChatBubblev1";
import ChatBubblev4 from "./ChatBubblev4";
import ChatHistory from "./ChatHistory";
import { Html } from "@react-three/drei";
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
      console.log("M", messages);
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
      <Html position={[-8.3, 4.5, 3]}>
        <div
          style={{
            backgroundColor: isHovered
              ? "rgba(0, 0, 0, 1)"
              : "rgba(0, 0, 0, 0.7)",
            borderRadius: "15px",
            width: "9vw",
            height: "3vw",
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
              marginLeft: "15px",
            }}
          >
            <img src="reset.png" height="25vw" width="25vw"></img>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "10px",
              marginRight: "15px",
            }}
          >
            <p style={{ fontSize: "0.8vw" }}>Reset Session</p>
          </div>
        </div>
      </Html>
      {chatHistory === "Show" && (variant === 3 || variant === 1) && (
        <Html position={[-8.4, 3.8, 3]}>
          <ChatHistory
            history={history}
            messages={messages}
            showHistory={showHistory}
          ></ChatHistory>
        </Html>
      )}

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
