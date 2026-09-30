"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import * as THREE from "three";

const GOLD = "#c9a227";
const CRIMSON = "#a51c30";
const CREAM = "#f3e6c4";

function GoldMat() {
  return <meshStandardMaterial color={GOLD} metalness={0.92} roughness={0.22} />;
}

function KolamRings() {
  const ref = useRef<Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += d * 0.12;
  });
  return (
    <group ref={ref}>
      {[0.7, 1.05, 1.4, 1.75].map((r, i) => (
        <mesh key={r} rotation={[0, 0, i * 0.15]}>
          <torusGeometry args={[r, 0.03, 16, 80]} />
          <meshStandardMaterial color={i % 2 ? GOLD : CRIMSON} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.2, Math.sin(a) * 1.2, 0.05]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <GoldMat />
          </mesh>
        );
      })}
    </group>
  );
}

function Turban() {
  return (
    <group position={[-1.35, 0.35, 0]}>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.55, 32, 24, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        <meshStandardMaterial color={CRIMSON} roughness={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <torusGeometry args={[0.42, 0.12, 16, 48]} />
        <meshStandardMaterial color="#8e1730" roughness={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.22, 0]}>
        <torusGeometry args={[0.28, 0.05, 12, 40]} />
        <GoldMat />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <GoldMat />
      </mesh>
    </group>
  );
}

function Salavai() {
  return (
    <group position={[0, -0.55, 0]} rotation={[0.15, 0.4, 0.1]}>
      <mesh>
        <boxGeometry args={[1.6, 0.08, 0.55]} />
        <meshStandardMaterial color={CREAM} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.62, 0.02, 0.12]} />
        <GoldMat />
      </mesh>
      <mesh position={[0.7, -0.25, 0.05]} rotation={[0.4, 0, 0.5]}>
        <boxGeometry args={[0.5, 0.05, 0.35]} />
        <meshStandardMaterial color={CREAM} roughness={0.7} />
      </mesh>
    </group>
  );
}

function Chain() {
  const pts = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < 18; i++) {
      const t = i / 17;
      const a = -0.9 + t * 1.8;
      arr.push(new THREE.Vector3(Math.sin(a) * 0.55, -0.15 - Math.cos(a * 0.8) * 0.15, 0.35));
    }
    return arr;
  }, []);
  return (
    <group position={[0.15, 0.15, 0]}>
      {pts.map((p, i) => (
        <mesh key={i} position={p.toArray()}>
          <sphereGeometry args={[i % 5 === 0 ? 0.055 : 0.038, 12, 12]} />
          <GoldMat />
        </mesh>
      ))}
    </group>
  );
}

function Kaluthiru() {
  const group = useRef<Group>(null);
  const beads = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => {
      const a = -1.15 + (i / 21) * 2.3;
      return new THREE.Vector3(Math.sin(a) * 0.95, Math.cos(a) * 0.55 - 0.1, 0);
    });
  }, []);
  useFrame((s) => {
    if (group.current) group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.6) * 0.18;
  });
  return (
    <group ref={group}>
      {beads.map((p, i) => (
        <mesh key={i} position={p.toArray()}>
          <sphereGeometry args={[0.055, 14, 14]} />
          <GoldMat />
        </mesh>
      ))}
      <mesh position={[0, -0.35, 0.05]}>
        <cylinderGeometry args={[0.28, 0.32, 0.08, 32]} />
        <GoldMat />
      </mesh>
      <mesh position={[0, -0.35, 0.1]}>
        <torusGeometry args={[0.16, 0.035, 12, 32]} />
        <meshStandardMaterial color={CRIMSON} metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.62, 0.08]}>
        <octahedronGeometry args={[0.16, 0]} />
        <GoldMat />
      </mesh>
      <mesh position={[0, -0.82, 0.08]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <GoldMat />
      </mesh>
    </group>
  );
}

function Scene({ mode }: { mode: "welcome" | "mappillai" | "ponnu" }) {
  const light = useRef<THREE.PointLight>(null);
  useFrame((s) => {
    if (light.current) {
      light.current.intensity = 1.4 + Math.sin(s.clock.elapsedTime) * 0.25;
    }
  });
  return (
    <>
      <color attach="background" args={["#14060a"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} color="#ffe7a8" />
      <pointLight ref={light} position={[-2, 2, 3]} color={GOLD} intensity={1.5} />
      {mode === "welcome" && (
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <KolamRings />
        </Float>
      )}
      {mode === "mappillai" && (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.35}>
          <group scale={1.15} position={[0, 0.05, 0]}>
            <Turban />
            <Chain />
            <Salavai />
          </group>
        </Float>
      )}
      {mode === "ponnu" && (
        <Float speed={0.9} rotationIntensity={0.18} floatIntensity={0.45}>
          <group scale={1.25}>
            <Kaluthiru />
          </group>
        </Float>
      )}
    </>
  );
}

export function Hero3D({
  mode,
  fallbackLabel,
}: {
  mode: "welcome" | "mappillai" | "ponnu";
  fallbackLabel: string;
}) {
  const [lite, setLite] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (window.innerWidth < 640 && (navigator.hardwareConcurrency || 8) <= 4)
    );
  });

  useEffect(() => {
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (window.innerWidth < 640 && (navigator.hardwareConcurrency || 8) <= 4);
    setLite(reduce);
  }, []);

  if (lite) {
    return (
      <div className="hero-fallback gold-border relative mx-auto flex h-64 w-full max-w-3xl items-center justify-center overflow-hidden rounded-3xl silk-shimmer md:h-80">
        <p className="relative z-10 px-6 text-center font-[family-name:var(--font-display)] text-2xl text-[#f6efd9] md:text-3xl">
          {fallbackLabel}
        </p>
      </div>
    );
  }

  return (
    <div className="gold-border h-72 w-full overflow-hidden rounded-3xl md:h-[22rem]">
      <Canvas camera={{ position: [0, 0.15, mode === "welcome" ? 5.4 : 5.6], fov: 40 }} dpr={[1, 1.75]}>
        <Suspense fallback={null}>
          <Scene mode={mode} />
        </Suspense>
      </Canvas>
    </div>
  );
}
