import { type Request, type Response, Router } from "express";

const router: Router = Router();

// Dummy user routes
router.get("/users", (_req: Request, res: Response) => {
  res.json({ message: "This is a dummy user route", users: [] });
});

router.post("/users", (req: Request, res: Response) => {
  res.json({ message: "User created successfully (dummy)", user: req.body });
});

// Export the router
export default router;
