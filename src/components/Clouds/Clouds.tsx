import React from "react";
import {motion} from "framer-motion";
import styles from './Clouds.module.scss'
import {Content3d} from "../Content3D/Content3D";
import {cloudI, clouds} from "./data";

const Cloud: React.FC<{ cloud: cloudI }> = ({cloud: {src, variants, styles = {}}}) => {
    return (
        <motion.div
            variants={variants}
            initial={'initial'}
            animate={'animate'}
            style={{width: "fit-content", position: "absolute", ...styles}}
        >
            <Content3d type={'fill'} mainColor={"#ffffff"}>
                <motion.img src={src}/>
            </Content3d>
        </motion.div>
    )
}

export const Clouds: React.FC<{ count?: number }> = ({count = 3}) => {
    return (
        <motion.div className={styles.Clouds}
        >
            {
                clouds.map((cloud) => (
                    <Cloud key={cloud.src} cloud={cloud}/>
                ))
            }
        </motion.div>
    )
}