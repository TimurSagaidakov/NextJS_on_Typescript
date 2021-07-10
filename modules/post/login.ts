import Login from "../../src/interfaces/Login";

export default async (loginData: Login) => {
    const postResponse = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(loginData)
    });
    if (postResponse.status === 200) {
      return {auth: true}
    } else {
      return {auth: false}
    }
    
}