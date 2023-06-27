import "./index.css";
import { useRef, useEffect } from "react";
import { Html } from "@react-three/drei";
const ChatBubblev1 = (props) => {
  var { userText, npcText, setPos, keyPressed } = props;

  useEffect(() => {
    setPos([-9.3, -2.5, 2.5]);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        // borderStyle: "solid",
        // borderWidth: "2px",
        // borderColor: "red",
      }}
    >
      <section
        className="container"
        style={{
          width: "92vw",
          height: "120px",
          borderRadius: "10px",
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          // borderStyle: "solid",
          // borderWidth: "2px",
          // borderColor: "red",
        }}
      >
        <section
          className="container-chat"
          style={{
            borderRadius: "10px",
            marginBottom: "15px",
            marginTop: "25px",
          }}
        >
          {console.log("keypressed", keyPressed)}
          {keyPressed && (
            <div className="icon">
              <span className="span-prop" />
              <span className="span-prop" />
              <span className="span-prop" />
            </div>
          )}
          {userText === "" ? (
            <form style={{ width: "100%" }}>
              <input
                className="placeholder3"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.01)",
                  borderWidth: "0px",
                  // position: "absolute",
                  width: "95%",
                  marginLeft: "20px",
                  marginTop: "30px",
                  color: "white",
                  // borderStyle: "solid",
                  // borderWidth: "2px",
                  // borderColor: "red",
                }}
                placeholder="Press [Space] to talk or type your responses here"
                type="text"
              />
            </form>
          ) : (
            <div style={{ width: "100%" }}>
              <p
                style={{
                  maxHeight: "300px",
                  width: "95%",
                  color: "#FFFFFF",
                  paddingLeft: "20px",
                  marginBottom: "-10px",
                  marginTop: "10px",
                  // borderStyle: "solid",
                  // borderWidth: "2px",
                  // borderColor: "red",
                }}
              >
                {userText}
              </p>
              <p
                style={{
                  maxHeight: "38px",
                  width: "95%",
                  color: "#39FF14",
                  paddingLeft: "20px",
                }}
              >
                {npcText}
              </p>
            </div>
          )}
          {userText === "" ? (
            ""
          ) : (
            <div
              className="item-review"
              style={{
                display: "flex",
                marginLeft: "10px",
                marginTop: "25px",
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                src="Thumbsup_outline.png"
                alt=""
                height="20px"
              ></img>
              <img src="Thumbsdownoutline.png" alt="" height="20px"></img>
            </div>
          )}
          <div
            style={{
              marginLeft: "10px",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            <img src="ConvaiLogo.png" height="30px" width="100px" alt=""></img>
          </div>
        </section>
      </section>
    </div>
  );
};

export default ChatBubblev1;
