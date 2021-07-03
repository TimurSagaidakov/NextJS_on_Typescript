import { NextApiRequest, NextApiResponse } from "next";
import { knexInstance } from "../../database/connect";

export default async function getAllVehicles(req: NextApiRequest, res: NextApiResponse) {
  const test = await knexInstance.select('column_2').table('test_1').first();
  
  return res.json({ number: test.column_2})
}