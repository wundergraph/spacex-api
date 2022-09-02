/*eslint-disable */
import MongoClient from 'mongodb';

const dbPass = process.env.DB_PASS
const url =
  `mongodb+srv://wg:${dbPass}@spacex.loqbbog.mongodb.net/spacex-api`;

export const getDB = async () => {
  const client = await MongoClient.connect(
    url,
    { poolSize: 20, useNewUrlParser: true }
  );

  return client.db('spacex-api');
};
