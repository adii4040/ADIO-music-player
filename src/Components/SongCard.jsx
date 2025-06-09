import React from 'react'
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { setActiveSong, togglePlayPause } from '../redux/features/song/SongSlice';

import { useDispatch, useSelector } from 'react-redux'

function SongCard({ song, data, currentIndex }) {

    const { activeSong, playing, } = useSelector((state) => state.songs);
    const dispatch = useDispatch()
    

    const handlePause = () => {
        dispatch(togglePlayPause(false))
    }
    const handlePlay = () => {
        dispatch(setActiveSong({ song, data, currentIndex }))
        dispatch(togglePlayPause(true))
    }
    return (
        <div key={currentIndex} className='w-[200px] lg:w-[250px] bg-white/5 bg-opacity-80 backdrop-blur-sm p-2 flex flex-col items-center justify-between gap-5 animate-slideup rounded-md group' >
            <div className='flex flex-col gap-5 items-center'>
                <div className='h-40 lg:h-56 relative overflow-hidden rounded-xl'>
                    <div className={`w-full h-full absolute   text-white  items-center justify-center   group-hover:bg-black group-hover:opacity-50 group-hover:flex ${activeSong?.title === song.attributes?.name ? 'flex bg-black bg-opacity-50' : 'hidden' }`}>
                        {
                            activeSong?.title === song.attributes?.name && playing ? <FaCirclePause className='w-14 h-14 group-hover:opacity-70' onClick={() => handlePause()} /> : <FaPlayCircle className='w-14 h-14 group-hover:opacity-70'  onClick={() => handlePlay()}/>
                        }
                    </div>
                    <img src={song.attributes?.artwork?.url} alt="currentSong" className='w-full h-full object-cover' />
                </div>
                <div className="songDetails w-[190px] text-wrap lg:w-[90%] pl-2">
                    <div className="songTitle text-sm lg:text-lg font-semibold text-white truncate">{song.attributes?.name}</div>
                    <div className="singer text-xs md:text-sm text-gray-300 mt-1 md:truncate">{song.attributes?.artistName}</div>
                </div>
            </div>
        </div>
    )
}

export default SongCard