import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

const app = express();

app.use(express.json());

// Proxy request to Roblox with dynamic URL and parameters
app.use('/:service/*', async (req: Request, res: Response) => {
    const { service } = req.params; // Service name (e.g., inventory, users, etc.)
    const proxyPath = req.params[0]; // Capture the remaining part of the URL (e.g., assets/21070012/owners)
    const query = req.query; // Capture query parameters (e.g., sortOrder, limit)

    try {
        // Build the proxied URL
        const targetUrl = `https://${service}.roblox.com/${proxyPath}`;

        // Make the proxy request using axios
        const response: AxiosResponse = await axios({
            method: req.method,
            url: targetUrl,
            params: query, // Forward the query parameters
            data: req.body, // Forward the request body if present
            headers: {
                ...req.headers,
                'User-Agent': 'RoProxy', // Set a custom User-Agent header
                // Remove specific headers that shouldn't be forwarded
                'Roblox-Id': undefined,
                host: `${service}.roblox.com`, // Ensure the correct host header
            },
        });

        // Forward the response from Roblox to the client
        res.status(response.status).send(response.data);
    } catch (error: any) {
        // Handle errors gracefully
        if (error.response) {
            // If the error has a response from Roblox, forward it
            res.status(error.response.status).send(error.response.data);
        } else {
            // Otherwise, send a general error
            res.status(500).send('Proxy failed to connect. Please try again.');
        }
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});

export default app;
