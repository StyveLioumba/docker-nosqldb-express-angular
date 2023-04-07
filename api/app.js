import ip from 'ip';
import axios from 'axios';
import express from 'express';
import redis from 'redis';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const baseURL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

const clientRedis = redis.createClient({
  url: `redis://cache:${REDIS_PORT}`,
});

clientRedis.connect().then(() => {
  console.log(`Connected to Redis on ${REDIS_PORT}`);
}).catch((err) => {
  console.log('Error connecting to Redis', err);
});


app.use(cors({'origin': '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async(req, res) => {

  const value = await clientRedis.get('data');
  if (value) {
    console.log("!!! Cache Hit !!!");

    res.status(200).json(JSON.parse(value));
    return;
  }

  try {
    const response = await axios.get(baseURL);

    console.log('is loading from API');
    await clientRedis.set('data', JSON.stringify(response.data));

    console.log('loading finished');
    res.status(200).json(response.data);

  } catch (error) {
    console.error(error);
  }
  
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
 });
