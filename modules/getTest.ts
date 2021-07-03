export default async () => {
  const res:Response = await fetch('http://localhost:3000/api/vehicles');
  const data = res.json();
  
  return data;
}