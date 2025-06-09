import React, { useState, useEffect } from 'react'


import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";

function Volume({ audioRef, volume, setVolume }) {
    const [mute, setMute] = useState(false)

    const handleVolume = (e) => {

        setVolume(parseFloat(e.target.value))

        audioRef.current.volume = volume

        if (audioRef.current) {
            audioRef.current.muted = false;
        }
        setMute(false);
    }


    const handleMute = () => {
        if (!audioRef.current) return;

        const isMuted = !mute;
        setMute(isMuted);
        audioRef.current.muted = isMuted;
    }

    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.volume = volume;

        if (volume === 0) {
            audioRef.current.muted = true;
            setVolume(0)
            setMute(true);
        } else if (!mute) {
            audioRef.current.muted = false;
        }
    }, [volume, audioRef, mute]);


    return (
        <div className='flex gap-2'>
            <label htmlFor="volume" onClick={handleMute}>
                {
                    mute || volume === 0 ? <FaVolumeMute className='text-slate-300' /> : <FaVolumeHigh className='text-slate-300' />
                }
            </label>
            <input
                type="range"
                min={0.0}
                max={1.0}
                step={0.01}
                value={volume}
                onChange={(e) => handleVolume(e)}
                className='w-full h-2 accent-slate-700 bg-slate-900  rounded-lg  cursor-pointer range-thumb'
            />
        </div>
    )
}

export default Volume