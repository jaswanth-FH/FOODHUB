import express from "express";
import bootstrapRoute from "./routes/bootstrap.route";
import { errorHandler } from "./utils/errorHandler";

import cors  from "cors";
import clientsRoute from "./routes/clients.route";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", bootstrapRoute);

app.use("/", clientsRoute);

app.use(errorHandler);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Bootstrap service running on port ${PORT}`);
});

