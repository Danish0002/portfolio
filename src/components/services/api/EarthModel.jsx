
import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";

export const EarthModel = (props) => {
  const group = useRef();
  const { scene, animations } = useGLTF("/earthModel.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Auto-play the first animation if it exists
    if (animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  return <primitive ref={group} object={scene} {...props} />;
};
