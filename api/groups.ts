import { Router, Request, Response } from 'express';
import axios, { AxiosRequestHeaders } from 'axios';
import querystring from 'querystring';

const router = Router();
const ROBLOX_GAMES_API_BASE_URL = 'https://groups.roblox.com';

router.use('/*', async (req: Request, res: Response) => {
    try {
        const endpoint = req.params[0]; // Capture the full path after /games/
        
        // Serialize query parameters from the original request
        const queryParams = querystring.stringify(req.query);
        
        // Build the full URL with the endpoint and query parameters
        const url = `${ROBLOX_GAMES_API_BASE_URL}/${endpoint}${queryParams ? '?' + queryParams : ''}`;
        
        // Forward the request to the Roblox API
        const robloxResponse = await axios({
            method: req.method,
            url: url,
            headers: {
                ...req.headers as AxiosRequestHeaders,
                host: 'groups.roblox.com', // Ensure the correct host header
            },
            data: req.body,
        });

        // Respond with the data from the Roblox API
        res.status(robloxResponse.status).json(robloxResponse.data);
    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'An error occurred while processing the request.' });
        }
    }
});

export default router;
