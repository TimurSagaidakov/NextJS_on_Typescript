import { NextPageContext } from "next";

export default async (cookie: any) => {
  try {
    const resp:Response = await fetch('http://localhost:3000/api/auth', {
      headers: {
        cookie
      }
    });
    return resp.json();
  } catch (e) {
    console.log(e);
  }
}