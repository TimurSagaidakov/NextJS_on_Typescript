import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import JWTtoken from "../../database/JWTtoken";

// используем библиотеку jsonwebtoken чтобы проверять куки на токен который формируется в pages\api\login.ts
export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => { 
  verify(req.cookies.auth_token, JWTtoken, async function(err, decoded) {
    if (!err && decoded) {
      return await fn(req, res)
    }
    res.status(401).json({message: 'Вы не авторизованы'})
  })
};

