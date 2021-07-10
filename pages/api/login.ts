import { NextApiRequest, NextApiResponse } from "next";
import { compare } from 'bcrypt';
import { knexInstance } from "../../database/connect";
import { sign } from 'jsonwebtoken';
import JWTtoken from "../../database/JWTtoken";
import cookie from 'cookie';

interface User {
  id: number,
  name: string,
  hash: string,
  email: string,
  first_name: string,
  last_name: string,
  birthdate: string,
}
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, password: enterPassword } = req.body;
      const data:User = await knexInstance.table('users').where('name', name).first('name', 'id', 'hash');
      if (!data) {
        res.status(500).json({message: 'Такого пользователя не существует'});
      }
      compare(enterPassword, data.hash, function(err, result) {
        if (err) {
          res.status(500).json({message: 'Ошибка авторизации'})
        }
        const userData = {
          id: data.id,
          name: data.first_name,
        };
        const jsonwebtoken = sign(userData, JWTtoken, { expiresIn: '10h' });
        res.setHeader('Set-Cookie', cookie.serialize('auth_token', jsonwebtoken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 36000,
          path: '/',
        }));

        res.json({message: result ? 'Вы авторизованы' : 'Неправильный логин или пароль'})
        res.status(200)
    });
    } catch (e) {
      res.status(500).json({message: 'Что то пошло не так'})
    }
  } else {
    res.status(401).json({message: 'Данное апи поддерживает только POST запросы'});
  }
}