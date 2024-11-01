import { NextResponse } from 'next/server'
import clientPromise from "../../components/mongodb"
import { headers } from 'next/headers'
import { cvToJSON, hexToCV } from '@stacks/transactions';


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
   const txs = data.apply[0].transactions
   const block = data.apply[0].block_identifier.index
   const timestamp = data.apply[0].timestamp
   const headerList = headers()
   const authToken = headerList.get("authorization").split("Bearer ")[1]

   const insertDomain = async (obj) => {
       try {
         
         const dom = hexToCV(obj.name.name)
         const tld = hexToCV(obj.name.namespace)
         
         await db.collection('registration')
         .insertOne({ 
            id: obj.id,
            name: dom,
            namespace: tld,
            owner: obj.owner,
            registeredAt: obj["registred-at"],
         })
         
         }catch(err) {await db.collection('errors').insertOne({ tx: tx, block: block, a: "airdrop", error: err})} 
   }
   
  const createOrder = async () => {
    
    try {
     
      if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) { 

      // await db.collection('chainhook').insertOne({ data: data})

      for (const tx of txs) {
        const call = tx.metadata.description.split("::")[1]

        if (call.includes("name-airdrop")) {
          const events = tx.metadata.receipt.events

          for (const event of events) {
            if (event.data.topic === "print") {await insertDomain(event.data.value)}
          }
        }
        if (call.startsWith("list-in-ustx")) {
          // await updateDb("/admin/list-in-ustx", tx, block, timestamp)
        }
        if (call.startsWith("unlist-in-ustx")) {
          // await updateDb("/admin/unlist-in-ustx", tx, block, timestamp)        
        }
        if (call.startsWith("buy-in-ustx")) {
          // await updateDb("/admin/buy-in-ustx", tx, block, timestamp)
        }
        
      }










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

