import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import BlogList from "./components/blog_list";
import Image from "../src/assets/image.avif";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-center">
        <div className="relative overflow-hidden bg-no-repeat bg-contain  max-h-80">
          <img
            className="w-full h-screen object-cover"
            src={Image}
            alt="image"
          />
          <div
            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.40)" }}
          >
            <div className="w-full xl:w-10/12 lg:w-10/12 md:w-11/12 mx-auto xl:mt-40 md:mt-32 mt-10">
              <div className="flex  justify-center items-center h-full">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-4xl xl:text-5xl text-primary font-bold font-display tracking-tight leading-tight">
                    Blogs
                  </h1>
                  <h1 className="text-3xl md:text-3xl xl:text-4xl font-bold font-display my-8">
                    Stay Informed and Inspired
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BlogList />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
