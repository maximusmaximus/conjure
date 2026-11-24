import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { ConjureApp } from "@/components/conjure/app";

const defaults = { room: "", watch: false, debug: 0 };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    room: typeof search.room === "string" ? search.room.toUpperCase().slice(0, 4) : "",
    watch: search.watch === "1" || search.watch === "true" || search.watch === true,
    debug: search.debug === 1 || search.debug === "1" || search.debug === "true" || search.debug === true ? 1 : 0,
  }),
  search: {
    middlewares: [stripSearchParams(defaults)],
  },
  component: Home,
});

function Home() {
  const { room, watch, debug } = Route.useSearch();
  return <ConjureApp invite={room} watch={watch} debug={debug === 1} />;
}
