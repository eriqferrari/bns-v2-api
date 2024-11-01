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



   const db = client.db("marketplaceStxmap")
   const data = await req.json()
   const txs = data.apply[0].transactions
   const block = data.apply[0].block_identifier.index
   const timestamp = data.apply[0].timestamp
   const headerList = headers()
   const authToken = headerList.get("authorization").split("Bearer ")[1]
   const host = "https://dev.stxmap.co"

  const updateDb = async (url, tx, block, timestamp) => {
  try {
    const data = { tx: tx, block: block, timestamp: timestamp };
    const response = await fetch( host + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_AUTH_TOKEN,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    //await db.collection('chainhook').insertOne({ tx: tx, block: block, a: url, response: responseData})

  } catch (error) { } 
} 


   
  const createOrder = async () => {
    
    try {
     
      if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) { 

      // await db.collection('chainhook').insertOne({ data: data})

      for (const tx of txs) {
        const call = tx.metadata.description.split("::")[1]

        if (call.startsWith("list-in-ustx")) {
          await updateDb("/admin/list-in-ustx", tx, block, timestamp)
        }
        if (call.startsWith("unlist-in-ustx")) {
          await updateDb("/admin/unlist-in-ustx", tx, block, timestamp)        
        }
        if (call.startsWith("buy-in-ustx")) {
          await updateDb("/admin/buy-in-ustx", tx, block, timestamp)
        }
        if (call.startsWith("transfer")) {

          const events = tx.metadata.receipt.events

          for (const event of events) {
            if (event.data.value.a === "unlist-in-ustx") {await updateDb("/admin/transfer", tx, block, timestamp)}
          }
          
        }
        if (call.startsWith("bridge-many")) {
         await updateDb("/admin/check-minted", tx, block, timestamp)
        }
      }

      const s = {success: ""}

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

