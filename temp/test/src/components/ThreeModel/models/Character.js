/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import iot from "../../../apis/iot";
import axios from "axios";
import { useRecoilState } from "recoil";
import { childrenId } from "../../../atoms";
import { useNavigate } from "react-router-dom";

const loginCon = (rn, id) => {
  const chats = {
    0: `안녕 ${id}야. 나랑 놀고 싶다면 나를 눌러봐!  `,
    1: `${id} 야 안녕!!  나를 눌러서 대화를 시작해보지 않을래?`,
    2: `${id} 아 또왔구나  정말 보고 싶었어!  나랑 또 재밌게  놀아보자!`,
  };
  if (rn == 0) return chats[0];
  else if (rn == 1) return chats[1];
  else return chats[2];
};

export default function Character({ ...props }) {
  const group = useRef();

  const { nodes, materials, animations } = useGLTF("/models/Character.gltf");
  const { actions } = useAnimations(animations, group);
  const [hello, sethello] = useState(false);
  const [sayHi, setSayHi] = useState(false);
  const [id, setId] = useRecoilState(childrenId);

  // actions

  useEffect(() => {
    function sleep(sec) {
      return new Promise((resolve) => setTimeout(resolve, sec * 1000));
    }
    function rn() {
      return;
    }

    if (props.state === "stateMain") {
      return;
    }

    if (props.state === "stateLogin") {
      axios.get(iot.arduino()).then((res) => {
        console.log(res);
        axios.get(iot.login()).then(async ({ data }) => {
          props.setReady((val) => !val);
          console.log(data.id);
          setId(data.id);
          sethello(true);
          await sleep(2);
          const rn = Math.floor(Math.random() * 3);
          axios
            .get(iot.tts(loginCon(rn, data.id)))
            .then((res) => console.log(res));
        });
      });
    }
  }, []);
  useFrame(({ clock }) => {
    if (props.ready) {
      const elapsedTime = clock.getElapsedTime();
      if (group.current.position.x > 2.1) {
        group.current.position.x = group.current.position.x - 0.02;
        group.current.position.y = group.current.position.y + 0.01;
      }
      // console.log(group.current);
    }
  });

  function onClick() {
    if (id) {
      props.goMain();
    }
    sethello((val) => !val);
  }
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  // async function WalkAndHello() {
  //   actions.Walk.play();
  //   await delay(6000);
  //   actions.Walk.fadeOut(3);
  //   actions.Wave.play();
  // }
  useEffect(() => {
    console.log(actions);
    actions.Yes.play();
    return () => {
      actions.Yes.fadeOut(3);
      actions.Wave.play();
    };
  }, [hello]);

  return (
    <group ref={group} {...props} dispose={null} onClick={onClick} scale={1}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Arms">
            <skinnedMesh
              name="CUBezierCurve000"
              geometry={nodes.CUBezierCurve000.geometry}
              material={materials.Main}
              skeleton={nodes.CUBezierCurve000.skeleton}
            />
            <skinnedMesh
              name="CUBezierCurve000_1"
              geometry={nodes.CUBezierCurve000_1.geometry}
              material={materials.Main_Light}
              skeleton={nodes.CUBezierCurve000_1.skeleton}
            />
          </group>
          <group name="Body_1">
            <skinnedMesh
              name="CUBezierCurve002"
              geometry={nodes.CUBezierCurve002.geometry}
              material={materials.Main}
              skeleton={nodes.CUBezierCurve002.skeleton}
            />
            <skinnedMesh
              name="CUBezierCurve002_1"
              geometry={nodes.CUBezierCurve002_1.geometry}
              material={materials.Main_Light}
              skeleton={nodes.CUBezierCurve002_1.skeleton}
            />
            <skinnedMesh
              name="CUBezierCurve002_2"
              geometry={nodes.CUBezierCurve002_2.geometry}
              material={materials.Main2}
              skeleton={nodes.CUBezierCurve002_2.skeleton}
            />
          </group>
          <skinnedMesh
            name="Ears"
            geometry={nodes.Ears.geometry}
            material={materials.Main}
            skeleton={nodes.Ears.skeleton}
          />
          <group name="Head_1">
            <skinnedMesh
              name="CUBezierCurve003"
              geometry={nodes.CUBezierCurve003.geometry}
              material={materials.Main}
              skeleton={nodes.CUBezierCurve003.skeleton}
            />
            <skinnedMesh
              name="CUBezierCurve003_1"
              geometry={nodes.CUBezierCurve003_1.geometry}
              material={materials.Black}
              skeleton={nodes.CUBezierCurve003_1.skeleton}
            />
            <skinnedMesh
              name="CUBezierCurve003_2"
              geometry={nodes.CUBezierCurve003_2.geometry}
              material={materials.Main_Light}
              skeleton={nodes.CUBezierCurve003_2.skeleton}
            />
            <skinnedMesh
              name="CUBezierCurve003_3"
              geometry={nodes.CUBezierCurve003_3.geometry}
              material={materials.White}
              skeleton={nodes.CUBezierCurve003_3.skeleton}
            />
            <skinnedMesh
              name="CUBezierCurve003_4"
              geometry={nodes.CUBezierCurve003_4.geometry}
              material={materials.EyeColor}
              skeleton={nodes.CUBezierCurve003_4.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Character.gltf");
