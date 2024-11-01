import { NextResponse } from 'next/server'
import clientPromise from "../../components/mongodb"
import { headers } from 'next/headers'



export async function POST(req,res) {

  

  const header = {
      'Access-Control-Allow-Origin': '*', // https://app.digitizid.com
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      "Content-Type": 'application/json',
    }
    

   const client = await clientPromise



   const db = client.db("domains")
   const data = await req.json()
  
   const headerList = headers()
   const authToken = headerList.get("authorization").split("Bearer ")[1]


   
  const createOrder = async () => {
    
    try {
     
      if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) { 

      await db.collection('chainhook').insertOne({ data: data})
      const s = {success: "Ok success"}
      return s
      

   } else {
      const s = {error: "Not authorized!"}

      return s
   }

    } catch (error) {
       return new NextResponse( JSON.stringify(error),
         { status: 400, 
         headers: header,
      });
    } 
   } // createOrder
   
   

    const  order = await createOrder()
    

   return new NextResponse( JSON.stringify(order),
  			{ status: 200, 
			headers: headers,
   	});
 

}

