import { NextApiRequest, NextApiResponse } from "next";
import { hash } from 'bcrypt';
import { knexInstance } from "../../database/connect";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, url } = req.body;
      await knexInstance.table('users').where('id', userId).update({ image: url });
      res.status(200).json({message: 'Обновление аватара удалось', url});
    } catch (e) {
      console.log('Произошла ошибка на бэке - ', e);
      res.status(500).json({message: 'Обновление аватара не удалось'});
    }
  } else {
    res.json({message: 'Данное апи поддерживает только POST запросы'});
  }
}