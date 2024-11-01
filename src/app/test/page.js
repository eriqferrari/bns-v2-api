"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link"




export default function Vote() {



const createOrder = async () => {

  try {

    


    const data = {id: 3, quantity: 5 };
    const response = await fetch('/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_AUTH_TOKEN,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch: ' + response.status);
    }

    const responseData = await response.json();
    console.log(responseData);

  } catch (error) {
    console.error('Error posting data:', error);
    // Handle specific cases
    if (error instanceof SyntaxError) {
      // JSON parsing error
      console.error('Invalid JSON in response');
    } else {
      // Other errors
      throw new Error('Internal server error');
    }
  }
};



const missing = [ 171740, 171763, 171804 ]




const first = missing.slice(0,25)

  
  return (
       
      <main className={styles.main}>
      <h1>Community Poll</h1>

      <button onClick={() => { createOrder(); }} >Mint Missing</button> :


      </main>

  );
}
