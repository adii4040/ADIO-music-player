import './App.css'
import { useSelector } from 'react-redux'
import Playlist from './Components/Playlist'
import MusicPlayer from './Components/MusicPlayer/MusicPlayer'



function App() {

  const { isActive } = useSelector(state => state.songs)
  return (
    <>
      <main className='w-full min-h-screen bg-slate-950 relative overflow-hidden'>
        <div className='w-full h-20 md:pl-2 bg-slate-950  fixed top-0 z-10'>
            <div className='flex items-center pt-2'>
              <div className="logo text-3xl md:text-5xl">🎧</div>
              <div className="name border-l-2  pl-2">
                <h1 className='text-3xl md:text-5xl text-white font-sans'>ADIO</h1>
                <p className='text-sm text-white'>Feel The Vibe</p>
              </div>
            </div>
        </div>

        <div className="playlists w-full h-full mx-auto  pt-16 flex flex-col items-center">
          <Playlist />
        </div>
        {
          isActive && <div className='w-full h-20 fixed bottom-0 z-10  backdrop-blur-lg flex bg-slate-950/30 mx-auto mt-5 rounded-lg overflow-hidden'>

            <div className="songDetails w-full h-full flex items-center justify-center gap-5 ">
              <MusicPlayer />
            </div>
          </div>
        }

      </main>
    </>
  )
}

export default App
