import React from 'react'
import { useGetWorldChartQuery } from '../redux/services/SazamApi';
import SongCard from './SongCard';
import Loader from './Loader';


function Playlist() {
    const { data, isFetching, isError } = useGetWorldChartQuery()
    return (
        <div>
            <div className='w-full flex flex-wrap items-center justify-center gap-8 cursor-pointer p-10'>
                {
                    isFetching ? <Loader /> : data?.map((song, i) => (
                        <SongCard key={song.id} song={song} data={data} currentIndex={i} />
                    ))
                }
            </div>

            {
                isError && <div> <h1 className='text-2xl text-white text-center'>Sorry for the inconvenience, currently we are facing some issue!! </h1></div>
            }
        </div>
    )
}

export default Playlist