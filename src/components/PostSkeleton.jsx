const PostSkeleton = () => {
  return (
    <div className='mb-4 min-h-[300px] w-full max-w-[548px] animate-pulse rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-sm dark:border-gray-200/30 dark:bg-black'>
      {/* Profile Section */}
      <div className='flex items-center space-x-3'>
        <div className='h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-300/20'></div>
        <div className='flex-1 space-y-2'>
          <div className='h-4 w-32 rounded bg-gray-300 dark:bg-gray-300/20'></div>
          <div className='h-3 w-20 rounded bg-gray-300 dark:bg-gray-300/20'></div>
        </div>
      </div>

      {/* Post Content */}
      <div className='mt-4 space-y-3'>
        <div className='h-4 w-full rounded bg-gray-300 dark:bg-gray-300/20'></div>
        <div className='h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-300/20'></div>
        <div className='h-4 w-4/6 rounded bg-gray-300 dark:bg-gray-300/20'></div>
      </div>

      {/* Image Placeholder */}
      <div className='mt-4 h-40 w-full rounded bg-gray-300 dark:bg-gray-300/20'></div>

      {/* Like Button */}
      <div className='mt-4 h-6 w-16 rounded bg-gray-300 dark:bg-gray-300/20'></div>
    </div>
  );
};

export default PostSkeleton;
