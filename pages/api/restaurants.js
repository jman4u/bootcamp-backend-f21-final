// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongo from '../../server/mongo'

export default async function handler(req, res) {
  
  const db = await mongo()
  const restaurants = db.collection('restaurants')
  //const results = await restaurants.findOne()
  //console.log(results)

  const cuisine = req.query.cuisine;
  const borough = req.query.borough;


  let specifications = {};

  if (cuisine) {
    specifications['cuisine'] = cuisine;
  }
  if (borough) {
    specifications['borough'] = borough;
  }

  const sorting = req.query.sort_by;
  let sortRestaurants = {};

  if (sorting) {
    const val = sorting.split('.')[1]
    if (val === 'asc') {
      sortRestaurants['grades.0.score'] = 1
    } else {
      sortRestaurants['grades.0.score'] = -1
    }
    specifications['grades.0.score'] = {$gt : 0};
  }

  let page = req.query.page;
  let page_size = req.query.page_Size;

  if (!page_size) {
    page_size = 10;
  } else {
    page_size = parseInt(page_size);
  }

  if (!page) {
    page = 1;
  } else {
    page = parseInt(page);
  }

  const output = await restaurants.find(specifications)
    .sort(sortRestaurants)
    .skip(page_size * (page - 1))
    .limit(page_size)
    .toArray();

  res.status(200).json(output)
}
