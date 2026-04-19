import { getAvailableSlots } from "@/lib/data";

export async function GET() {
  const slots = await getAvailableSlots();
  return Response.json(slots);
}
