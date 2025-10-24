const connect = require('./configs/db');
const app = require('./index');
require('dotenv').config();
const PORT = Number(process.env.PORT) || 5001;

// Start the server and keep the server instance so we can handle listen errors
const server = app.listen(PORT, async () => {
    try {
        await connect();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to DB:', error.message || error);
        // If DB connection fails, shut down the server to avoid running in a broken state
        server.close(() => process.exit(1));
    }
});

// Handle listen errors such as EADDRINUSE
server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the process using it or set a different PORT.`);
        console.error('Example: export PORT=5001  # then restart the server');
        process.exit(1);
    }
    console.error('Server error:', err);
});