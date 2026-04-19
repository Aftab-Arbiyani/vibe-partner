import { getSlots, createSlot, deleteSlot } from "@/lib/data";

export async function GET() {
  const slots = await getSlots();
  return Response.json(slots);
}

export async function POST(request: Request) {
  const { date, startTime, endTime } = await request.json();

  if (!date || !startTime || !endTime) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const slot = await createSlot({ date, startTime, endTime });
  return Response.json(slot, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const deleted = await deleteSlot(id);
  if (!deleted) return Response.json({ error: "Slot not found" }, { status: 404 });

  return Response.json({ success: true });
}
