import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <main className="blog-page">
      <header className="blog-header">
        <Link className="wordmark" href="/">ramaa<span className="wordmark-dot">.</span></Link>
        <Link className="label" href="/blog">all notes</Link>
      </header>
      <article className="blog-post">
        <span className="label">{post.date}</span>
        <h1>{post.title}</h1>
        <p className="blog-summary">{post.summary}</p>
        {post.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>
    </main>
  );
}
