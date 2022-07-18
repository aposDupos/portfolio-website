import React, {useRef} from "react";
import {OrbitControls, useGLTF, useHelper} from "@react-three/drei";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {PointLightHelper} from "three";
import {MotionConfig} from "framer-motion";
import {motion as motion3D} from "framer-motion-3d";

const Island: React.FC<{ tap: boolean | number, model: string }> = ({tap, model}) => {
    const nodes = useGLTF(model)
    const groupRef = useRef<THREE.Group>()
    const light = useRef<THREE.PointLightHelper>()
    useFrame((state, delta) => {
        if (tap) {
            groupRef.current!.rotation.y += delta
        } else {
            groupRef.current!.rotation.y -= .01
        }
    })
    useHelper(light, PointLightHelper, 4, 'cyan')
    return (
        <MotionConfig transition={{duration: 4}}>
            <motion3D.group
                position={[0,0,0]}
                animate={{
                    scale: tap ? 1.4 : 1,
                    y: [-.5, .5]
                }}
                transition={{
                    duration: 4,
                    y: {
                        repeat: Infinity,
                        repeatType: 'mirror',
                        duration: 2
                    }
                }}
                // @ts-ignore
                ref={groupRef}
            >
                <ambientLight/>
                <pointLight position={[2, 3, 2]} color={0xffffff} intensity={0.6} />
                <directionalLight position={[2,3,4]} intensity={.9} color={0xffffff}/>
                <primitive
                    object={nodes.scene}
                />
                <OrbitControls enableZoom={false}/>
            </motion3D.group>
        </MotionConfig>
    )
}