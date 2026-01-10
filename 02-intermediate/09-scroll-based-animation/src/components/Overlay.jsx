import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import Section from "./Section";

function Overlay() {
  const scroll = useScroll();
  const sectionsRef = useRef([]);

  const sections = [
    {
      title: "Welcome to 3D Scrolling",
      description:
        "Experience the power of scroll-based animations in React Three Fiber. Watch as the robot and camera move smoothly with your scroll.",
    },
    {
      title: "Interactive 3D Worlds",
      description:
        "Create immersive experiences that respond to user input. Scroll animations bring depth and engagement to your web projects.",
    },
    {
      title: "Built with R3F & GSAP",
      description:
        "Combining React Three Fiber's ScrollControls with GSAP gives you complete control over 3D animations and scroll behavior.",
    },
    {
      title: "Your Next Project",
      description:
        "Use these techniques to build portfolios, product showcases, and storytelling experiences that captivate your audience.",
    },
  ];

  useFrame(() => {
    sectionsRef.current.forEach((section, i) => {
      if (!section) return;

      const content = section.querySelector(".section-content");
      if (!content) return;

      const visible = scroll.range(i / sections.length, 1 / sections.length);

      if (i === 0 && scroll.offset < 0.05) {
        content.style.opacity = 1;
        content.style.transform = `translateY(0px)`;
        content.style.filter = "none";
        return;
      }

      content.style.opacity = visible;
      content.style.transform = `translateY(${(1 - visible) * 20}px)`;
      content.style.filter = "none";
    });
  });

  return (
    <div className="overlay">
      {sections.map((section, index) => (
        <Section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          title={section.title}
          description={section.description}
          className={
            index === 0
              ? "section-left"
              : index === 1
              ? "section-right"
              : index === 2
              ? "section-left"
              : "section-bottom-center"
          }
        />
      ))}
      <div className="scroll-indicator">
        <span>Scroll Down</span>
      </div>
    </div>
  );
}

export default Overlay;
