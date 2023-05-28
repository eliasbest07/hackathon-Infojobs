import { getJobs } from "@/app/services/getJobs";

export default async function handlerDescription(req, res) {
   const { url } = req.query;
   const lista = await getJobs(url);
   return res.status(200).json(lista.data);
}