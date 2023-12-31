/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ../public/explorer-idle.glb
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
export function Model(props) {
  const avatar = new Map([
    ["Explorer", "/explorer.glb"],
    ["TourGuide", "/antonio.glb"],
  ]);
  // console.log("NPC:", props.npc);
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(props.npc);

  const mixerRef = useRef();

  // useFrame((_, delta) => {
  //   if (mixerRef.current) {
  //     mixerRef.current.update(delta);
  //   }
  // });

  // // Load the animation
  // useEffect(() => {
  //   const loader = new THREE.AnimationLoader();
  //   loader.load("/masculine_kick.glb", (animationClip) => {
  //     const mixer = new THREE.AnimationMixer(group.current);
  //     const action = mixer.clipAction(animationClip);
  //     action.play();

  //     mixerRef.current = mixer;
  //   });
  // }, []);
  // const { actions } = useAnimations(animations, group);
  // const handleAnimation = (animationName) => {
  //   var from =
  //     animationName === "talk"
  //       ? "Armature|mixamo.com|Layer0.005"
  //       : "Armature|mixamo.com|Layer0";
  //   var to =
  //     animationName === "talk"
  //       ? "Armature|mixamo.com|Layer0"
  //       : "Armature|mixamo.com|Layer0.004";
  //   if (actions[from].isRunning()) {
  //     actions[from].fadeOut(0.3);
  //   }
  //   actions[to].reset().fadeIn(0.3).play();
  // };
  // useEffect(() => {
  //   handleAnimation(props.animationName);
  // }, [props.animationName]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          {/* {console.log("node:", nodes)} */}
          {/* {console.log("materials: ", materials)} */}
          {/* {console.log("Animations: ", animations)} */}
          <skinnedMesh
            name="Wolf3D_Avatar"
            geometry={nodes.Wolf3D_Avatar.geometry}
            material={materials["Wolf3D_Avatar"]}
            skeleton={nodes.Wolf3D_Avatar.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/explorer-idle.glb");
