import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { addBlog, updateBlog, deleteBlog, getBlogs } from "../api/blog_api";

const BlogList = () => {
  // Hooks
  // Use form
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  // Use state
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  // Get all blogs
  const { data: blogs, isLoading } = useQuery("blogs", getBlogs);
  // Create, update, and delete mutation
  const addMutation = useMutation(addBlog, { retry: 3 });
  const updateMutation = useMutation(updateBlog, { retry: 3 });
  const deleteMutation = useMutation(deleteBlog, { retry: 3 });
  
  // Responsible for assign adefault value to all fields and open the update model
  const handleUpdate = (blog: {
    id: number;
    title: string;
    content: string;
  }) => {
    // Set the previous value as default
    setValue("id", blog.id);
    setValue("title", blog.title);
    setValue("content", blog.content);
    setOpenUpdate(true);
  };
  // Handle delete
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };
  // Responsible for calling update method when the user clicks update button
  const onUpdateSubmit = (data: {
    id: number;
    title: string;
    content: string;
  }) => {
    updateMutation.mutate(data);
    setOpenUpdate(false);
  };
  // Responsible for calling create api when the user clicks create button
  const onSubmit = (data: { title: string; content: string }) => {
    addMutation.mutate(data);
    setOpenCreate(false);
  };
  // On loading stage
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Return the component
  return (
    <div>
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setOpenCreate(true)}
      >
        Create New
      </button>
      <div>
        {blogs?.map((blog: any) => (
          <div key={blog.id} className="flex items-center my-3 p-7 bg-gray-50 ">
            <div className="flex-grow text-2xl">{blog.title}</div>
            <div className="flex-grow">{blog.content}</div>
            <div className="flex">
              <button
                onClick={() => handleDelete(blog.id)}
                className="mr-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(blog)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {openCreate ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-9/12 my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-2xl font-semibold">Add New BLog</h3>
                  <button
                    onClick={() => setOpenCreate(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="delete-user-modal"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="py-2 my-5">
                      <input
                        type="text"
                        {...register("title", {
                          required: true,
                        })}
                        className="w-full block border border-primary px-2 py-3 rounded mb-4"
                        placeholder="Title"
                      />
                      {errors.title && (
                        <p className="text-red-500">Title is required</p>
                      )}
                      <input
                        type="text"
                        {...register("content", {
                          required: true,
                        })}
                        className="w-full block border border-primary px-2 py-3 rounded mb-4"
                        placeholder="Content"
                      />
                      {errors.content && (
                        <p className="text-red-500">Content is required</p>
                      )}
                    </div>
                    <div className="flex items-center justify-end rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setOpenCreate(false)}
                      >
                        Close
                      </button>
                      <button
                        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                        type="submit"
                      >
                        Add New Blog
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {openUpdate ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-9/12 my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-2xl font-semibold">Update the blog</h3>
                  <button
                    onClick={() => setOpenUpdate(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="delete-user-modal"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit(onUpdateSubmit)}>
                    <div className="py-2 my-5">
                      <input
                        type="text"
                        {...register("title", {
                          required: true,
                        })}
                        className="w-full block border border-primary px-2 py-3 rounded mb-4"
                        placeholder="Title"
                      />
                      {errors.title && (
                        <p className="text-red-500">Title is required</p>
                      )}
                      <input
                        type="text"
                        {...register("content", {
                          required: true,
                        })}
                        className="w-full block border border-primary px-2 py-3 rounded mb-4"
                        placeholder="Content"
                      />
                      {errors.content && (
                        <p className="text-red-500">Content is required</p>
                      )}
                    </div>
                    <div className="flex items-center justify-end rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setOpenUpdate(false)}
                      >
                        Close
                      </button>
                      <button
                        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                        type="submit"
                      >
                        Update Blog
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default BlogList;
