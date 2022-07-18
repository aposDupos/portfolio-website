import React, {useState} from "react";
import {AnimatePresence, motion, useMotionValue, useTransform, Variants} from "framer-motion";
import styles from './BigContent.module.scss'
import hand from "../../images/Hand.png"
import {Content3d} from "../Content3D/Content3D";

const shakingHandVariants: Variants = {
    init: {
        rotate: 0
    },
    animate: {rotate: 0},
    hover: {
        rotate: [0, 30, 0 - 30],
        scale: [1, 1.1],
        transition: {
            rotate: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5
            }
        }
    }
}

const words: any[] = [
    <><Content3d>Hi there!</Content3d>
        <motion.img style={{userSelect: "none"}} variants={shakingHandVariants} src={hand}/>
    </>,
    <Content3d>Меня зовут Влад</Content3d>
]

export const BeginContent: React.FC = () => {
    const [[direction, textIndex], setIndex] = useState<[0 | 1 | -1, number]>([0, 0])
    const [exitX, setExitX] = useState<string | number>("100%")
    const x = useMotionValue<number>(0);
    const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false
    });

    const wordVariants: {} = {
        init: {
            x: typeof exitX === "string" ? 0 : -exitX,
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1
        },
        exit: {
            x: exitX,
            opacity: 0,
            scale: 0.5,
            transition: {duration: 0.2}
        }
    }

    function handleDragEnd(event: any, info: any) {
        if (info.offset.x < -100) {
            setExitX(-250)
            setIndex([1, textIndex + 1]);
        }
        if (info.offset.x > 100) {
            setExitX(250)
            setIndex([-1, textIndex - 1]);
        }
    }

    return (
        <div className={styles.BigContent__wrapper}>
            <div className={styles.BigContent__wordsContainer}>
                {<AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={textIndex}
                        variants={wordVariants}
                        initial={"init"}
                        animate={"animate"}
                        exit={'exit'}
                        whileHover={'hover'}
                        className={styles.BigContent__word}

                        style={{
                            x: x,
                            rotate: rotate,
                            cursor: "grab",
                            scale: scale
                        }}
                        drag={'x'}
                        whileTap={{cursor: "grabbing"}}
                        dragConstraints={{
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }}
                        onDragEnd={handleDragEnd}
                    >
                        {words[textIndex]}
                    </motion.div>
                </AnimatePresence>
                }
            </div>
        </div>
    )
}

