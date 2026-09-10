import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="blog-page">
      <header className="blog-header">
        <Link className="wordmark" href="/">
          ramaa<span className="wordmark-dot">.</span>
        </Link>
        <span className="label">notes from the tabs</span>
      </header>
      {posts.length === 0 ? (
        <section className="blog-empty">
          <span className="label">writing</span>
          <h1>
            nothing published <em>yet</em>
          </h1>
          <p>
            Add a post to <code>lib/posts.ts</code> and it shows up here. No redesign needed.
          </p>
          <Link className="button" href="/" style={{ justifySelf: "start" }}>
            back home
            <span className="button-arrow">↗</span>
          </Link>
        </section>
      ) : (
        <section className="blog-list">
          <span className="label">writing</span>
          {posts.map((post) => (
            <Link key={post.slug} className="blog-row" href={`/blog/${post.slug}`}>
              <div>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
              </div>
              <span className="label">{post.date}</span>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
