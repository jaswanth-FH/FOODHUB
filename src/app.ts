import express from "express";
import bootstrapRoute from "./routes/bootstrap.route";

const app = express();

app.use(express.json());
app.use("/", bootstrapRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Bootstrap service running on port ${PORT}`);
});
