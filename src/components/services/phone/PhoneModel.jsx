

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function PhoneModel(props) {
  const { nodes, materials } = useGLTF('/phoneModel.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.Antenna_Plastic} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.BackCamDeco} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.BackCover_Glass_hole} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.Back_Cover_Glass} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.Bezel} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.Black_hole} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.Cam_Bezel} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.Cam_Body} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.Cam_Glass} />
        <mesh geometry={nodes.Object_11.geometry} material={materials.Cam_lens} />
        <mesh geometry={nodes.Object_12.geometry} material={materials.Display_ActiveArea} />
        <mesh geometry={nodes.Object_13.geometry} material={materials.Flash} />
        <mesh geometry={nodes.Object_14.geometry} material={materials.Flash_Glass} />
        <mesh geometry={nodes.Object_15.geometry} material={materials.Gray} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.Pen_Ball} />
        <mesh geometry={nodes.Object_17.geometry} material={materials.Pen_Body} />
        <mesh geometry={nodes.Object_18.geometry} material={materials.Pen_Button} />
        <mesh geometry={nodes.Object_19.geometry} material={materials.Pen_Top} />
        <mesh geometry={nodes.Object_20.geometry} material={materials.Rearcase_hole} />
        <mesh geometry={nodes.Object_21.geometry} material={materials.SAMSUNG_LOGO} />
        <mesh geometry={nodes.Object_22.geometry} material={materials.Sensor} />
        <mesh geometry={nodes.Object_23.geometry} material={materials.SpeakerMic} />
        <mesh geometry={nodes.Object_24.geometry} material={materials.Usb_1} />
        <mesh geometry={nodes.Object_25.geometry} material={materials.Usb_2} />
        <mesh geometry={nodes.Object_26.geometry} material={materials.Zoom_Cam} />
        <mesh geometry={nodes.Object_27.geometry} material={materials.Rearcase} />
        <mesh geometry={nodes.Object_28.geometry} material={materials.Rearcase} />
        <mesh geometry={nodes.Object_29.geometry} material={materials.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/phoneModel.glb')
