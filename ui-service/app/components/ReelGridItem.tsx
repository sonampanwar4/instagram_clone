import type { Reel } from "@ui-app/schemas/reel.schema";

export function ReelGridItem({ reel }: { reel: Reel }) {
  return (
    <div className='relative w-full aspect-[9/16] overflow-hidden bg-gray-200'>
      <video width="320" height="240" controls className='w-full h-full object-cover'>
        <source src={reel.video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className='absolute bottom-2 left-2 text-white text-sm font-semibold flex items-center'>
        ▶️ {reel.views}
      </div>
    </div>
  );
}