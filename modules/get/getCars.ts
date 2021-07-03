export default async () => {
  const res:Response = await fetch('http://localhost:3000/api/cars');
  if (res.status === 200) {
    return res.json();
  } else {    
    throw await res.json();
  }
}