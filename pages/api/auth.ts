import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import JWTtoken from "../../database/JWTtoken";

export default async function (req: NextApiRequest, res: NextApiResponse) { 
  verify(req.cookies.auth_token, JWTtoken, async function(err, decoded) {
    
    if (!err && decoded) {
      res.json(decoded);
    }
    res.status(401).json({message: 'Вы не авторизованы'});
  })
};