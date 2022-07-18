import React from "react";
import {motion, Variants} from "framer-motion";
// @ts-ignore
import {LightenDarkenColor} from 'lighten-darken-color'

interface content3DProps {
    children: React.ReactNode
    mainColor?: string,
    type?: "backgroundColor" | "color" | "fill"
}

const container: Variants = {
    hover: {},
    init: {}
}

const item0: Variants = {
    hover: {
        y: -2, x: 2
    },
    init: {
        y: 0, x: 0
    }
}

const item2: Variants = {
    hover: {
        y: 2, x: -2
    },
    init: {
        y: 0, x: 0
    }
}

export const Content3d: React.FC<content3DProps> = (
    {children, mainColor = '#34333D', type = "color"}
) => {
    return (
        <motion.div
            variants={container}
            whileHover={'hover'}
            initial={'init'}
            animate={'init'}
            style={{position: "relative", height: "auto", userSelect: 'none'}}>
            <motion.div
                variants={item0}
                style={{position: "relative", zIndex: 2}}>
                {children}
            </motion.div>
            <motion.div
                style={{position: "absolute", top: 0, zIndex: 1, [type]: LightenDarkenColor(mainColor, -12)}}>
                {children}
            </motion.div>
            <motion.div
                variants={item2}
                style={{position: "absolute", top: 0, zIndex: 0, [type]: LightenDarkenColor(mainColor, -24)}}>
                {children}
            </motion.div>
        </motion.div>
    )
}
