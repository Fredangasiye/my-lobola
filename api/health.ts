export default function handler(_req: any, res: any) {
  try {
    // Support both Express-like and Node HTTP response
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(200).json({ ok: true });
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true }));
  } catch (_e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false }));
  }
}

export default function handler(_req: any, res: any) {
  res.status(200).json({ ok: true });
}

