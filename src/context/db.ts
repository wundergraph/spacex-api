/*eslint-disable */
import {MongoClient, ServerApiVersion} from 'mongodb';

const dbPass = process.env.DB_PASS

const uri = `mongodb+srv://wg:${dbPass}@spacex.loqbbog.mongodb.net/?retryWrites=true&w=majority`;

export const getDB = async () => {
  const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

  try {
    console.log('Connecting... to database')
    await client.connect()
    console.log('Connected to database')
  } catch (e) {
    console.error("Could not connect to database", e)
    return client.close();
  }

  return client.db('spacex-api');
};