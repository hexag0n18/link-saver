import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import {dirname, join} from 'path'
import routes from "./routes/links.routes.js";
import { fileURLToPath } from "url";
import { PORT } from "./config.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

const whitelist = ["http://localhost:4141", "http://localhost:"+PORT];
const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

app.use(cors(corsOptions));

// MIDDLEWARES
app.use(express.json());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "./upload",
	})
);

// ROUTES
app.use(routes);

app.use(express.static(join(__dirname, '../client/dist')))
console.log(__dirname)

export default app;
