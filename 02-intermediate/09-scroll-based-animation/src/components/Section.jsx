import { forwardRef } from "react";

const Section = forwardRef(({ title, description, className = "" }, ref) => {
  return (
    <section ref={ref} className={`section ${className}`}>
      <div className="section-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
});

export default Section;
