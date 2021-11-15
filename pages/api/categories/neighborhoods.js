import mongo from "../../../server/mongo"

export default async function handler(req, res) {
  const db = await mongo()
  const neighborhoods = db.collection('neighborhoods')
  const names = await neighborhoods.distinct('name')
  res.status(200).json(names)
}
