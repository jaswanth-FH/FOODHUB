import express from "express";
import bootstrapRoute from "./routes/bootstrap.route";
import { errorHandler } from "./utils/errorHandler";
import clientsRoute from "./routes/clients.route";
const app = express();
app.use(errorHandler);
app.use(express.json());

app.use("/", bootstrapRoute);

app.use("/", clientsRoute);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Bootstrap service running on port ${PORT}`);
});

