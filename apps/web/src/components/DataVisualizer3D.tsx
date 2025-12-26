import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Environment, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// Mock Data
const DATA_POINTS = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    value: Math.random() * 5 + 1,
    label: `Item ${i + 1}`,
    color: Math.random() > 0.5 ? '#e63946' : '#48cae4', // Red or Sky Blue
}));

const DataBar = ({ position, height, color, label }: { position: [number, number, number], height: number, color: string, label: string }) => {
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = React.useState(false);

    useFrame((state) => {
        if (ref.current) {
            // Subtle breathing animation
            ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, hovered ? 1.2 : 1, 0.1);
        }
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <RoundedBox
                    ref={ref}
                    args={[0.5, height, 0.5]}
                    radius={0.05}
                    smoothness={4}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <meshStandardMaterial color={hovered ? '#ffffff' : color} roughness={0.3} metalness={0.8} />
                </RoundedBox>
            </Float>
            {hovered && (
                <Text
                    position={[0, height / 2 + 0.5, 0]}
                    fontSize={0.3}
                    color="#1d3557"
                    anchorX="center"
                    anchorY="bottom"
                    outlineWidth={0.02}
                    outlineColor="#ffffff"
                >
                    {label}
                </Text>
            )}
        </group>
    );
};

// React needs to be imported for useState to work in the component above if not global
import React from 'react';

const DataVisualizer3D = () => {
    // A circular arrangement of bars
    const radius = 6;

    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
            <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
                <color attach="background" args={['#ffffff']} />

                {/* Lighting */}
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#48cae4" />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#e63946" />
                <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

                <Environment preset="city" />

                {/* Dynamic Data Content */}
                <group>
                    {DATA_POINTS.map((point, index) => {
                        const angle = (index / DATA_POINTS.length) * Math.PI * 2;
                        const x = Math.cos(angle) * radius;
                        const z = Math.sin(angle) * radius;
                        return (
                            <DataBar
                                key={point.id}
                                position={[x, 0, z]}
                                height={point.value}
                                color={point.color}
                                label={point.label}
                            />
                        );
                    })}
                </group>

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
};

export default DataVisualizer3D;
