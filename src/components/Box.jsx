import React from 'react'

export const Box = (props) => {
  return (
    <div className='h-[100px] w-[100px] bg-red-500 flex justify-center items-center border'>
        <p>{props.name}:{props.order}</p>
    </div>
  )
}
