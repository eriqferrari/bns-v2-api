import { NextResponse } from 'next/server'
import getSvg from "./_svg";

export async function GET(req, { params }) {
	
  const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      "Content-Type": "image/svg+xml",
    }
  
  var domain = params.name +"."+ params.namespace
  const svg = getSvg(String(domain));

return new NextResponse(
	svg
	,
	{ status: 200, 
	headers: headers,
   });

}

