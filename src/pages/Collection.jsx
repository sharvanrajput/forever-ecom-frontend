import Title from '@/components/Title';
import { Input } from '@/components/ui/input'
import { ShopContext } from '@/context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'
import { FaAngleDown, FaCode } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductItem from '@/components/ProductItem';
import { Label } from '@/components/ui/Label';
import Searchbar from '@/components/Searchbar';
import { RefreshCcw } from 'lucide-react';


const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relevent")

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productCopy = [...products]

    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productCopy)
  }

  const sortProduct = () => {
    let fpcopy = [...filterProducts]

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpcopy.sort((a, b) => (a.price - b.price)))
        break;

      case "high-low":
        setFilterProducts(fpcopy.sort((a, b) => (b.price - a.price)))
        break;

      default:
        applyFilter()
        break;
    }

  }



  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  useEffect(() => {
    applyFilter()
  }, [category, subCategory])

  useEffect(() => {
    sortProduct()
  }, [sortType, search])


  return (
    <section className='py-10'>
      <div className="container">
        <Searchbar />
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
          <div className="min-w-60 ">
            <p className="my-2 text-xl flex items-center cursor-pointer gap-2" onClick={() => setShowFilter(prev => !prev)}>Filters
              <FaAngleDown className={`size-5 transition-rotate duration-100 sm:hidden ${showFilter ? "" : "rotate-180"} `} />
            </p>

            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
              <p className='mb-3 text-sm font-medium'>CATEGORYS</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className='flex gap-2'>
                  <Input type={"checkbox"} className={"w-3"} onChange={toggleCategory} value={"Men"} id='Man' /> <Label className='cursor-pointer px-2 py-1' htmlFor='Man'>Man</Label>
                </p>
                <p className='flex gap-2'>
                  <Input type={"checkbox"} className={"w-3"} onChange={toggleCategory} value={"Women"} id='Women' /><Label className='cursor-pointer px-2 py-1' htmlFor='Women'>Women</Label>
                </p>
                <p className='flex gap-2'>
                  <Input type={"checkbox"} className={"w-3"} onChange={toggleCategory} value={"Kids"} id='Kids' /><Label className='cursor-pointer px-2 py-1' htmlFor='Kids'>Kids</Label>
                </p>
              </div>
            </div>
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
              <p className='mb-3 text-sm font-medium'>SUB-CATEGORYS</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className='flex gap-2'>
                  <Input type={"checkbox"} className={"w-3"} onChange={toggleSubCategory} value={"Topwear"} id='Topwear' /><Label className='cursor-pointer px-2 py-1' htmlFor='Topwear'>Topwere</Label>
                </p>
                <p className='flex gap-2'>
                  <Input type={"checkbox"} className={"w-3"} onChange={toggleSubCategory} value={"Bottomwear"} id='Bottomwear' /><Label className='cursor-pointer px-2 py-1' htmlFor='Bottomwear'>Bottomwere</Label>
                </p>
                <p className='flex gap-2'>
                  <Input type={"checkbox"} className={"w-3"} onChange={toggleSubCategory} value={"Winterwear"} id='Winterwear' /><Label className='cursor-pointer px-2 py-1' htmlFor='Winterwear'>Winterwere</Label>
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between text-base sm:text-2xl mb-3">
              <Title text1={'All'} text2={"COLLECTIONS"} />
              {/* SORT */}


              <Select className="rounded-none shadow-none" onValueChange={(value) => setSortType(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relavent">Sort by Relevent</SelectItem>
                  <SelectItem value="low-high">Sort by Low to Hight</SelectItem>
                  <SelectItem value="high-low">Sort byd High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {
                filterProducts.map((item, i) => (
                  <div className='px-2' key={i}>
                    <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
                  </div>
                ))
              }
            </div>

          </div>


        </div>
      </div>
    </section>
  )
}

export default Collection