export default async (cookie: any) => {
  try {
    const resp:Response = await fetch('http://localhost:3000/api/auth', {
      headers: {
        cookie
      }
    });
    if (resp.status === 200) {
      return resp.json();
    } else {
      console.log('Ошибка в получение данных пользователя');
      const { message } = await resp.json();
      return {status: resp.status, message};
    }
  } catch (e) {
    console.log(e);
  }
}