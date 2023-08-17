import React from 'react';
import { useQuery, useMutation } from 'react-query';
import { deleteBlog, getBlogs } from '../api/blog_api';

const BlogList = () => {
  const { data: blogs, isLoading } = useQuery('blogs', getBlogs);

  const deleteMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">Create New Blog</button>
      <ul>
        {blogs?.map((blog: any) => (
          <li key={blog.id} className="flex items-center mb-2">
            <div className="flex-grow">{blog.title}</div>
            <div className="flex">
              <button
                onClick={() => handleDelete(blog.id)}
                className="mr-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button className="bg-green-500 text-white px-2 py-1 rounded">Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;