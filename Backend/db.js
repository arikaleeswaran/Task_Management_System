const Pool = require('pg').Pool;

const connectionString = 'postgres://postgres.cnciibtshwqcautrtspt:ari@SupabaseDB@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

// Create a new pool using the connection string
const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;