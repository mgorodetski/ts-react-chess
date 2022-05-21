import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;

}

const defaultTimer = 300;

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [blackTimer, setBlackTimer] = useState(defaultTimer);
    const [whiteTimer, setWhiteTimer] = useState(defaultTimer);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    // const [isStopped, setIsStopped] = useState(false);

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    function startTimer(): void {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        // if(!isStopped) {
            timer.current = setInterval(callback, 1000);
        // }
    }

    function decrementBlackTimer() {
        if (blackTimer > 0) {
            setBlackTimer(prev => prev - 1);
        } else {
            setBlackTimer(0);
        }
    }

    function decrementWhiteTimer() {
        if (whiteTimer > 0) {
            setWhiteTimer(prev => prev - 1);
        } else {
            setWhiteTimer(0);
        }
    }

    const handleClickRestart = () => {
        setWhiteTimer(defaultTimer);
        setBlackTimer(defaultTimer);
        restart();
    }
    // const handleClickStop = () => {
    //     stopTimer();
    // }

    // const stopTimer = () => {
    //     setIsStopped(true);
    // }

    return (
        <div>
            <div>
                <button onClick={handleClickRestart}>Restart game</button>
                {/* <button onClick={handleClickStop}>Stop game</button> */}
            </div>
            <h2> Blacks - {blackTimer}</h2>
            <h2> Whites - {whiteTimer}</h2>

        </div>
    )
}

export default Timer