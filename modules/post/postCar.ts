import Car from "../../src/interfaces/Car";

export default async (carParams: Car) => {
  try {
    await fetch('http://localhost:3000/api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(carParams)
    });
  } catch (e) {
    console.log('Произошла ошибка при записывании в базу данных', e);
  }
}
