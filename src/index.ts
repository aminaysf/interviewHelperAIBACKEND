import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelizeConnection from "./core/database/models";
import router from "./routes";
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const app: Express = express();
// app.use(express.json({ limit: "20mb" }));
// const port = process.env.EXPRESS_SERVER_PORT || 4050;

// app.use(cors({
//   origin: "*"
// }));

// app.use("/api", router);

// const startServer = async () => {
//   try {
//     await sequelizeConnection.sync({ force: false }); // Sync database
//     console.log("Database connected!");
//     // setupAssociations(); // Set up associations after sync
//     app.listen(port, () => {
//       console.log(`[server]: Server is running at http://localhost:${port}`);
//     });
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// startServer();


const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors()); // Enable CORS if your frontend will call this API

// Sync models (optional; use migrations in production for safety)
sequelizeConnection.sync({ alter: true }).then(() => {
  console.log('Database synced');
}).catch(err => console.error('Sync error:', err));

// Add routes
// app.use('/users', userRoutes); // Example

// Example route for testing
app.get('/', (req, res) => {
  res.send('Backend is live!');
});

export default app; // Critical: Export the app for Vercel