import { useGetAllBlogsQuery } from "../../rtk/Blog/BlogApi";

export default function BlogsDashboard() {
      const { data: allBlogs } = useGetAllBlogsQuery();
   
  
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">Our Blogs</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {allBlogs?.data?.map((blog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300"
            >
              {/* Blog Image */}
              <div className="w-full h-48 mb-4 overflow-hidden rounded-xl">
                <img
                  src={blog.imageCover}
                  alt={blog.location_en}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
  
              {/* Blog Location */}
              <h2 className="text-lg font-bold text-gray-800">
                {blog.location_en}
              </h2>
              <h3 className="text-sm text-gray-500 mb-2">{blog.location_ar}</h3>
  
              {/* Blog Text */}
              <p className="text-gray-700 text-sm mb-1">{blog.text_en}</p>
              <p className="text-gray-400 text-sm italic mb-2">{blog.text_ar}</p>
  
              {/* Publisher & Date */}
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <span>By: {blog.publisher}</span>
                <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }