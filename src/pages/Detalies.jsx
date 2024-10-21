import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { http } from '../axios';




function Detalies() {
  const [product,setProduct]=useState({})
  const [color,setColor]=useState('')

  const params=useParams()
  const {id}=params 
  
  useEffect(()=>{

    http.get(`/products/${id}`)
    .then(data=>{
      if(data.status===200){
        setProduct(data.data.data)
        setColor(data.data.data.attributes.colors[0])
        
      }
      
    })
    .catch(err=>{
console.log(err);

    })
  },[])
  return (
    <div>
      {
        product.id && <>
        <div className='container mx-auto flex gap-2'>


         <div className='mx-10  mt-4 flex gap-3'>
         <Link className='text-gray-400' to={'/'}>Home</Link>
          <Link  className='text-gray-400' to={'/products'}>Products</Link>
          

         </div>
        </div>

        <div className=' container  mx-auto   flex gap-16 '>
          <div className='mx-10 mt-10'>
          <img className='w-[500px] h-96 object-cover rounded-md' src={product.attributes.image} alt="" />
          </div>

          <div className='mt-10'>
            <h1 className='capitalize text-3xl font-bold text-gray-700'>{product.attributes.title}</h1>
            <h4 className='text-xl text-neutral-content font-bold mt-2'>{product.attributes.company}</h4>
            <p className='mt-3 text-xl text-gray-900'>{product.attributes.price} $</p>
            <p className='mt-6 w-96 text-blue-950'>{product.attributes.description}</p>
              <h1>Colors</h1>
            
               <div className='flex gap-3'>
                {
               product.attributes.colors.length>0&& product.attributes.colors.map(colorProduct=>{

               return  (

               <span style={{backgroundColor:colorProduct , border: color ===  colorProduct ? "1px solid black":"none" }} className='block w-3 h-3 rounded-full bg-blue-700 cursor-pointer' 
               onClick={()=>setColor(colorProduct)}
               ></span>
               )
               })
              }

               </div> 
             

          </div>



        </div>
        </>
      }
    </div>
  )
}

export default Detalies