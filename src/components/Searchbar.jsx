import { ShopContext } from '@/context/ShopContext'
import React, { useContext } from 'react'
import { Input } from './ui/input'
import { assets } from '@/assets/assets'

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)


  return showSearch ? (

    <div className='border-t border-b bg-gray-50 text-center relative'>
      <div className="inline-flex items-center justify-center relative border border-gray-400  mx-5 my-3 rounded-full w-3/4 sm:w-1/2">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} type={"text"} placeholder='Search...' className={"px-6 py-5  rounded-full "} />
        <img src={assets.search_icon} className='size-4 absolute right-3 cursor-pointer' alt="" />
      </div>
      <img src={assets.cross_icon} className='size-4 absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer' onClick={()=>setShowSearch(prev=>!prev)} alt="" />

    </div>


  ) : null
}

export default Searchbar