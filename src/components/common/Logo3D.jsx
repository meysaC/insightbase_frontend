import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from "three";
import { useRef } from "react";

function ExtrudedLogo() {
  const group = useRef();

  const data = useLoader(SVGLoader, "/InsightBase_JustLogo_Dark.svg");

  const shapes = data.paths.flatMap((path) =>
    path.toShapes(true)
  );

  // sürekli dönme
  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={group} scale={1}>
      {shapes.map((shape, i) => (
        <mesh key={i}>
          <extrudeGeometry
            args={[
              shape,
              {
                depth: 8,        // kalınlık
                bevelEnabled: true,
                bevelSize: 1,
                bevelSegments: 2,
              },
            ]}
          />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}   // parlaklık
            // transmission={1} // cam gibi şeffaf yapar
            roughness={0.15}  // 0.15 ne kadar yumuşak parlayacak
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Logo3D() {
  return (
    <div className="w-72 h-72">
      <Canvas camera={{ position: [0, 0, 60] }}>
        {/* ortam ışığı */}
        <ambientLight intensity={0.4} />

        {/* SAĞDAN gelen güçlü ışık (parlama efekti) */}
        <directionalLight position={[50, 10, 20]} intensity={8} />

        {/* hafif dolgu */}
        <pointLight position={[-20, -10, 10]} intensity={1} />

        <ExtrudedLogo />
      </Canvas>
    </div>
  );
}
