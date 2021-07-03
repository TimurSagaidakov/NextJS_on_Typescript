import { NextApiRequest, NextApiResponse } from "next";
import { knexInstance } from "../../database/connect";
import { authenticated } from "../../src/utils/authenticated";

export default authenticated(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, price, model, ls } = req.body;
      await knexInstance.table("cars").insert({ name, price, model, ls });
      res.status(200).end();
    } catch (e) {
      console.log("Произошла ошибка на бэке - ", e);
      res.status(500);
      res.end();
    }
  }
  if (req.method === "GET") {
    try {
      const resp = await knexInstance.select("*").table("cars");

      return res.json(resp);
    } catch (e) {
      console.log("ошибка в получении списка машин", e);
      res.status(500);
      res.end();
    }
  }
  if (req.method === "DELETE") {
    try {
      console.log(req.body);

      await knexInstance.table("cars").where("id", req.body).del();
      res.status(200);
      res.end();
    } catch (e) {
      console.log("Удаление машины не удалось", e);
      res.status(500);
    }
  }
});
