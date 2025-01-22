import BlogForm from "@/features/Blogs/Components/BlogForm/page";
import ShowBlog from "@/features/Blogs/Components/ShowBlog/page";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ShowBlog id={params.id} />
    </div>
  );
};

export default page;
