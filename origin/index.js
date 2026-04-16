import express from "express";

const app = express();
app.use(express.json());

const QUOTES = [
  { id: 1, text: "The best way to predict the future is to invent it.", author: "Alan Kay", tier: "free" },
  { id: 2, text: "Talk is cheap. Show me the code.", author: "Linus Torvalds", tier: "free" },
  { id: 3, text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", tier: "free" },
  { id: 4, text: "First, solve the problem. Then, write the code.", author: "John Johnson", tier: "free" },
  { id: 5, text: "The art of programming is the art of organizing complexity.", author: "Edsger Dijkstra", tier: "premium" },
  { id: 6, text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates", tier: "premium" },
  { id: 7, text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson", tier: "premium" },
  { id: 8, text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", tier: "premium" },
  { id: 9, text: "Price is what you pay. Value is what you get.", author: "Warren Buffett", tier: "premium" },
  { id: 10, text: "The value of an idea lies in the using of it.", author: "Thomas Edison", tier: "premium" },
];

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// Free quote — no payment needed
app.get("/api/quote/free", (_req, res) => {
  const free = QUOTES.filter((q) => q.tier === "free");
  res.json(free[Math.floor(Math.random() * free.length)]);
});

// Premium quote — should be behind a paywall (gate or middleware)
app.get("/api/quote/premium", (_req, res) => {
  const premium = QUOTES.filter((q) => q.tier === "premium");
  res.json(premium[Math.floor(Math.random() * premium.length)]);
});

// Report — should be behind a paywall (gate or middleware)
app.post("/api/report", (req, res) => {
  const { topic } = req.body || {};
  res.json({
    topic: topic || "general",
    summary: `Analysis of "${topic || "general"}". In production, this would do real work.`,
    generated_at: new Date().toISOString(),
  });
});

const PORT = parseInt(process.env.PORT || "3000", 10);
app.listen(PORT, () => console.log(`origin listening on :${PORT}`));
