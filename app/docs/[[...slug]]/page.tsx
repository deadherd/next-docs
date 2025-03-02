import Image from "@/components/markdown/image";
import DocsBreadcrumb from "@/components/docs-breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { page_routes } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/typography";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage(props: PageProps) {
  const params = await props.params;

  const { slug = [] } = params;

  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);

  if (!res) notFound();
  const imagePath = `/assets/images/${res.frontmatter.image}`;

  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] py-10">
        <DocsBreadcrumb paths={slug} />
        {res.frontmatter.image && (
          <Image src={imagePath} alt={res.frontmatter.title} className="mb-6" />
        )}
        <Typography>
          <span className="mb-1 block border-l-background sm:text-[18.5px] text-[16.5px] font-subtitle tracking-normal font-semibold">
            {res.frontmatter.description}
          </span>
          {res.frontmatter.description && (
            <div className="block w-[100px] h-[2px] bg-[#d33f1e] mb-8"></div>
          )}
          <h1 className="sm:text-3xl text-2xl !-mt-0.5">
            {res.frontmatter.title}
          </h1>
          <div>{res.content}</div>
          <Pagination pathname={pathName} />
        </Typography>
      </div>
      <Toc path={pathName} />
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  const { slug = [] } = params;

  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);
  if (!res) return {};
  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image,
  };
}

export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}
