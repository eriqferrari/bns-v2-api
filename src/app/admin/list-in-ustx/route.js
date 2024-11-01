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


   const insertTx = async (tx, maps) => {
       try {
         const sender = tx.metadata.sender
         const print = tx.metadata.receipt.events[0].data.value
         const map = print.id.toString()
         const stxmap =  await db.collection('stxmaps').find({map: print.id}).project({_id: 0, categories: 1, rank: 1, txs: 1}).toArray()
         if (maps.includes(map)) {
         await db.collection('nftmarket')
         .updateOne({map: map, status: "Available"},
         { $set: {  status: "Expired", lastUpdateDate: new Date(timestamp*1000) } })


         }
         
         await db.collection('nftmarket')
         .insertOne({ 
            seller: sender,
            tx: tx.transaction_identifier.hash,
            map: map.toString(),
            price: print.price,
            creationDate: new Date(timestamp),
            status: "Available",
            source: print.commission,
            lastUpdateDate: new Date(timestamp*1000),
            categories: stxmap[0].categories,
            rank: stxmap[0].rank,
            txs: stxmap[0].txs
         })
         
         }catch(err) {await db.collection('chainhook').insertOne({ tx: tx, block: block, a: "list-in-ustx", error: err})} 
   }

   const updateCreatedTx = async (hash) => {
     try {


         
         const print = tx.metadata.receipt.events[0].data.value
         const stxmap =  await dbmap.collection('stxmaps').find({map: print.id}).project({_id: 0, categories: 1, rank: 1, txs: 1}).toArray()

         await db.collection('nftmarket')
         .updateOne({ tx:  hash},
         { $set: {  
          status: "Available", 
          source: process.env.NEXT_PUBLIC_STXMAP + ".stxmapco-v1-commission", 
          lastUpdateDate: new Date(timestamp*1000),
          categories: stxmap[0].categories, 
          rank: stxmap[0].rank,
          txs: stxmap[0].txs
        } })
         }catch(err) {await db.collection('chainhook').insertOne({ tx: tx, block: block, a: "list-in-ustx", error: err})} 
   }

   const deleteTx = async (hash) => {
     try {        
         await db.collection('nftmarket').deleteOne({tx:  hash})
         }catch(err) {await db.collection('chainhook').insertOne({ tx: tx, block: block, a: "delete-list-in-ustx", error: err})} 
   }

  const createOrder = async () => {
    
    try {
     
      if (authToken && authToken === process.env.NEXT_PUBLIC_AUTH_TOKEN) { 

      const query = {status: { $in: ['Created', 'Available'] }}
      const created = await db.collection('nftmarket').find(query).project({tx: 1, _id: 0, map: 1}).toArray()
      const createdTxs = []
      const availableMaps = []

      for (const obj of created) {
        createdTxs.push(obj.tx)
        availableMaps.push(obj.map)
      }

      // for (const tx of txs) {
         const hash = tx.transaction_identifier.hash
         var found = false
         if (tx.metadata.result === "(ok true)") {
          for (const cr of createdTxs) {
            if (cr === hash) {
                found = true; 
                 await updateCreatedTx(hash); }
          }
          if (!found) {await insertTx(tx, availableMaps)}
          
        } else  { await deleteTx(hash)}
    //  }

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

