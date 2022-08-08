/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Tree({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Tree.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cube118.geometry} material={materials.Wood} />
      <mesh geometry={nodes.Cube118_1.geometry} material={materials.Green} />
    </group>
  );
}

useGLTF.preload("/models/Tree.gltf");
