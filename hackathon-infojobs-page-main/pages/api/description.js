import { getDescription } from "@/app/services/getJobs";

export default async function handlerDescription(req, res) {
   const { id } = req.query;
   const description = await getDescription(id);
  return res.status(200).json(description);
}