# RbxProxy Lite

This is a simple non-auth based Node.js application written in TypeScript that acts as a reverse proxy for multiple Roblox API endpoints. The proxy supports dynamic routing based on the path, allowing you to forward requests to the supported roblox apis.

## Features

- **Dynamic Routing:** Automatically routes requests to different Roblox APIs based on the URL path.
- **Express.js:** Lightweight and efficient Node.js framework.
- **TypeScript:** Strongly typed codebase for better maintainability and scalability.

## Supported APIs
This will attempt to forward any requests to specified service after your server URL. /inventory = inventory.roblox.com

## Prerequisites

- Node.js (v14.x or later)
- TypeScript 5.5.x or later
- npm or yarn

## Usage
Utilize a route by specifying the end point after your server URL:
`/avatar/v1/users/340730/avatar`
would route to avatar.roblox.com
while
`/games/v2/users/340730/games/`
routes to games.roblox.com

Use tools like curl, Postman, or even your browser to directly access the endpoint.
Try a GET request to: `https://rbxproxy-lite.vercel.app/games/v2/users/340730/games`

## Local Installation
1. Install requirements
`npm install`
2. Compile to TypeScript
`npx tsc`
3. Run compiled app
`node index.js`

## Deploy on Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/star-ot/rbxproxy-lite)
