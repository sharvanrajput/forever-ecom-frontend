import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Title from './Title'

const NewsLetterBox = () => {
  const [email, setEmail] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(email)
    setEmail("")
  }

  return (
    <section className='py-10'>
      <div className='text-center'>
        <Title text1={""} text2={"Subscribe Now & get 20% off"} />
        <p className="text-gray-400 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, mollitia!</p>
        <form className='max-w-lg mx-auto relative mt-3 overflow-hidden  ' onSubmit={submitHandler} >
          <Input text="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} className={"max-w-lg  rounded-none py-"} />
          <Button size={"lg"} className={"rounded-none absolute top-[50%] translate-y-[-50%] right-0"}>Subscribe</Button>
        </form>
      </div>
    </section>
  )
}

export default NewsLetterBox