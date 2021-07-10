export default async (media: FileList | [], userId: number | null) => {
  if (!userId) {
    return {message: 'Вы не авторизованы'};
  }
  const data = new FormData();
    Array.from(media).forEach((file, index) => {
      data.append('file', file)
    });
    data.append('upload_preset', 'image_store');
    data.append('cloud_name', 'timur90');
    try {
      const post = await fetch('https://api.cloudinary.com/v1_1/timur90/image/upload', {
        method: 'POST',
        body: data,
      });
      const responsePost = await post.json();
      
      const responseWrite = await fetch('http://localhost:3000/api/upload_avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({userId, url: responsePost.url})
      });

      return responseWrite.json();
    } catch (e) {
      return e;
    }
}