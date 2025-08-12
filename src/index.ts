import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelizeConnection from "./core/database/models";
import router from "./routes";
dotenv.config();

const app: Express = express();
app.use(express.json({ limit: "20mb" }));
const port = process.env.EXPRESS_SERVER_PORT || 4050;

app.use(cors({
  origin: "*"
}));

app.use("/api", router);

const startServer = async () => {
  try {
    await sequelizeConnection.sync({ force: false }); // Sync database
    console.log("Database connected!");
    // setupAssociations(); // Set up associations after sync
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();