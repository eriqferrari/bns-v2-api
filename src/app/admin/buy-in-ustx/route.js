import { NextResponse } from 'next/server'
import clientPromise from "../../../components/mongodb"
import { headers } from 'next/headers'



export async function POST(req,res) {

  

  const header = {
      'Access-Control-Allow-Origin': '*', // https://app.digitizid.com
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      "Content-Type": 'application/json',
    }
    

   const client = await clientPromise



   const db = client.db("marketplaceStxmap")
   const data = await req.json()
   // const txs = data.apply[0].transactions
   const tx = data.tx
   const block = data.block
   const timestamp = data.timestamp
   const headerList = headers()
   const authToken = headerList.get("authorization").split("Bearer ")[1]

   const updateMap = async (map, buyTx, buyer) => {
     try {
         await db.collection('nftmarket')
         .updateOne({ map:  map, status: { $in: ['Available', 'Pending purchase'] }},
         { $set: {  status: "Sold", lastUpdateDate: new Date(timestamp*1000), buyTx: buyTx, buyer: buyer} })
         }catch(err) {} 
   }

   const makeAvailable = async (buyTx) => {
     try {
         await db.collection('nftmarket')
         .updateOne({ buyTx: buyTx},
         { $set: {  status: "Available", lastUpdateDate: new Date(timestamp*1000), buyTx: null, buyer: null} })
         }catch(err) {} 
   }

  const createOrder = async () => {
    
    try {
     
      if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) { 

      
      //for (const tx of txs) {
         const events = tx.metadata.receipt.events // [4].data.value
         const hash = tx.transaction_identifier.hash
         var map = ""

         for (const event of events) {
          if (event.data.topic === "print") {map = event.data.value.id.toString()}
           
         }


          if (tx.metadata.result === "(ok true)") {

            await updateMap(map, hash, tx.metadata.sender)
          }
          else { await makeAvailable(hash) }
         
      //}

      const s = {success: ""}

      return s
   } else {
      const s = {error: "Not authorized!"}

      return s
   }

    } catch (error) {
       await db.collection('chainhook').insertOne({ tx: tx, block: block, a: "buy-in-ustx", error: err})
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

