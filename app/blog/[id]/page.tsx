// app/blog/[id]/page.tsx
import BlogDetailClient from "./BlogDetailClient";

// Server function for static export
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return <BlogDetailClient id={params.id} />;
}