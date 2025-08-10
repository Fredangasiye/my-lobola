// Minimal edge-safe handler that always returns ok. Real routes live in api/calculate.ts.
export default function handler(_req: any, res: any) {
  res.status(200).json({ ok: true });
}