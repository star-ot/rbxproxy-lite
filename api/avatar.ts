import { Router, Request, Response } from 'express';
import axios, { AxiosRequestHeaders } from 'axios';

const router = Router();
const ROBLOX_AVATAR_API_BASE_URL = 'https://avatar.roblox.com';

router.use('/*', async (req: Request, res: Response) => {
    try {
        const endpoint = req.params[0]; // Capture the full path after /friends/
        const robloxResponse = await axios({
            method: req.method,
            url: `${ROBLOX_AVATAR_API_BASE_URL}/${endpoint}`,
            headers: {
                ...req.headers as AxiosRequestHeaders,
                host: 'avatar.roblox.com', // Ensure the correct host header
            },
            data: req.body,
        });
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
