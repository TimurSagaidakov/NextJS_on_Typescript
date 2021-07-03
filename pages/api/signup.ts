import { NextApiRequest, NextApiResponse } from "next";
import { hash } from 'bcrypt';
import { knexInstance } from "../../database/connect";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, password } = req.body;
      if (password?.length < 4 || name?.length < 6) {
        return res.status(500).json({message: 'Ошибка в заполнении данных регистрации'});
      }
      
      hash(password, 10, async function(err, hash) {
        const checkUser = await knexInstance.table('users').select('name').where('name', name).first();
        if (checkUser?.name === name) {
          res.json({message: 'Такой пользователь уже есть. Выберете другое имя'})
        } else {
          await knexInstance.table('users').insert({ name, password, hash });
          res.json({message: 'Пользователь успешно создан'});
        }
        res.status(200).end();
    });
    } catch (e) {
      console.log('Произошла ошибка на бэке - ', e);
      res.status(500)
      res.end()
    }
  } else {
    res.json({message: 'Данное апи поддерживает только POST запросы'});
  }
}