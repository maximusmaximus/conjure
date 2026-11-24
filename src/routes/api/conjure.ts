import { createFileRoute } from "@tanstack/react-router";
import { handleConjure } from "@/conjure/room.server";

const handle = ({ request }: { request: Request }) => handleConjure(request);

export const Route = createFileRoute("/api/conjure")({
  server: { handlers: { GET: handle, POST: handle } },
});
