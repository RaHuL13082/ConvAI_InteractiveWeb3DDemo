import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Html } from "@react-three/drei";
import { Model } from "./Explorer";
import { ConvaiClient } from "convai-web-sdk";
import { SETTINGS } from "./constants";
import ChatBubble from "./ChatBubble";
import { Leva, useControls, button } from "leva";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
export default function Demo() {
  const [userText, setUserText] = useState("");
  const finalizedUserText = useRef();
  const [npcText, setNpcText] = useState("");
  const [isTalking, setIsTalking] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["convai-user-info"]);
  const [avatar, setAvatar] = useState("");
  const [enter, setEnter] = useState(0);
  const npcTextRef = useRef();

  const { id } = useParams();

  const convaiClient = useRef(null);

  useEffect(() => {
    convaiClient.current = new ConvaiClient({
      apiKey: cookies.CONVAI_API_KEY,
      characterId: id,
      enableAudio: true, // use false for text only.
    });

    convaiClient.current.setResponseCallback((response) => {
      if (response.hasUserQuery()) {
        var transcript = response.getUserQuery();
        var isFinal = transcript.getIsFinal();
        if (isFinal) {
          finalizedUserText.current += " " + transcript.getTextData();
          transcript = "";
        }
        if (transcript) {
          setUserText(finalizedUserText.current + transcript.getTextData());
        } else {
          setUserText(finalizedUserText.current);
        }
      }
      if (response.hasAudioResponse()) {
        var audioResponse = response?.getAudioResponse();
        npcTextRef.current += " " + audioResponse.getTextData();
        setNpcText(npcTextRef.current);
      }
    });

    convaiClient.current.onAudioPlay(() => {
      setIsTalking(true);
    });

    convaiClient.current.onAudioStop(() => {
      setIsTalking(false);
    });

    const fetchData = async () => {
      try {
        const url = "https://api.convai.com/character/get";
        const payload = {
          charID: id,
        };
        const headers = {
          "CONVAI-API-KEY": cookies.CONVAI_API_KEY,
          "Content-Type": "application/json",
        };

        const response = await axios.post(url, payload, { headers });
        if (avatar !== response.data.model_details.modelLink) {
          setAvatar(response.data.model_details.modelLink);
        }
        console.log("Avatar:", avatar);
        console.log("Character Details:", response.data);
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchData();

    console.log("convai", convaiClient.current);
    console.log("convai-api-key:", cookies.CONVAI_API_KEY);
    console.log("Session Id:", convaiClient.current.sessionId);
  }, []);

  const userInput = (text) => {
    setUserText(text);
    console.log("Ut: ", userText);
  };

  const [keyPressed, setKeyPressed] = useState(false);

  function handleSpacebarPress(event) {
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      document.activeElement.isContentEditable
    ) {
      // If the user is focused on an input field, return without activating the mic
      return;
    }
    if (event.keyCode === 32 && !keyPressed) {
      event.stopPropagation();
      event.preventDefault();
      setKeyPressed(true);
      finalizedUserText.current = "";
      npcTextRef.current = "";
      setUserText("");
      setNpcText("");
      convaiClient.current.startAudioChunk();
    }
  }

  function handleSpacebarRelease(event) {
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      document.activeElement.isContentEditable
    ) {
      // If the user is focused on an input field, return without activating the mic
      return;
    }
    if (event.keyCode === 32 && keyPressed) {
      event.preventDefault();
      setKeyPressed(false);
      convaiClient.current.endAudioChunk();
    }
  }

  function sendText() {
    finalizedUserText.current = "";
    npcTextRef.current = "";
    setNpcText("");
    convaiClient.current.sendTextChunk(userText);
    setEnter(0);
  }

  useEffect(() => {
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      document.activeElement.isContentEditable
    ) {
      if (userText !== "" && enter) {
        sendText();
        console.log("sent");
      }
    }
  }, [enter]);

  useEffect(() => {
    window.addEventListener("keydown", handleSpacebarPress);
    window.addEventListener("keyup", handleSpacebarRelease);
    // console.log("Session Id:", convaiClient.current.sessionId);
    return () => {
      window.removeEventListener("keydown", handleSpacebarPress);
      window.removeEventListener("keyup", handleSpacebarRelease);
    };
  }, [keyPressed]);

  // Code for switching environments

  //Maps keyWords to the fileName
  const env = new Map([
    ["Snow", "snowy_forest_path_01_4k.hdr"],
    ["Quattro Canti", "quattro_canti_4k.hdr"],
  ]);

  //Stores the options available to the user
  const environmentOptions = ["Snow", "Quattro Canti"];
  const chatUiOptions = [1, 2, 3, 4];
  //leva component used to provide UI interface that helps in switching environments
  const { environment, ChatUI_Variant, chathistory } = useControls({
    environment: {
      value: environmentOptions[0],
      options: environmentOptions,
      label: "Environment",
    },
    ChatUI_Variant: {
      value: chatUiOptions[0],
      options: chatUiOptions,
      label: "Chat Variant",
    },
    chathistory: {
      value: "Show",
      options: ["Show", "Hide"],
      label: "Chat History",
    },
  });

  return (
    <Canvas shadows camera={{ position: [0, 0, 15], fov: 40 }}>
      <Environment
        files={env.get(environment)}
        ground={{ height: 5, radius: 30, scale: 15 }}
      />
      {avatar && (
        <Model
          position={[0, 0, 3]}
          scale={1.8}
          animationName={isTalking ? "talk" : "idle"}
          npc={avatar}
        />
      )}

      <ChatBubble
        variant={ChatUI_Variant}
        chatHistory={chathistory}
        characterId={id}
        userText={userText}
        npcText={npcText}
        sessionId={convaiClient.current ? convaiClient.current.sessionId : -1}
        keyPressed={keyPressed}
        userInput={userInput}
        setUserText={setUserText}
        setNpcText={setNpcText}
        setEnter={setEnter}
      ></ChatBubble>

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.25}
      />
    </Canvas>
  );
}
