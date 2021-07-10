import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import JWTtoken from "../../database/JWTtoken";
import { knexInstance } from "../../database/connect";

export default async function (req: NextApiRequest, res: NextApiResponse) { 
  verify(req.cookies.auth_token, JWTtoken, async function(err, decoded) {
    
    if (!err && decoded) {
      const { id } = decoded;
      if (req.method === "GET") {
        try {
          const userData = await knexInstance.table('users').where('id', id).first('*');
          
          return res.json(userData);
        } catch (e) {
          console.log("ошибка в получении данных пользователя", e);
          return res.status(500).end();
        }
      } else {
        res.json({message: 'Данное API поддерживает только GET запросы'})
      }
    }
    res.status(401).json({message: 'Вы не авторизованы'});
  })
};