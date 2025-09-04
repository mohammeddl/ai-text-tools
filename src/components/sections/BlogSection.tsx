"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface BlogPost {
  category: string;
  date: string;
  title: string;
  image: string;
  alt: string;
  delay?: number;
  additionalClass?: string;
}

const BlogSection = () => {
  const t = useTranslations();

  const blogPosts: BlogPost[] = [
    {
      category: "AI Technology",
      date: "December 15, 2024",
      title: "AI is Revolutionizing Text Processing and Content Creation",
      image: "/images/blog_1.png",
      alt: "AI Text Processing",
      additionalClass: "first_blog"
    },
    {
      category: "Productivity",
      date: "December 20, 2024",
      title: "10 Essential Text Formatting Tools Every Content Creator Needs",
      image: "/images/blog_2.png",
      alt: "Text Formatting Tools",
      delay: 0.75
    },
    {
      category: "Web Development",
      date: "December 25, 2024",
      title: "Building Modern Text Processing Apps with Next.js and TypeScript",
      image: "/images/blog_3.png",
      alt: "Next.js Development",
      delay: 1,
      additionalClass: "last_blog"
    }
  ];

  return (
    <section className='blog pt_120 xs_pt_80'>
      <div className='container'>
        <div className='row justify-content-between'>
          <div className='col-lg-5 col-md-8'>
            <div className='section_heading'>
              <h5>{t("blog.subtitle")}</h5>
              <h2 data-text-animation='' data-split='word'>
                {t("blog.title")}
              </h2>
            </div>
          </div>
          <div className='col-lg-7 col-md-12'>
            <div className='blog_right_text'>
              <p>{t("blog.description")}</p>
              <Link className='circle_btn' href='blog_grid'>
                {t("blog.viewAll")} <i className='fx-icon-next-arrow' />
              </Link>
            </div>
          </div>
        </div>
        <div className='row mt_20'>
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className='col-lg-4 col-md-6'
              data-animation='fade-left'
              {...(post.delay && { 'data-delay': post.delay })}>
              <div className={`single_blog ${post.additionalClass || ''}`}>
                <div className='single_blog_text'>
                  <ul className='d-flex flex-wrap'>
                    <li>{post.category}</li>
                    <li>{post.date}</li>
                  </ul>
                  <Link className='title' href='blog_details'>
                    {post.title}
                  </Link>
                </div>
                <div className='single_blog_img'>
                  <Link
                    href='blog_details'
                    data-cursor='<i class="fx-icon-long-next-arrow"></i>'
                    className='img w-100'>
                    <div data-animation='img-blur' className='w-100'>
                      <Image
                        src={post.image}
                        alt={post.alt}
                        width={400}
                        height={300}
                        className='img-fluid w-100'
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;