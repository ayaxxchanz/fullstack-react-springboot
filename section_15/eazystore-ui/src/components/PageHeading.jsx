import React from 'react'
import PageTitle from './PageTitle'

export default function PageHeading( {title, children} ) {
  return (
    <div className="text-center max-w-[576px] mx-auto px-4 py-6">
      <PageTitle title={ title } />
      <p className="leading-6">{ children }</p>
    </div>
    
  )
}
