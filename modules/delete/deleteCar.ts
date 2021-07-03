export default async (id: number) => {
  try {
    await fetch('http://localhost:3000/api/cars', {
      method: 'DELETE',
      body: JSON.stringify(id)
    });
  } catch (e) {
    console.log('Произошла ошибка при удалении машины из базы', e);
  }
}