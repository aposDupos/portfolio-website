import {Variants} from "framer-motion";
import cloud1 from "../../images/cloud1.svg";
import cloud2 from "../../images/cloud2.svg";
import cloud3 from "../../images/cloud3.svg";

export interface cloudI {
    src: string
    variants: Variants
    styles?: {}
}

const transition = {
    x: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 80,
        ease: [.21, .32, .44, .22]
    },
    y: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 10
    },
}
export const clouds: cloudI[] = [
    {
        src: cloud1,
        styles: {
            top: '10%'
        },
        variants: {
            initial: {
                x: '10vw',
                opacity: 0,
                y: 0
            },
            animate: {
                opacity: 1,
                x: ['10vw', "110vw", '10vw', "-100vw"],
                y: [0, 4, 0, -6, 2, -4],
                transition,
            }
        }
    },
    {
        src: cloud2,
        styles: {
            top: "50%"
        },
        variants: {
            initial: {
                x: '60vw',
                opacity: 0,
                y: 0
            },
            animate: {
                opacity: 1,
                x: ['60vw', "-150vw", '60vw', "150vw"],
                y: [0, 4, 0, -6, 2, -4],
                transition,
            }
        }
    },
    {
        src: cloud3,
        styles: {
            bottom: "10%"
        },
        variants: {
            initial: {
                x: '90vw',
                opacity: 0,
                y: 0
            },
            animate: {
                opacity: 1,
                x: ['90vw', "150vw", '90vw', "-150vw"],
                y: [0, 4, 0, -6, 2, -4],
                transition,
            }
        }
    }
]