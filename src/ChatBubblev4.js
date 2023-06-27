import "./index.css";
import { useRef, useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import ChatHistory from "./ChatHistory";
const ChatBubblev4 = (props) => {
  var {
    userText,
    npcText,
    setPos,
    messages,
    chatHistory,
    keyPressed,
    setEnter,
    userInput,
  } = props;
  const containerRef = useRef(null);
  const [value, setValue] = useState("");
  useEffect(() => {
    setPos([-8.7, 3.8, 2.5]);
  }, []);
  useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [npcText]);

  const handleChange = (e) => {
    e.stopPropagation();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userInput(value);
    setEnter(1);
    setValue("");
  };
  return (
    <section
      className="container"
      style={{
        width: "32vw",
        height: "40vw",
        borderRadius: "10px",
        background: "rgba(0, 0, 0, 0.7)",
      }}
    >
      {chatHistory === "Show" ? (
        <div
          className="container-chat1"
          ref={containerRef}
          style={{
            width: "100%",
            height: "90%",
            overflow: "auto",
            marginBottom: "25px",
            marginTop: "10px",
            textAlign: "left",
          }}
        >
          {messages.map((message, idx) => {
            const isUserMessage = message.sender === "user";
            const nextMessage = messages[idx + 1];
            const isNextMessageUser =
              !nextMessage || nextMessage.sender === "user";
            const isNextMessageNpc =
              !nextMessage || nextMessage.sender === "npc";

            const messageStyle = {
              color: "#FFFFFF",
              paddingLeft: "15px",
              // marginBottom: isNextMessageUser ? "0px" : 0,
            };

            return (
              <section key={idx}>
                {message.sender === "user" && isNextMessageNpc
                  ? message.content && (
                      <div
                        style={{
                          display: "flex",
                          marginBottom: "-12px",
                          marginTop: "-10px",
                        }}
                      >
                        <p
                          style={{
                            color: "rgba(243,167,158,255)",
                            paddingLeft: "20px",
                            marginRight: "-10px",
                            fontWeight: "bold",
                          }}
                        >
                          User:
                        </p>
                        <p style={messageStyle}>{message.content}</p>
                      </div>
                    )
                  : message.sender === "npc" && isNextMessageUser
                  ? message.content && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "15px",
                          marginLeft: "20px",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              color: "rgba(127,210,118,255)",
                              marginRight: "-10px",
                              fontWeight: "bold",
                            }}
                          >
                            Npc:
                          </span>
                          <span style={messageStyle}>{message.content}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            marginLeft: "7px",
                            marginRight: "20px",
                          }}
                        >
                          <img
                            style={{ paddingRight: "10px" }}
                            src="Thumbsup_outline.png"
                            alt=""
                            height="17px"
                          ></img>
                          <img
                            src="Thumbsdownoutline.png"
                            alt=""
                            height="17px"
                          ></img>
                        </div>
                      </div>
                    )
                  : ""}
              </section>
            );
          })}
        </div>
      ) : (
        <div
          className="container-chat1"
          ref={containerRef}
          style={{
            width: "100%",
            height: "90%",
            overflow: "auto",
            marginBottom: "25px",
            marginTop: "10px",
            textAlign: "left",
          }}
        >
          {userText && (
            <div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "-12px",
                  marginTop: "10px",
                }}
              >
                <p
                  style={{
                    color: "rgba(243,167,158,255)",
                    paddingLeft: "20px",
                    marginRight: "-10px",
                    fontWeight: "bold",
                  }}
                >
                  User:
                </p>
                <p style={{ color: "#FFFFFF", paddingLeft: "15px" }}>
                  {userText}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                  marginLeft: "20px",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "rgba(127,210,118,255)",
                      marginRight: "-10px",
                      fontWeight: "bold",
                    }}
                  >
                    Npc:
                  </span>
                  <span style={{ color: "#FFFFFF", paddingLeft: "15px" }}>
                    {npcText}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "7px",
                    marginRight: "20px",
                  }}
                >
                  <img
                    style={{ paddingRight: "10px" }}
                    src="Thumbsup_outline.png"
                    alt=""
                    height="17px"
                  ></img>
                  <img src="Thumbsdownoutline.png" alt="" height="17px"></img>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div
        className="container-textBox"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {keyPressed && (
          <div className="icon" style={{ marginBottom: "20px" }}>
            <span className="span-prop" />
            <span className="span-prop" />
            <span className="span-prop" />
          </div>
        )}
        {!keyPressed && (
          <form onSubmit={handleSubmit}>
            <input
              className="placeholder1"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.01)",
                borderWidth: "0px",
                width: "300px",
                color: "white",
                marginLeft: "20px",
              }}
              onChange={handleChange}
              value={value}
              placeholder="Press [Space] to talk or type your response here"
              type="text"
            />
          </form>
        )}

        <div
          className="logo"
          style={{
            alignSelf: "end",
            marginRight: "20px",
            marginBottom: "15px",
          }}
        >
          <img src="ConvaiLogo.png" height="25px" width="80px" alt=""></img>
        </div>
      </div>
    </section>
  );
};

export default ChatBubblev4;
