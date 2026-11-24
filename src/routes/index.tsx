import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { ConjureApp } from "@/components/conjure/app";

const defaults = { room: "", watch: false };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    room: typeof search.room === "string" ? search.room.toUpperCase().slice(0, 4) : "",
    watch: search.watch === "1" || search.watch === "true" || search.watch === true,
  }),
  search: {
    middlewares: [stripSearchParams(defaults)],
  },
  component: Home,
});

function Home() {
  const { room, watch } = Route.useSearch();
  return <ConjureApp invite={room} watch={watch} />;
}
