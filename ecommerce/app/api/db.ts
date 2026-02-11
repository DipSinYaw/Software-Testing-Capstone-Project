import { MongoClient, Db, ServerApiVersion } from "mongodb";

// Use a global variable to store the connection in development
// to prevent connection exhaustion from HMR (Hot Module Replacement).
let cachedClient: MongoClient | null = (global as any).mongoClient || null;
let cachedDb: Db | null = (global as any).mongoDb || null;

export async function connectToDb() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Validate that environment variables are set
  if (!process.env.MONGODB_USER || !process.env.MONGODB_PASS || !process.env.MONGODB_HOST) {
    throw new Error('Please define the MONGODB_USER, MONGODB_PASS, and MONGODB_HOST environment variables');
  }

  // Encode user and password to handle special characters
  const user = encodeURIComponent(process.env.MONGODB_USER);
  const pass = encodeURIComponent(process.env.MONGODB_PASS);
  const host = process.env.MONGODB_HOST; // e.g., 'localhost:27017'

  // Use the standard 'mongodb://' protocol for local/direct connections
  const uri = `mongodb://${user}:${pass}@${host}/?retryWrites=true&w=majority&appName=Cluster0`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  cachedClient = client;
  cachedDb = client.db("ecommerce-nextjs");

  // Cache the connection in the global scope for development
  if (process.env.NODE_ENV === 'development') {
    (global as any).mongoClient = cachedClient;
    (global as any).mongoDb = cachedDb;
  }

  // Return the cached Db instance, not a new one
  return { client: cachedClient, db: cachedDb };
}
