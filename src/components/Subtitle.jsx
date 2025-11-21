import React from 'react'

const Subtitle = ({ title, left = false, right = false }) => {
  return (
    <div className="flex items-center gap-2">
      {left && <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>}
      <p className='font-medium text-sm text-base'>{title}</p>
      {right && <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>}
    </div>
  )
}

export default Subtitle