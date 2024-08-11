'use client'
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import Image from 'next/image';

const About: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-lightTheme-secondary to-lightTheme-primary dark:from-darkTheme-secondary dark:to-darkTheme-primary text-lightTheme-text dark:text-darkTheme-text min-h-screen overflow-x-hidden">
      <Header />
      <Mission />
      <InteractiveTimeline />
      <AnimatedInfoGraphics />
      <CollaborationShowcase />
      <TestimonialCarousel />
      <InteractiveCallToAction />
    </div>
  );
}

const Header: React.FC = () => {
  return (
    <header className="text-center py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-600 dark:text-indigo-400 animate-fade-in">
        Welcome to Prayog
      </h1>
      <p className="text-xl dark:text-yellow-500 text-red-500 md:text-2xl mb-8">
        Uniting Students and Institutes Across India
      </p>
    </header>
  );
}

const Mission: React.FC = () => {
  return (
    <section className="bg-lightTheme-accent dark:bg-darkTheme-accent p-8 md:p-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-darkTheme-primary dark:text-lightTheme-primary">
          Our Mission
        </h2>
        <p className="text-lg mb-4">
          Prayog is a pioneering initiative that brings together students and institutes on a single platform, 
          showcasing technical projects, workshops, and seminars from across India.
        </p>
        <p className="text-lg">
          We aim to create a vibrant ecosystem where innovation thrives and knowledge is shared freely.
        </p>
      </div>
    </section>
  );
}

const InteractiveTimeline: React.FC = () => {
  return (
    <section className="timeline-container p-8 md:p-12 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-darkTheme-primary dark:text-lightTheme-primary animate-fade-in">
        The Prayog Journey
      </h2>
      <div className="timeline">
        <div className="timeline-item" data-aos="fade-right">
          <h3 className="text-2xl font-bold mb-2 dark:text-yellow-500 text-red-500 ">Inception</h3>
          <p>Prayog was born from the vision to create a unified platform for technical innovation in India.</p>
        </div>
        <div className="timeline-item" data-aos="fade-left">
          <h3 className="text-2xl font-bold mb-2 dark:text-yellow-500 text-red-500 ">Connecting Minds</h3>
          <p>We began by linking students and institutes, fostering collaboration across different regions of India.</p>
        </div>
        <div className="timeline-item" data-aos="fade-right">
          <h3 className="text-2xl font-bold mb-2 dark:text-yellow-500 text-red-500 ">Expanding Horizons</h3>
          <p>Prayog grew to include a wide array of technical projects, workshops, and seminars from various disciplines.</p>
        </div>
        <div className="timeline-item" data-aos="fade-left">
          <h3 className="text-2xl font-bold mb-2 dark:text-yellow-500 text-red-500 ">Empowering Innovation</h3>
          <p>Today, we continue to empower students and institutes to showcase their work and share knowledge on a national scale.</p>
        </div>
      </div>
    </section>
  );
}

const AnimatedInfoGraphics: React.FC = () => {
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +(counter.getAttribute('data-target') || '0');
        const count = +(counter.textContent || '0');
        const inc = target / 200;
        if (count < target) {
          if (counter.textContent) counter.textContent = Math.ceil(count + inc).toString();
          setTimeout(updateCount, 1);
        } else {
          if (counter.textContent) counter.textContent = target.toString();
        }
      };
      updateCount();
    });
  }, []);

  return (
    <section className="p-8 md:p-12 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-darkTheme-primary dark:text-lightTheme-primary animate-fade-in">
        Prayog in Numbers
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <AnimatedInfoGraphic title="Student Projects" value={5000} icon="fa-project-diagram" />
        <AnimatedInfoGraphic title="Institutes Connected" value={500} icon="fa-university" />
        <AnimatedInfoGraphic title="Workshops & Seminars" value={1000} icon="fa-chalkboard-teacher" />
      </div>
    </section>
  );
}

interface AnimatedInfoGraphicProps {
  title: string;
  value: number;
  icon: string;
}

const AnimatedInfoGraphic: React.FC<AnimatedInfoGraphicProps> = ({ title, value, icon }) => {
  return (
    <div className="infographic-item text-center" data-aos="zoom-in">
      <i className={`fas ${icon} text-4xl mb-2 text-blue-500`}></i>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="counter text-3xl font-bold text-green-500" data-target={value}>0</div>
    </div>
  );
}

const CollaborationShowcase: React.FC = () => {
  return (
    <section className="p-8 md:p-12 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-darkTheme-primary dark:text-lightTheme-primary animate-fade-in">
        Collaboration in Action
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-lightTheme-secondary dark:bg-darkTheme-secondary p-6 rounded-lg shadow-md" data-aos="fade-right">
          <h3 className="text-2xl font-bold mb-4 dark:text-yellow-500 text-red-500 ">Student Projects</h3>
          <p>Discover innovative technical projects created by students from across India. From AI to robotics, witness the future of technology.</p>
        </div>
        <div className="bg-lightTheme-secondary dark:bg-darkTheme-secondary p-6 rounded-lg shadow-md" data-aos="fade-left">
          <h3 className="text-2xl font-bold mb-4 dark:text-yellow-500 text-red-500 ">Institute Initiatives</h3>
          <p>Explore workshops, seminars, and events organized by leading institutes. Stay updated with the latest in technical education and research.</p>
        </div>
      </div>
    </section>
  );
}

const TestimonialCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="p-8 md:p-12 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-darkTheme-primary dark:text-lightTheme-primary animate-fade-in">
        Voices from the Community
      </h2>
      <Slider {...settings}>
        <div className="text-center px-4">
          <Image src="/images/student 1.jpg" alt="Student 1" height={96} width={96} className="rounded-full mx-auto mb-4 object-cover" />
          <p className="text-lg mb-2">Prayog helped me showcase my AI project to institutes across India!</p>
          <h4 className="font-semibold">- Priya Sharma, Computer Science Student, Delhi</h4>
        </div>
        <div className="text-center px-4">
          <Image src="/images/prof 1.jpg" alt="Professor 1" height={96} width={96} className="rounded-full mx-auto mb-4 object-cover" />
          <p className="text-lg mb-2">Our institute&apos;s workshop reached students from all corners of the country through Prayog.</p>
          <h4 className="font-semibold">- Dr. Rajesh Kumar, Professor, IIT Bombay</h4>
        </div>
        <div className="text-center px-4">
          <Image src="/images/student 2.jpg" alt="Student 2" height={96} width={96} className="rounded-full w-24 h-24 mx-auto mb-4 object-cover" />
          <p className="text-lg mb-2">I found collaborators for my robotics project from different states!</p>
          <h4 className="font-semibold">- Arjun Reddy, Mechanical Engineering Student, Chennai</h4>
        </div>
      </Slider>
    </section>
  );
}

const InteractiveCallToAction: React.FC = () => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-darkTheme-primary dark:text-lightTheme-primary animate-fade-in">
        Join the Prayog Community
      </h2>
      <div 
        className={`cta-button ${hovered ? 'expanded' : ''} inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="cta-text">Be Part of India&apos;s Technical Revolution</span>
        {hovered && (
          <Link href="/auth/login" className="cta-link ml-4 underline">Sign Up Now</Link>
        )}
      </div>
    </section>
  );
}

export default About;