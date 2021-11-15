import mongo from "../../../server/mongo"

export default async function handler(req, res) {
  const db = await mongo()
  const restaurants = db.collection('restaurants')
  const cuisines = await restaurants.distinct('cuisine')
  res.status(200).json(cuisines)
}
