import { Link } from "react-router";
import type { Highlight } from "@ui-app/schemas/highlight.schema";

export function HighlightBubble({ highlight }: { highlight: Highlight }) {
  return (
    <Link
      to={`/profile/highlights/${highlight.id}`}
      className="flex flex-col items-center gap-2"
    >
      <div className="h-20 w-20 overflow-hidden rounded-full border">
        <img
          src={highlight.cover_image_url}
          alt={highlight.title || "Instagram highlight"}
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-sm text-gray-700">{highlight.title}</span>
    </Link>
  );
}
