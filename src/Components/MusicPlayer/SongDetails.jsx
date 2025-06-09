import React from 'react'
import { useSelector } from 'react-redux'


function SongDetails() {
      const {activeSong} = useSelector(state => state.songs)
    return (
        <div className='flex items-center pl-2'>
            <div className="currentSongImage w-10 h-10  md:w-16 md:h-16 rounded-full  bg-red-500">
              <img src={activeSong.images?.coverart} alt="currentSong" className='w-full h-full animate-spin duration-300 ease-linear rotate-180 rounded-full object-cover' />
            </div>
            <div className="w-40 md:w-80 playing ml-2 md:ml-5">
                <p className="font-semibold  md:text-xl text-white truncate">{activeSong?.title}</p>
                <p className="text-xs md:text-sm text-gray-300">{activeSong?.artistName}</p>
            </div>
        </div>
    )
}

export default SongDetails