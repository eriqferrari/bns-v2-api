import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
	


  var name = params.name


  var items = []
 

   return new NextResponse(
  JSON.stringify({items: items,}),
			{ status: 200, 
			headers: headers,
   	});
 

}

