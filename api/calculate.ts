import { calculateLobola } from "../shared/calculator";
import { calculatorFormSchema } from "../shared/schema";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const data = req.body ?? {};
    const validated = calculatorFormSchema.parse(data);
    const result = calculateLobola(validated);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error?.message || "Invalid request" });
  }
}

