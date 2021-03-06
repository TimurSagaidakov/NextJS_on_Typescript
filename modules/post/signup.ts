import Login from "../../src/interfaces/Login";

export default async (loginData: Login) => {
  try {
    await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(loginData)
    });
  } catch (e) {
    console.log('Произошла ошибка при записывании в базу данных', e);
  }
}
