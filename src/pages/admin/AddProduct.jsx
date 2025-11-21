import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardTitle
} from "@/components/ui/card"
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { addProducts } from '@/services/apis'
import { useState } from 'react'
import uploadarea from "../../assets/uploadarea.png"
import { toast } from 'react-toastify'
import { ClipLoader } from "react-spinners";
const AddProduct = () => {

  const [img1, setImg1] = useState(false)
  const [img2, setImg2] = useState(false)
  const [img3, setImg3] = useState(false)
  const [img4, setImg4] = useState(false)
  const [loading, setLoading] = useState(false)


  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState(0)
  const [category, setcategory] = useState("Men")
  const [subCategory, setsubCategory] = useState("Topware")
  const [size, setsize] = useState([])
  const [bestseller, setbestseller] = useState(false)


  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading(true)

    console.log(img1, img2, img3, img4)

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("size", JSON.stringify(size))
      formData.append("bestseller", bestseller)

      img1 && formData.append("image1", img1)
      img2 && formData.append("image2", img2)
      img3 && formData.append("image3", img3)
      img4 && formData.append("image4", img4)

      const res = await addProducts(formData)

      if (res.data.success) {
        toast.success(res.data.message)
        setLoading(false)

        setImg1(false)
        setImg2(false)
        setImg3(false)
        setImg4(false)
        setname("")
        setdescription("")
        setprice("")
        
        setsize("")
        setbestseller(false)
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
      setLoading(false)

    }

  }



  return (
    <section className='p-5'>

      <Card>
        <CardContent>
          <CardTitle className={"mb-2"}> Product Images </CardTitle>

          <form onSubmit={submitHandler}>
            <div className="flex gap-3 mb-5">
              <Label htmlFor="image1">
                <img src={!img1 ? uploadarea : URL.createObjectURL(img1)} className='max-w-[100px]' alt="" />
                <Input type={"file"} onChange={(e) => setImg1(e.target.files[0])} id="image1" hidden={true} />
              </Label>
              <Label htmlFor="image2">
                <img src={!img2 ? uploadarea : URL.createObjectURL(img2)} className='max-w-[100px]' alt="" />
                <Input type={"file"} onChange={(e) => setImg2(e.target.files[0])} id="image2" hidden={true} />
              </Label>
              <Label htmlFor="image3">
                <img src={!img3 ? uploadarea : URL.createObjectURL(img3)} className='max-w-[100px]' alt="" />
                <Input type={"file"} onChange={(e) => setImg3(e.target.files[0])} id="image3" hidden={true} />
              </Label>
              <Label htmlFor="image4">
                <img src={!img4 ? uploadarea : URL.createObjectURL(img4)} className='max-w-[100px]' alt="" />
                <Input type={"file"} onChange={(e) => setImg4(e.target.files[0])} id="image4" hidden={true} />
              </Label>
            </div>
            <div className="  mb-5">
              <Label htmlFor="pname" className="mb-2">Product Name</Label>
              <Input type={"text"} onChange={(e) => setname(e.target.value)} value={name} id="pname" />
            </div>
            <div className="  mb-5">
              <Label htmlFor="pdisc" className="mb-2">Product Description</Label>
              <Textarea id="pdisc" value={description} onChange={(e) => setdescription(e.target.value)} />
            </div>

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mb-5">
              <div className="  mb-3">
                <Label htmlFor="pdisc" className="mb-2">Product Category</Label>
                <Select onValueChange={(value) => setcategory(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Kids">Kids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="  mb-3">
                <Label htmlFor="pdisc" className="mb-2">Product subCategory</Label>
                <Select onValueChange={(value) => setsubCategory(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sub Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Topwear">Topwear</SelectItem>
                    <SelectItem value="Bottomwear">Bottomwear</SelectItem>
                    <SelectItem value="Winterwear">Winterwear</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="  mb-3">
                <Label htmlFor="price" className="mb-2">Product Price</Label>
                <Input type={"number"} id="price" value={price} onChange={(e) => setprice(e.target.value)} />
              </div>
            </div>
            <div className=" mb-3">
              <Label htmlFor="price" className="mb-3">Add Sizes</Label>
              <div className="flex gap-3">

                {["S", "M", "L", "XL", "XXL"].map((item) => (
                  <Button
                    key={item}
                    type="button"
                    className={`hover:bg-black/20 ${size?.includes(item)
                      ? "bg-black text-white"
                      : "bg-accent text-black"
                      }`}
                    onClick={() =>
                      setsize((prev) =>
                        prev.includes(item)
                          ? prev.filter((p) => p !== item)
                          : [...prev, item]
                      )
                    }
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex justify-start items-center gap-3   mb-5">
              <Checkbox id="bestseller" checked={bestseller} onCheckedChange={(value) => setbestseller(value)} />
              <Label htmlFor="bestseller " > Add to Best Seller</Label>
            </div>
            <div className="flex justify-start items-center gap-3   mb-3">
              <Button disable={loading} >   { loading ? <ClipLoader  color={"#ffffff"} /> : " Add Product"}</Button>
            </div>
          </form>





        </CardContent>
      </Card>


    </section >
  )
}

export default AddProduct