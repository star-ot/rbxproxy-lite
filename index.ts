import express from 'express';
import avatarRouter from './api/avatar';
import catalogRouter from './api/catalog';
import friendsRouter from './api/friends';
import gamesRouter from './api/games';
import groupsRouter from './api/groups';
import inventoryRouter from './api/inventory';
import thumbnailsRouter from './api/thumbnails';
import usersRouter from './api/users';

const app = express();

app.use(express.json());

app.use('/avatar', avatarRouter);
app.use('/catalog', catalogRouter);
app.use('/friends', friendsRouter);
app.use('/games', gamesRouter);
app.use('/groups', groupsRouter);
app.use('/inventory', inventoryRouter);
app.use('/thumbnails', thumbnailsRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});

export default app;
