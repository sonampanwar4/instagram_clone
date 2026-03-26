import type { Highlight } from "@ui-app/schemas/highlight.schema";

type HighlightStoryProps = {
  highlight: Highlight;
};

export function HighlightStory({ highlight }: HighlightStoryProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-64 w-64 overflow-hidden rounded-lg">
        <img
          src={highlight.cover_image_url}
          alt={highlight.title}
          className="h-full w-full object-cover"
        />
      </div>

      <h2 className="text-xl font-semibold">{highlight.title}</h2>
    </div>
  );
}
