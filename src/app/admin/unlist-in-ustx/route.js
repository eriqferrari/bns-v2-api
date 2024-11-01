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

   const updateMap = async (map) => {
     try {
         await db.collection('nftmarket')
         .updateOne({ map:  map, status:  'Available'},
         { $set: {  status: "Expired", lastUpdateDate: new Date(timestamp*1000),} })
         await db.collection('nftmarket')
         .updateOne({ map:  map, status:  'Pending delete'},
         { $set: {  status: "Expired", lastUpdateDate: new Date(timestamp*1000),} })
         }catch(err) {} 
   }

   const restoreMap = async (map) => {
     try {
         await db.collection('nftmarket')
         .updateOne({ map:  map, status: "Pending delete"},
         { $set: {  status: "Available", lastUpdateDate: new Date(timestamp*1000),} })
         }catch(err) {} 
   }

  const createOrder = async () => {
    
    try {
     
      if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) { 

      const query = {status: {$in: ['Available', 'Pending delete']}};
      const created = await db.collection('nftmarket').find(query).project({_id: 0, map: 1}).toArray()
      const availableMaps = []

      for (const obj of created) {
        availableMaps.push(obj.map)
      }

      //for (const tx of txs) {
         const print = tx.metadata.receipt.events[0].data.value
         const map = print.id.toString()
         if (availableMaps.includes(map)) {
          if (tx.metadata.result === "(ok true)") {
              await updateMap(map)
            } else {await restoreMap(map)} 
        }
         
      //}

      const s = {success: ""}

      return s
   } else {
      const s = {error: "Not authorized!"}

      return s
   }

    } catch (error) {
      await db.collection('chainhook').insertOne({ tx: tx, block: block, a: "unlist-in-ustx", error: error})
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

