import type { Post } from "@ui-app/schemas/post.schema";

export function PostCard({ post, contextLabel }: { post: Post, contextLabel?: string }) {
  return (
    <div className='w-full max-w-lg mx-auto rounded-lg overflow-hidden border bg-white mb-6'>
      <div className='p-4'>
        <p className='font-bold'>webeet_user</p>
        {contextLabel && (
          <p className="text-xs text-gray-500">{contextLabel}</p>
        )}
      </div>
      <img
        src={post.img_url}
        alt={post.caption || "Instagram post"}
        className='w-full h-auto aspect-square object-cover'
      />
      <div className='p-4'>
        <p>
          
          <span className='font-bold mr-2'>webeet_user</span>
          {post.caption}
        </p>
      </div>
    </div>
  );
}