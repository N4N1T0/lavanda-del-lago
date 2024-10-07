import React from 'react'

const NoData = ({
  data,
  description
}: {
  data: string
  description?: string
}) => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h3 className='text-3xl leading-relaxed'>{data}</h3>
      <p>{description}</p>
    </div>
  )
}

export default NoData
