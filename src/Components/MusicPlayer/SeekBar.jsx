import React from 'react'

function SeekBar({ audioRef, duration, currentTime, setCurrentTime, formatTime }) {
    return (
        <>
            <div className='flex items-center  cursor-pointer'>
                <div className="hidden md:block text-sm text-gray-300">
                    <span>{formatTime(currentTime)}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={(e) => {
                        const newTime = Number(e.target.value);
                        audioRef.currentTime = newTime;
                        setCurrentTime(newTime);
                    }}
                    className="w-full h-1 accent-slate-800 outline-none border-none md:mx-5  cursor-pointer"
                />
                <div className="hidden md:block text-sm text-gray-300">
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </>


    )
}

export default SeekBar