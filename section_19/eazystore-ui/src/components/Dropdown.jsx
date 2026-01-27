import React from 'react'

export default function Dropdown({ label, options, selectedValue, handleSort }) {
  return (
    <div className='flex items-center gap-2 justify-end pr-4 flex-1'>
        <label htmlFor="sort" className='font-bold'>{label}</label>
        <select id='sort' value={selectedValue} className='p-2 text-base border-2 rounded-sm transition outline-none border-gray-400 focus:ring focus:ring-secondary focus:border-secondary text-light dark:text-dark'
        onChange={(event) => handleSort(event.target.value)} >
            {
                options.map(
                    (optionVal, index) => {
                        return <option key={index} value={optionVal} className='bg-dark dark:bg-light'>{optionVal}</option>
                    }
                )
            }
        </select>
    </div>
  )
}
