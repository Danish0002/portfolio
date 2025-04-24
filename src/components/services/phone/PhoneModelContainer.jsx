import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";
import { PhoneModel } from "./PhoneModel";

const PhoneModelContainer = () => {
  return (
    <Canvas>
      <Suspense fallback="loading...">
        <Stage environment="lobby" intensity={10}>
          <PhoneModel />
        </Stage>
        <OrbitControls enableZoom={false} autoRotate />
        <PerspectiveCamera position={[0, 0, 2]} zoom={0.7} makeDefault />
      </Suspense>
    </Canvas>
  );
};

export default PhoneModelContainer;
