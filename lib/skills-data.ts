import { db } from "./firebase";

export interface Skill {
  id: string;
  title: string;
  description: string;
  /** Firebase Storage path (e.g. "skills/my-skill.md") or direct https:// URL */
  fileUrl: string;
  isPremium: boolean;
  /** Price in cents — only relevant when isPremium is true */
  price: number;
  tags: string[];
  type: "skill" | "agent";
  createdAt: string;
}

export interface Purchase {
  id: string;
  name: string;
  email: string;
  skillId: string;
  stripeSessionId: string;
  /** Amount paid in cents */
  amount: number;
  status: "success" | "failed";
  createdAt: string;
}

export interface CustomRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  requirement: string;
  stripeSessionId: string;
  status: "pending_payment" | "pending" | "completed" | "cancelled";
  createdAt: string;
}

// Skills

export async function getSkills(): Promise<Skill[]> {
  const snap = await db
    .collection("skills")
    .where("isPremium", "==", true)
    .get();
  return snap.docs.map((doc) => doc.data() as Skill);
}

export async function getSkillById(id: string): Promise<Skill | undefined> {
  const doc = await db.collection("skills").doc(id).get();
  if (!doc.exists) return undefined;
  return doc.data() as Skill;
}

// Purchases

export async function createPurchase(
  data: Omit<Purchase, "id" | "createdAt">,
): Promise<Purchase> {
  const purchase: Purchase = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await db.collection("purchases").doc(purchase.id).set(purchase);
  return purchase;
}

export async function getPurchases(): Promise<Purchase[]> {
  const snap = await db.collection("purchases").get();
  return snap.docs
    .map((doc) => doc.data() as Purchase)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export async function getPurchaseBySessionId(
  sessionId: string,
): Promise<Purchase | null> {
  const snap = await db
    .collection("purchases")
    .where("stripeSessionId", "==", sessionId)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return snap.docs[0].data() as Purchase;
}

// Custom Requests

export async function createCustomRequest(
  data: Omit<CustomRequest, "id" | "createdAt">,
): Promise<CustomRequest> {
  const req: CustomRequest = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await db.collection("customRequests").doc(req.id).set(req);
  return req;
}

export async function getCustomRequests(): Promise<CustomRequest[]> {
  const snap = await db.collection("customRequests").get();
  return snap.docs.map((doc) => doc.data() as CustomRequest);
}

export async function getCustomRequestById(
  id: string,
): Promise<CustomRequest | null> {
  const doc = await db.collection("customRequests").doc(id).get();
  if (!doc.exists) return null;
  return doc.data() as CustomRequest;
}

export async function updateCustomRequestStatus(
  id: string,
  status: CustomRequest["status"],
  stripeSessionId?: string,
): Promise<void> {
  const update: Partial<CustomRequest> = { status };
  if (stripeSessionId !== undefined) update.stripeSessionId = stripeSessionId;
  await db.collection("customRequests").doc(id).update(update);
}
