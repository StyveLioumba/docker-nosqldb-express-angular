import ip from 'ip';
import axios from 'axios';
import express from 'express';
import redis from 'redis';
import cassandra from 'cassandra-driver';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const baseURL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

const clientRedis = redis.createClient({
  url: `redis://cache:${REDIS_PORT}`,
});

const clientCassandra = new cassandra.Client({ 
  contactPoints: ['dbCassandra'],
  localDataCenter: 'datacenter1',
  keyspace: 'ygoprodeck',
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

    const shuffled = response.data.sort(() => Math.random() - 0.5);

    console.log(shuffled);

    console.log('is loading from API');
    await clientRedis.set('data', JSON.stringify(response.data));

    console.log('loading finished');
    res.status(200).json(response.data);

  } catch (error) {
    console.error(error);
  }
  
});

app.get('/deck', async(req, res) => {

  clientCassandra.connect().then(() => {

    const query = 'SELECT * FROM ygoprodeck.deck';

    clientCassandra.execute(query)
    .then(async (result) => {
        res.status(200).json({data:result.rows});
      });

  }).catch((err) => {
    console.log('Error connecting to Cassandra', err);
  });

});

app.post('/deck', async(req, res) => {

  clientCassandra.connect().then( () => {

    const query = 'INSERT into ygoprodeck.deck (userid, image_url,name,last_update_timestamp) VALUES (?, ?, ?, ?)';

    const params = [req.body.userid,req.body.image_url,req.body.name, Date.now()];
    
    clientCassandra.execute(query, params, { prepare: true })
    .then(result => {
      console.log(result);
      res.status(200).json({data:{message:"added"}});
    });

  }).catch((err) => {
    console.log('Error connecting to Cassandra', err);
  });

});

app.delete('/deck/:id', async(req, res) => {

  clientCassandra.connect().then( () => {

    const query = 'DELETE FROM ygoprodeck.deck WHERE userid = ?';

    const params = [req.params.id];
    
    clientCassandra.execute(query, params, { prepare: true })
    .then(result => {
      console.log(result);
      res.status(200).json({data:{message:"deleted"}});
    });

  }).catch((err) => {
    console.log('Error connecting to Cassandra', err);
  });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
 });