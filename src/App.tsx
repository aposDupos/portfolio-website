import React from "react";
import {motion} from "framer-motion";
import styles from './styles/App.module.scss'
import {BeginContent} from "./components/BeginContent/BeginContent";
import {LayoutCamera, MotionCanvas} from "framer-motion-3d";
import {Sparkles} from "./components/Sparkles/Sparkles";
import {Clouds} from "./components/Clouds/Clouds";

const App: React.FC = () => {

    return (
        <motion.div>

            <div
                className={styles.App__wrapper}
            >

                <MotionCanvas style={{
                    backgroundColor: "transparent",
                    position: "absolute",
                    zIndex: 0,
                    height: '100vh',
                    width: '100vw'
                }}>
                    <LayoutCamera fov={100} type={'PerspectiveCamera'} position={[0, 0, 50]}/>
                    <Sparkles count={1000}/>
                </MotionCanvas>
                <BeginContent/>
                <Clouds/>
            </div>

        </motion.div>
    );
}

export default App;
