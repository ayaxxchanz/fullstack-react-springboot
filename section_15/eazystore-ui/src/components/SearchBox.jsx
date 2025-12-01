import React from 'react'

export default function SearchBox({ label, placeholder, value, handleSearch }) {

  return (
    <div className='flex items-center gap-3 pl-4 flex-1'>
        <label htmlFor="search" className='mr-2 font-bold '>{label}</label>
        <input type="text" id='search' 
            className='p-2 text-base border-2 rounded-sm transition outline-none border-gray-400 placeholder-gray-500 focus:ring focus:ring-secondary focus:border-secondary'
            placeholder={placeholder} 
            value={value} 
            onChange={(event) => handleSearch(event.target.value)} // reference to handleSearchChange function on parent
        />
    </div>
  )
}
