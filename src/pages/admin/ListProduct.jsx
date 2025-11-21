import { deleteProducts, listProducts } from '@/services/apis'
import React, { useContext, useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Pencil, Trash } from 'lucide-react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { ShopContext } from '@/context/ShopContext'

const ListProduct = () => {

  const [list, setList] = useState([])

  const { corrency } = useContext(ShopContext)

  const fatchList = async () => {
    const data = await listProducts()
    setList(data.data.products)
    console.log(data.data.products)
  }

  useEffect(() => {
    fatchList()
  }, [])

  if (!list) {
    return <h1 className="text-2xl">Loading</h1>
  }

  const deleteHandler = async (id) => {
    const res = await deleteProducts(id)
    console.log(id)
    fatchList()
    if (res.data.success) {
      toast.success(res.data.message)
    }
  }

  return (
    <section className="p-10">
      {/* <div className="container"> */}

      <div className='flex items-center justify-between mb-5'>
        <h1 className='text-2xl font-bold'>All List</h1>
        <Link to="/admin/product/add">  <Button >  Add Product </Button></Link>
      </div>

      <Table >
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader >
          <TableRow >
            <TableHead className="w-[25px]">S. No. </TableHead>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Cagegory</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list?.map((row,i) => (
            <TableRow key={i} >
              <TableCell className="font-medium flex justify-center self-center" >{i+1}</TableCell>
              <TableCell className="font-medium">
                <img src={row.image[0]} alt="" />
              </TableCell>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell className="font-medium">{row.category}</TableCell>
              <TableCell className="font-medium">{corrency}{row.price}</TableCell>
              <TableCell className="font-medium flex justify-end ">
                <Link to={`/admin/product/update/${row._id}`}>
                  <Button className={"bg-yellow-400 me-2 hover:bg-yellow-500 "} variant={"destructive"} >
                    <Pencil />
                  </Button>
                </Link>
                <Button variant={"destructive"} onClick={() => deleteHandler(row._id)}>
                  <Trash />
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
      {/* </div> */}
    </section>
  )
}

export default ListProduct



