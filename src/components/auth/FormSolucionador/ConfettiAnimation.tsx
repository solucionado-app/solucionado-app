import { useEffectOnce } from "@legendapp/state/react";
import { confettiAni } from "./ConfettiStep";

const ConfettiAnimation: React.FC = () => {


    useEffectOnce(() => {
        confettiAni().then(() => {
            // Do something after the confetti animation
        }).catch((err) => {
            console.log(err);
        });
    });

    return (
        <> </>
    );
};

export default ConfettiAnimation;