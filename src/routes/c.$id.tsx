import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ConjureApp, loadReplay, PageFrame } from "@/components/conjure/app";
import type { Creation } from "@/conjure/storage";
import { t } from "@/i18n";

export const Route = createFileRoute("/c/$id")({
  validateSearch: (search: Record<string, unknown>) => ({
    d: typeof search.d === "string" ? search.d : "",
  }),
  component: ReplayPage,
});

function ReplayPage() {
  const { id } = Route.useParams();
  const { d } = Route.useSearch();
  const [creation, setCreation] = useState<Creation | null | "wait">("wait");
  useEffect(() => {
    setCreation(loadReplay(id, d));
  }, [id, d]);
  if (creation === "wait") {
    return (
      <PageFrame title={t("app.title")}>
        <p>{t("replay")}</p>
      </PageFrame>
    );
  }
  if (!creation) {
    return (
      <PageFrame title={t("notFound")}>
        <p>{t("empty")}</p>
      </PageFrame>
    );
  }
  return <ConjureApp replay={creation} />;
}
