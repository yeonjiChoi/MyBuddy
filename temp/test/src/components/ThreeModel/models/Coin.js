/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import axios from "axios";
import iot from "../../../apis/iot";

export default function Coin({ ...props }) {
  const group = useRef();
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    group.current.rotation.y = a;
  });
  const { nodes, materials } = useGLTF("/models/Coin.gltf");
  const onClick = () => {
    console.log(iot.camera());
    axios.get(iot.camera()).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <group ref={group} {...props} dispose={null} onClick={onClick}>
      <mesh geometry={nodes.Cylinder012.geometry} material={materials.Gold} />
      <mesh
        geometry={nodes.Cylinder012_1.geometry}
        material={materials.Gold_Dark}
      />
    </group>
  );
}

useGLTF.preload("/models/Coin.gltf");
