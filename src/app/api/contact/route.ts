import { handleContact } from "@/lib/contact";

export async function POST(req: Request): Promise<Response> {
  return handleContact(req);
}
