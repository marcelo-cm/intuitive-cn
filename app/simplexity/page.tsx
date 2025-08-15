import BlogLink from './_components/blog-link';
import { BlogVisibility } from './_constants/enums';
import { getAllPosts } from './_utils/content-utils';

/**
 * Blog page component that displays a list of all blog posts
 */
export default async function BlogPage() {
  const posts = getAllPosts();
  const publicPosts = posts.filter(
    (post) => post.visibility === BlogVisibility.PUBLIC,
  );

  return (
    <section className="mx-auto flex w-full max-w-2xl grow flex-col gap-12 px-4 py-8 md:py-12">
      <div>
        <p>Simplexity</p>
        <p className="text-muted-foreground">Thoughts & Opinions</p>
      </div>
      <div className="grid gap-6">
        {publicPosts.map((post) => (
          <BlogLink key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
