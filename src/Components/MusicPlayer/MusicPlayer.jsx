import React, { useEffect, useState, useRef } from 'react'

import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { FaShuffle } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";


import SeekBar from './SeekBar';
import SongDetails from './SongDetails';
import Volume from './Volume';


import { nextSong, prevSong, togglePlayPause, shuffleSong, repeatSong } from '../../redux/features/song/SongSlice'
import { useDispatch, useSelector } from 'react-redux';

function MusicPlayer() {

    const { playing, currentSongURL, shuffle, repeat } = useSelector(state => state.songs)
    const dispatch = useDispatch()

    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const [volume, setVolume] = useState(1)
    //audio ref for controllers
    const audioRef = useRef(null)
    const audio = audioRef.current

    //load or play current song
    useEffect(() => {
        if (!audio || !currentSongURL) return

        const handleLoadedMetaData = () => {
            setDuration(audio.duration)
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
        }

        audio.addEventListener('loadedmetadata', handleLoadedMetaData)
        audio.addEventListener('timeupdate', handleTimeUpdate)

        if (playing) {
            audio.play().catch((err) => console.log(err))
        } else {
            audio.pause()
        }

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetaData)
            audio.removeEventListener('timeupdate', handleTimeUpdate)

        }


    }, [currentSongURL, playing, shuffle, repeat])


    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    const handleEnd = () => {
        if (repeat) {
            audio.currentTime = 0
            audio.play()
        } else {
            dispatch(nextSong())
        }
    }





    return (
        <div className="w-full flex items-center justify-between md:px-5 ">

            <div className=''>
                <SongDetails />
            </div>


                <div className='lg:fixed lg:left-[40%] flex flex-col pr-2 md:pt-2'>
                    <div className="flex items-center justify-center gap-2 md:gap-5 ">
                        {currentSongURL && (
                            <audio ref={audioRef} src={currentSongURL} onEnded={handleEnd} volume={volume}></audio>
                        )}
                        <FaShuffle className={`md:text-xl text-slate-300 ${shuffle ? "text-red-500 " : ''}`} onClick={() => dispatch(shuffleSong())} />
                        <TbPlayerTrackPrevFilled className='md:text-2xl text-slate-300' onClick={() => dispatch(prevSong())} />
                        {
                            playing ? <FaCirclePause className='text-3xl text-slate-300' onClick={() => dispatch(togglePlayPause(false))} /> : <FaPlayCircle className='text-3xl text-slate-300' onClick={() => dispatch(togglePlayPause(true))} />
                        }
                        <TbPlayerTrackNextFilled className='md:text-xl text-slate-300' onClick={() => dispatch(nextSong())} />
                        <FaRepeat className={`md:text-xl text-slate-300 ${repeat ? ' text-red-500  ' : ''}`} onClick={() => dispatch(repeatSong())} />
                    </div>


                    <div className="w-screen md:w-80 mx-auto fixed md:static bottom-0 left-0 ">
                        <SeekBar
                            audioRef={audioRef.current}
                            duration={duration}
                            currentTime={currentTime}
                            setCurrentTime={setCurrentTime}
                            formatTime={formatTime}
                        />
                    </div>
                </div>

                <div className='hidden lg:block'>
                    <Volume
                        audioRef={audioRef}
                        setVolume={setVolume}
                        volume={volume}
                    />
                </div>
            </div>

    )
}

export default MusicPlayer