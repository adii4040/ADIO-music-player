import { createSlice, current } from "@reduxjs/toolkit";
import { songFormat } from "../../../Utils/SongFormat";

const initialState = {
    data: [],
    activeSong: {},
    currentSongURL: null,
    currentIndex: 0,
    likedSong: false,
    isActive: false,
    playing: false,
    shuffle: false,
    repeat: false,
}

export const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setActiveSong: (state, action) => {

            const { song, data, currentIndex } = action.payload

            const formatedSong = songFormat(song)
            state.activeSong = formatedSong

            const previewUrl = formatedSong.songUrl

            if (previewUrl) {
                state.currentSongURL = previewUrl
            }

            state.data = data
            state.currentIndex = currentIndex;
            state.isActive = true
            state.playing = true

        },

        togglePlayPause: (state, action) => {
            state.playing = action.payload
        },
        prevSong: (state, action) => {
            const totalSong = state.data?.length
            if(!totalSong) return

            const nextSongIndex = state.shuffle ? Math.floor( Math.random() * totalSong ) : state.currentIndex === 0 ? state.data.length - 1 : state.currentIndex -1
            const formatedSong = songFormat(state.data[nextSongIndex])
            
            state.activeSong = formatedSong
            state.currentSongURL = formatedSong.songUrl
            state.currentIndex = nextSongIndex
            state.isActive = true
            state.playing = true
        },
        nextSong: (state, action) => {
            const totalSongs = state.data?.length;
            if (!totalSongs) return

            if (state.shuffle) {
                const randomSongIndex = Number(Math.floor(Math.random() * totalSongs))
                const formatedRandomSong = songFormat(state.data[randomSongIndex])

                state.activeSong = formatedRandomSong
                state.currentSongURL = formatedRandomSong?.songUrl
                state.currentIndex = randomSongIndex

                state.isActive = true
                state.playing = true
            }

            const nextSongIndex = state.currentIndex === state.data.length - 1 ? 0 : state.currentIndex + 1
            const nextSongFormat = songFormat(state.data[nextSongIndex])

            state.activeSong = nextSongFormat
            state.currentSongURL = nextSongFormat?.songUrl
            state.currentIndex = nextSongIndex

            state.isActive = true
            state.playing = true
        },
        shuffleSong: (state, action) => {
            state.shuffle = !state.shuffle
        },
        repeatSong: (state, action) => {
            state.repeat = !state.repeat

        }
    },


})

export const { setActiveSong, togglePlayPause, prevSong, nextSong, shuffleSong, repeatSong } = songSlice.actions

export default songSlice.reducer
