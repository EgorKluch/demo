import express from 'express';
import path from "path";
import fs from 'fs';
import renderer from "./renderer";
import createApp from "#/server/createApp";
import errorHandler from "#/server/middlewares/errorHandler";

const app = createApp();
const appDirectory = fs.realpathSync(process.cwd());
const clientStats = path.resolve(appDirectory, 'build/public/loadable-stats.json');


app.use('/public', express.static(path.resolve(appDirectory, 'build/public')));

app.get('*', renderer({ clientStats, hot: false }) as any);

errorHandler(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
});
