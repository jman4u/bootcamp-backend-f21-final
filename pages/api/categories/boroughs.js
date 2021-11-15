import mongo from "../../../server/mongo"

export default async function handler(req, res) {
  const db = await mongo()
  const restaurants = db.collection('restaurants')
  const boroughs = await restaurants.distinct('borough')
  res.status(200).json(boroughs)
}
