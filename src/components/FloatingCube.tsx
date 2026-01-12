import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

const AnimatedCube = ({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent opacity={0.1} color="#ffffff" />
      <Edges linewidth={1.5} threshold={15} color="#ffffff" scale={1} />
    </mesh>
  );
};

const FloatingCube = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        {/* Large cube on the left */}
        <AnimatedCube position={[-4, 0, 0]} scale={2.5} speed={0.4} />
        {/* Medium cube on the right */}
        <AnimatedCube position={[5, 1, -2]} scale={1.8} speed={0.6} />
        {/* Small cube bottom right */}
        <AnimatedCube position={[4, -2, 1]} scale={1} speed={0.8} />
      </Canvas>
    </div>
  );
};

export default FloatingCube;
