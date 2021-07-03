export default async (cookie: any) => {
  const res:Response = await fetch('http://localhost:3000/api/users', {
    headers: {
      cookie
    }
  });
  if (res.status === 200) {
    return await res.json();
  } else {    
    throw await res.json();
  }
}