const ChatHistory = (props) => {
  var { history, showHistory, messages } = props;
  return (
    <section>
      <div
        className={history ? "chat-Historyo" : "chat-Historyc"}
        onClick={showHistory}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {history ? (
            <img
              style={{ paddingRight: "20px", marginTop: "1.5vh" }}
              src="ConvaiLogo.png"
              height="30px"
              width="100px"
              alt=""
            ></img>
          ) : (
            ""
          )}
        </div>
        <img
          style={{
            position: "absolute",
            left: "0.85vw",
            top: "1.5vh",
            cursor: "pointer",
          }}
          src={history ? "/Collapsein.png" : "/Historyin.png"}
          alt=""
          height={history ? "30vw" : "34vw"}
          onClick={showHistory}
        ></img>
        <div
          className="container-chat1"
          style={{
            width: "95%",
            height: "80%",
            overflow: "auto",
            marginBottom: "25px",
            marginTop: "15px",
            marginLeft: "20px",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((message, idx) => {
            //   console.log("Kha h", message);

            const isUserMessage = message.sender === "user";
            const nextMessage = messages[idx + 1];
            const isNextMessageUser =
              !nextMessage || nextMessage.sender === "user";
            const isNextMessageNpc =
              !nextMessage || nextMessage.sender === "npc";

            const messageStyle = {
              color: "#FFFFFF",
              paddingLeft: "10px",
              // marginBottom: isNextMessageUser ? "0px" : 0,
            };

            return (
              <section key={idx}>
                {message.sender === "user" && isNextMessageNpc && history
                  ? message.content && (
                      <div style={{ marginBottom: "2px" }}>
                        <span
                          style={{
                            color: "rgba(243,167,158,255)",
                            marginRight: "-5px",
                            fontWeight: "bold",
                          }}
                        >
                          User:
                        </span>
                        <span style={messageStyle}>{message.content}</span>
                      </div>
                    )
                  : message.sender === "npc" && isNextMessageUser && history
                  ? message.content && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "15px",
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
      </div>
    </section>
  );
};

export default ChatHistory;
