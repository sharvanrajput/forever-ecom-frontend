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
import uploadarea from "../../assets/uploadarea.png"
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { oneProduct, updateProducts } from '@/services/apis'
import { ShopContext } from '@/context/ShopContext'
import { toast } from 'react-toastify'


const UpdateProduct = () => {
  const { products } = useContext(ShopContext)

  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const [singleProduct, setSingleProduct] = useState([])
  const [img1, setImg1] = useState(false)
  const [img2, setImg2] = useState(false)
  const [img3, setImg3] = useState(false)
  const [img4, setImg4] = useState(false)

  const [preview1, setPreview1] = useState("")
  const [preview2, setPreview2] = useState("")
  const [preview3, setPreview3] = useState("")
  const [preview4, setPreview4] = useState("")

  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState(0)
  const [category, setcategory] = useState("Men")
  const [subCategory, setsubCategory] = useState("Topware")
  const [size, setsize] = useState([])
  const [bestseller, setbestseller] = useState(false)

  const fatchSingleProduct = async () => {
    try {
      const res = await oneProduct(id)
      setSingleProduct(res.data.singleproduct)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fatchSingleProduct()
  }, [])

  useEffect(() => {

    const validatedSize = Array.isArray(singleProduct.size)
      ? singleProduct.size
      : [];

      console.log(validatedSize)

    setname(singleProduct.name || "");
    setdescription(singleProduct.description || "");
    setprice(singleProduct.price || "");
    setcategory(singleProduct.category || "");
    setsubCategory(singleProduct.subCategory || "");
    setsize(validatedSize);
    setbestseller(singleProduct.bestseller || false);

    setPreview1(singleProduct?.image?.[0] || "");
    setPreview2(singleProduct?.image?.[1] || "");
    setPreview3(singleProduct?.image?.[2] || "");
    setPreview4(singleProduct?.image?.[3] || "");

  }, [singleProduct]);


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

      const res = await updateProducts(id, formData)

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

        setsize([])
        setbestseller(false)
        fatchSingleProduct()
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
                <img src={img1 ? URL.createObjectURL(img1) : preview1 ? preview1 : uploadarea} className='max-w-[100px]' alt="" />
                <Input type={"file"} onChange={(e) => setImg1(e.target.files[0])} id="image1" hidden={true} />
              </Label>
              <Label htmlFor="image2">
                <img src={img2 ? URL.createObjectURL(img2) : preview2 ? preview2 : uploadarea} className='max-w-[100px]' alt="" />
                <Input type={"file"} onChange={(e) => setImg2(e.target.files[0])} id="image2" hidden={true} />
              </Label>
              <Label htmlFor="image3">
                <img src={img3 ? URL.createObjectURL(img3) : preview3 ? preview3 : uploadarea} className='max-w-[100px]' alt="" />
                <Input type={"file"} onChange={(e) => setImg3(e.target.files[0])} id="image3" hidden={true} />
              </Label>
              <Label htmlFor="image4">
                <img src={img4 ? URL.createObjectURL(img4) : preview4 ? preview4 : uploadarea} className='max-w-[100px]' alt="" />
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
                <Select value={category} onValueChange={(value) => setcategory(value)}>
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
                <Select value={subCategory} onValueChange={(value) => setsubCategory(value)}>
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

                <Button htmlFor="price" className={`hover:bg-black/20 ${size.includes("S") ? "bg-black text-white" : "bg-accent text-black"}`} type="button" onClick={() => setsize(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}  >S</Button>
                <Button htmlFor="price" className={`hover:bg-black/20 ${size.includes("M") ? "bg-black text-white" : "bg-accent text-black"}`} type="button" onClick={() => setsize(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}  >M</Button>
                <Button htmlFor="price" className={`hover:bg-black/20 ${size.includes("L") ? "bg-black text-white" : "bg-accent text-black"}`} type="button" onClick={() => setsize(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}  >L</Button>
                <Button htmlFor="price" className={`hover:bg-black/20 ${size.includes("XL") ? "bg-black text-white" : "bg-accent text-black"}`} type="button" onClick={() => setsize(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}  >XL</Button>
                <Button htmlFor="price" className={`hover:bg-black/20 ${size.includes("XXL") ? "bg-black text-white" : "bg-accent text-black"}`} type="button" onClick={() => setsize(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}  >XXL</Button>
              </div>
            </div>
            <div className="flex justify-start items-center gap-3   mb-5">
              <Checkbox id="bestseller" checked={bestseller} onCheckedChange={(value) => setbestseller(value)} />
              <Label htmlFor="bestseller " > Add to Best Seller</Label>
            </div>
            <div className="flex justify-start items-center gap-3   mb-3">
              <Button>Update Product</Button>
            </div>
          </form>

        </CardContent>
      </Card>


    </section >
  )
}

export default UpdateProduct 