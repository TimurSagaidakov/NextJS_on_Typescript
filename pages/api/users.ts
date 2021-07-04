import { authenticated } from "./../../src/utils/authenticated";
import { NextApiRequest, NextApiResponse } from "next";
import { knexInstance } from "../../database/connect";

export default authenticated(async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await knexInstance.select('*').table("users");
  res.json(users);
});
