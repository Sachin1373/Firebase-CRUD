import React from 'react'

function Search() {
  return (
    <div className="flex items-center gap-5 bg-gray-500 w-[390px] h-[40px] border-solid border-2 border-white rounded-lg px-3">
    <img src="../../Search.png" alt="search-icon" className="w-5 h-5" />
    <input 
        type="text" 
        placeholder="Search Contact" 
        className="bg-transparent text-white w-full outline-none " 
    />
</div>
  )
}

export default Search