import React from 'react';
import styles from '../styles/Resume.module.css';

const Resume = () => {
  const experience = [
    {
      company: "Abnormal Security",
      location: "Remote",
      title: "Front-End Developer",
      period: "February 2023 - April 2025",
      achievements: [
        "Led the development and optimization of front-end components and customer-facing websites, contributing to weekly averages of 15K+ page views and 59K+ sessions.",
        "Improved site performance on Google PageSpeed Insights by over 150% for desktop and 220% for mobile.",
        "Implemented and tested reusable site components for consistent usability across browsers and viewports.",
        "Led CMS schema updates and UX enhancements supporting strategic content distribution and analytics.",
        "Delegated tasks and conducted code reviews for contract developers, ensuring quality and timely delivery."
      ]
    },
    {
      company: "AMP Agency",
      location: "Boston, MA",
      title: "Web Developer",
      period: "September 2018 - October 2022",
      achievements: [
        "Developed SPAs using React and Vue.js, delivering seamless user experiences across client campaigns.",
        "Used JavaScript (ES6), jQuery, and Axios to integrate RESTful APIs for dynamic content.",
        "Delivered 20+ landing pages, 100+ emails, and 800+ animated HTML5 ads for clients including Zillow and Facebook.",
        "Participated in Agile workflows, contributing to optimization and debugging across all deliverables."
      ]
    },
    {
      company: "Third & Grove",
      location: "Boston, MA",
      title: "Web Developer (Jr)",
      period: "May 2018 - August 2018",
      achievements: [
        "Expanded knowledge on how to approach various technological problems, including DevOps and Front End Development"
      ]
    },
    {
      company: "Massachusetts Educational Financial",
      location: "Boston, MA",
      title: "IT HelpDesk Analyst",
      period: "October 2016 - May 2018",
      achievements: [
        "Supported associates on various IT issues, including installing, operating, and troubleshooting systems, both remote and in-person"
      ]
    }
  ];

  const skills = {
    "Front-End": ["React", "Next.js", "GraphQL", "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind-CSS", "Chakra UI"],
    "Back-End": ["Node.js", "REST APIs", "Serverless"],
    "Tools": ["Git", "Webpack", "Babel", "Jest", "Docker"],
    "Design & UX": ["Figma", "Adobe XD", "Photoshop", "Responsive Design", "UX Wireframing"],
    "CMS & E-commerce": ["WordPress", "Drupal", "Joomla", "CraftCMS"],
    "Cloud Services": ["AWS", "Netlify", "Vercel"],
    "Optimization": ["Code Splitting", "Lazy Loading", "PWAs", "Lighthouse"]
  };

  const education = [
    {
      school: "Harvard Extension School",
      location: "Boston, MA",
      degree: "Graduate Certificate in Front end Development"
    },
    {
      school: "University of Massachusetts Boston",
      location: "Boston, MA",
      degree: "Information Technology"
    }
  ];

  return (
    <div className={styles.resume}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.name}>Gabriel Araujo-Sousa</h1>
        <div className={styles.contact}>
          <div className={styles.contactItem}>Croton on Hudson, NY</div>
          <div className={styles.contactItem}>(774) 999-9944</div>
          <div className={styles.contactItem}>Gsousa09@icloud.com</div>
          <div className={styles.contactItem}>garauxo.com</div>
          <div className={styles.contactItem}>linkedin</div>
        </div>
      </header>

      <div className={styles.content}>
        {/* Experience Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {experience.map((job, index) => (
            <div key={index} className={styles.experienceItem}>
              <div className={styles.jobHeader}>
                <div className={styles.jobTitle}>
                  <strong>{job.company}</strong>, {job.location} — {job.title}
                </div>
                <div className={styles.jobPeriod}>{job.period}</div>
              </div>
              <ul className={styles.achievements}>
                {job.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skillsGrid}>
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className={styles.skillCategory}>
                <h3 className={styles.skillCategoryTitle}>{category}:</h3>
                <span className={styles.skillList}>{skillList.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {education.map((edu, index) => (
            <div key={index} className={styles.educationItem}>
              <div className={styles.schoolName}>{edu.school}</div>
              <div className={styles.schoolLocation}>{edu.location}</div>
              <div className={styles.degree}>{edu.degree}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Resume;