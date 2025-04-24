import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera, Stage, Html } from "@react-three/drei";
import { ComputerModel } from './ComputerModel';

const ComputerModelContainer = () => {
  return (
    <Canvas>
      <PerspectiveCamera position={[-1.5,0,1.8]} zoom={0.68} makeDefault />
      <OrbitControls enableZoom={false} autoRotate />

      <Suspense
        fallback={
          <Html>
            <span style={{ color: "white" }}>Loading...</span>
          </Html>
        }
      >
        <Stage environment="night" intensity={0.5}>
          <ComputerModel scale={0.6} /> {/* You can adjust scale here */}
        </Stage>
      </Suspense>
    </Canvas>
  );
};

export default ComputerModelContainer;
