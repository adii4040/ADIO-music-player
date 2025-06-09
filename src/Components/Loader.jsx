import React from 'react'
import loader from '../assets/loader.mp4'
function Loader() {
  return (
    <div><video src={loader} loop muted autoPlay></video></div>
  )
}

export default Loader