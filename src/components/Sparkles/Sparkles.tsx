import React, {useMemo, useRef} from "react";
// @ts-ignore
import Random from 'canvas-sketch-util/random';
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

export const Sparkles: React.FC<{ count: number }> = ({count}) => {
    const mesh = useRef<any>();
    const light = useRef<any>();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate some random positions, speed factors and timings
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const time = Random.range(0, 100);
            const factor = Random.range(20, 120);
            const speed = Random.range(0.005, 0.0085) / 2;
            const x = Random.range(-50, 50);
            const y = Random.range(-50, 50);
            const z = Random.range(-50, 50);

            temp.push({time, factor, speed, x, y, z});
        }
        return temp;
    }, [count]);


    useFrame((state) => {
        // Run through the randomized data to calculate some movement
        particles.forEach((particle, index) => {
            let {factor, speed, x, y, z} = particle;

            // Update the particle time
            const t = (particle.time += speed);

            dummy.position.set(
                x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            const s = Math.cos(t);
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(index, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <directionalLight position={[1, 0, 0]} color={0xffffff} intensity={1}/>
            <directionalLight position={[0.75, 1, 0.5]} color={0xFAD0C4} intensity={1}/>
            <directionalLight position={[-0.75, -1, 0.5]} color={0xFFD1FF} intensity={1}/>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <dodecahedronBufferGeometry args={[0.2, 0]}/>
                <meshPhongMaterial color={0xffffff}/>
            </instancedMesh>
        </>
    );
}