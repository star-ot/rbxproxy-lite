import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

const app = express();
const PORT = 3000;
const RETRIES = 3;
const TIMEOUT = 5000;

app.use(express.json());

app.use(async (req: Request, res: Response) => {
    const pathSegments = req.path.split('/').filter(Boolean);

    if (pathSegments.length < 2) {
        return res.status(400).send('URL format invalid.');
    }

    const targetHost = pathSegments[0];
    const targetPath = pathSegments.slice(1).join('/');
    const targetUrl = `https://${targetHost}.roblox.com/${targetPath}`;

    try {
        const response = await makeRequest(req, targetUrl, 1);
        res.status(response.status).set(response.headers).send(response.data);
    } catch (err) {
        res.status(500).send('Proxy failed to connect. Please try again.');
    }
});

async function makeRequest(req: Request, url: string, attempt: number): Promise<AxiosResponse<any>> {
    if (attempt > RETRIES) {
        throw new Error('Max retries reached');
    }

    try {
        const response = await axios({
            url,
            method: req.method,
            headers: {
                ...req.headers,
                host: `${req.path.split('/')[1]}.roblox.com`,
                'User-Agent': 'RoProxy',
            },
            data: req.body,
            timeout: TIMEOUT,
        });

        return response;
    } catch (err) {
        if (attempt < RETRIES) {
            return await makeRequest(req, url, attempt + 1);
        }
        throw err;
    }
}

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});

export default app;
