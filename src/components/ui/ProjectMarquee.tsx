"use client";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useParams } from "next/navigation";
import { gradients } from "@/styles/page-styles";

interface ProjectItem {
  title: string;
  icon: string;
  gradient: string;
  index: string;
}

interface ProjectMarqueeProps {
  direction?: "left" | "right";
  projects: ProjectItem[];
}

const ProjectMarquee = ({ direction = "left", projects }: ProjectMarqueeProps) => {
  const params = useParams();
  const locale = params.locale as string;

  const gradientStyle = (gradient: string) => ({
    background: gradient,
    width: '100%',
    height: '120px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: gradient === gradients.light ? '#333' : 'white',
    fontSize: '2rem'
  });

  return (
    <Marquee className={direction === 'left' ? 'marquee_animi' : 'marquee_animi2'} direction={direction}>
      <ul className='project_slider d-flex flex-wrap'>
        {projects.map((project, index) => (
          <li key={index}>
            <Link href={`/${locale}/tools`}>
              <p>{project.title}</p>
              <div className='img'>
                <div style={gradientStyle(project.gradient)}>
                  {project.icon}
                </div>
                <span>{project.index}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Marquee>
  );
};

export default ProjectMarquee;