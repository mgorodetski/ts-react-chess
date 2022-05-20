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

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTimer() {
        setBlackTimer(prev => prev - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTimer(prev => prev - 1);
    }

    const handleClickRestart = () => {
        setWhiteTimer(defaultTimer);
        setBlackTimer(defaultTimer);
        restart();
    }

    return (
        <div>
            <div>
                <button onClick={handleClickRestart}>Restart game</button>
            </div>
            <h2> Blacks - {blackTimer}</h2>
            <h2> Whites - {whiteTimer}</h2>

        </div>
    )
}

export default Timer