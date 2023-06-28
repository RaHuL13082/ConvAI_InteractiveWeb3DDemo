import "./index.css";
import { useEffect, useState } from "react";

const ChatBubblev3 = (props) => {
  var { userText, npcText, setPos, keyPressed } = props;
  const [feedback, setFeedback] = useState(0);
  //Sets the position of chatUI on the canvas
  useEffect(() => {
    setPos([-9.4, -3.35, 2.5]);
  }, []);

  const speaking = {
    marginRight: "20px",
    borderColor: "rgba(219,168,66,255)",
    borderStyle: "solid",
    borderWidth: "3px",
    borderRadius: "100%",
  };
  return (
    <section
      className="container"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "92vw",
        height: "50px",
        borderRadius: "10px",
        background: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <div style={{ marginLeft: "20px", alignSelf: "center" }}>
        <img src="ConvaiLogo.png" height="30px" width="100px" alt=""></img>
      </div>
      <div className="container-chat" style={{ textAlign: "center" }}>
        {userText === "" ? (
          <p
            style={{
              maxHeight: "300px",
              width: "100%",
              color: "rgba(219,168,66,255)",
              marginTop: "13px",
              marginLeft: "15px",
              marginRight: "15px",
            }}
          >
            Press [Space] to talk
          </p>
        ) : // <form style={{ width: "100%" }}>
        //   <input
        //     className="placeholder2"
        //     style={{
        //       backgroundColor: "rgba(0, 0, 0, 0.01)",
        //       borderWidth: "0px",
        //       width: "90%",
        //       color: "white",
        //       // marginLeft: "20px",
        //       marginTop: "17px",
        //       // borderStyle: "solid",
        //       // borderWidth: "2px",
        //       // borderColor: "red",
        //     }}
        //     placeholder="Press [Space] to talk or type your responses here"
        //     type="text"
        //   />
        // </form>
        npcText ? (
          <p
            style={{
              maxHeight: "38px",
              width: "100%",
              color: "#39FF14",
              //   paddingLeft: "15px",
              lineHeight: "2",
              marginTop: "8px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            {npcText}
          </p>
        ) : (
          <p
            style={{
              maxHeight: "300px",
              width: "90%",
              color: "#FFFFFF",
              //   paddingLeft: "15px",
              marginTop: "17px",
            }}
          >
            {userText}
          </p>
        )}
      </div>
      {npcText === "" ? (
        keyPressed ? (
          <div
            className="icon"
            style={{ marginRight: "20px", marginTop: "19px" }}
          >
            <span className="span-prop" />
            <span className="span-prop" />
            <span className="span-prop" />
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                marginTop: "14px",
                marginLeft: "15px",
              }}
            >
              <img
                style={keyPressed ? speaking : { marginRight: "20px" }}
                src="mic.png"
                alt=""
                height="20px"
              ></img>
            </div>
          </div>
        )
      ) : (
        <div
          style={{
            display: "flex",
            marginTop: "14px",
            paddingRight: "20px",
            marginLeft: "10px",
          }}
        >
          <img
            style={{ paddingRight: "10px" }}
            src={feedback === 1 ? "Thumbsup_fill.png" : "Thumbsup_outline.png"}
            alt=""
            height="20px"
            onClick={
              feedback === 1 ? () => setFeedback(0) : () => setFeedback(1)
            }
          ></img>
          <img
            src={
              feedback === 2 ? "Thumbsdown_fill.png" : "Thumbsdownoutline.png"
            }
            alt=""
            height="20px"
            onClick={
              feedback === 2 ? () => setFeedback(0) : () => setFeedback(2)
            }
          ></img>
        </div>
      )}
    </section>
  );
};

export default ChatBubblev3;
