import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import githubLogo from './github.png';
import rainFireVideo from './imgfile/Rain_Fire_720p_5000br.mp4';
import project1 from './Project1 img/p1.png';
import project1_1 from './Project1 img/p1-1.png';
import project1_2 from './Project1 img/p1-2.png';
import project1_3 from './Project1 img/p1-3.png';
import project2Image from './Project2 img/myportpolio1.png';
import reactIcon from './imgfile/react.png';
import jsIcon from './imgfile/javascript.png';
import cssIcon from './imgfile/css.png';
import htmlIcon from './imgfile/html5.png';
import springBootIcon from './imgfile/spring-boot.png';
import javaIcon from './imgfile/java.png';
import pythonIcon from './imgfile/python.png';
import mysqlIcon from './imgfile/mysql.png';
import oracleIcon from './imgfile/oracle.png';
import slackIcon from './imgfile/slack.png';

const SkillItem = ({ icon, name }) => (
    <li className="bg-gray-200 p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-center transition-transform hover:scale-105">
        <img src={icon} alt={name} className="w-10 h-10 mb-2" />
        <span className="font-medium">{name}</span>
    </li>
);

const SkillSection = ({ title, skills }) => (
    <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <ul className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-10 gap-10 ba">
            {skills.map((skill, index) => (
                <SkillItem key={index} icon={skill.icon} name={skill.name} />
            ))}
        </ul>
    </div>
);



const FlipCard = ({ title, description, images }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        setCurrentImageIndex(0);
        clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            if (!isFlipped) {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 3000);

        return () => clearInterval(timerRef.current);
    }, [images, isFlipped]);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <motion.div
            className="flip-card w-full max-w-6xl h-[600px] cursor-pointer mx-auto"
            onClick={handleClick}
            animate={{rotateY: isFlipped ? 180 : 0}}
            transition={{duration: 0.6}}
            style={{transformStyle: 'preserve-3d'}}
        >
            <div
                className="flip-front absolute w-full h-full backface-hidden bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-8"
                style={{backfaceVisibility: 'hidden'}}
            >
                <h3 className="text-3xl font-semibold mb-6">{title}</h3>
                <div className="relative w-full h-[400px] mb-6">
                    <img src={images[currentImageIndex]} alt={title} className="w-full h-full object-cover rounded-md"/>
                </div>
            </div>
            <div
                className="flip-back absolute w-full h-full backface-hidden bg-sky-400 text-white rounded-lg shadow-md flex flex-col p-8"
                style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}
            >
                <h3 className="text-3xl font-semibold mb-6 text-center">{title}</h3>
                <div className="flex-grow overflow-y-auto">
                    <p className="text-xl text-left">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};

const Portpolio = () => {
    const [activeSection, setActiveSection] = useState('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sectionRefs = {
        home: useRef(null),
        about: useRef(null),
        skills: useRef(null),
        projects: useRef(null),
        contact: useRef(null),
    }
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            Object.entries(sectionRefs).forEach(([key, ref]) => {
                if (ref.current && ref.current.offsetTop <= scrollPosition + 100) {
                    setActiveSection(key);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionRefs]);

    const scrollToSection = (sectionId) => {
        sectionRefs[sectionId].current.scrollIntoView({behavior: 'smooth'});
    };

    const frontendSkills = [
        { icon: reactIcon, name: 'React' },
        { icon: jsIcon, name: 'JavaScript' },
        { icon: cssIcon, name: 'CSS' },
        { icon: htmlIcon, name: 'HTML' },
    ];

    const backendSkills = [
        { icon: springBootIcon, name: 'Spring Boot' },
        { icon: javaIcon, name: 'Java' },
        { icon: pythonIcon, name: 'Python' },
        { icon: mysqlIcon, name: 'MySQL' },
        { icon: oracleIcon, name: 'Oracle' },
    ];

    const etcSkills = [
        { icon: slackIcon, name: 'Slack' },
    ];

    const projects = [
        {
            title: "Project 1",
            description: "설명",
            images: [project1,project1_1,project1_2,project1_3] // 여러 이미지 추가
        },
        {
            title: "Project 2",
            description: "하이",
            images: [project2Image] // 여러 이미지 추가
        }
    ];

    const nextProject = () => {
        setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const prevProject = () => {
        setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="text-xl font-bold"></div>
                    <ul className="flex space-x-20 ">
                        {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                            <li key={item}>
                                <button
                                    onClick={() => scrollToSection(item)}
                                    className={`capitalize ${
                                        activeSection === item ? 'text-blue-500' : 'text-gray-600'
                                    }`}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <main>
                <section
                    ref={sectionRefs.home}
                    className="h-screen flex items-center justify-center relative overflow-hidden"
                >
                    <video
                        autoPlay
                        loop
                        muted
                        className="absolute z-0 w-full h-full object-cover"
                    >
                        <source src={rainFireVideo} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <div className="relative z-10 text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
                        <p className="text-xl mb-8">Lee Seung Jun</p>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="bg-white text-blue-500 px-6 py-3 rounded-full font-bold hover:bg-blue-100 transition duration-300"
                        >
                            My Work
                        </button>
                    </div>
                </section>

                <section ref={sectionRefs.about} className="min-h-screen flex items-center justify-center bg-white">
                    <div className="container mx-auto px-6 py-12">
                        <h2 className="text-4xl font-bold mb-4">About Me</h2>
                        <p className="text-lg text-center">
                            가치관 입력
                        </p>
                    </div>
                </section>

                <section ref={sectionRefs.skills}
                         className="min-h-screen flex items-center justify-center bg-white py-16">
                    <div className="container mx-auto px-10">
                        <h2 className="text-4xl font-bold mb-5 text-center">Skills</h2>
                        <SkillSection title="Frontend" skills={frontendSkills}/>
                        <SkillSection title="Backend" skills={backendSkills}/>
                        <SkillSection title="Etc" skills={etcSkills}/>
                    </div>
                </section>

                <section ref={sectionRefs.projects}
                         className="min-h-screen flex items-center justify-center bg-gray-100 py-20">
                    <div className="container mx-auto px-6">

                        <div className="relative">
                            <FlipCard {...projects[currentProjectIndex]} />
                            <button
                                onClick={prevProject}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft size={32}/>
                            </button>
                            <button
                                onClick={nextProject}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
                            >
                                <ChevronRight size={32}/>
                            </button>
                        </div>
                    </div>
                </section>


                <section ref={sectionRefs.contact}
                         className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="container mx-auto px-6 py-12 text-center">
                        <h2 className="text-4xl font-bold mb-4">Contact</h2>
                        <p>Email : dhsl357@naver.com</p>
                        <br/>
                        <a href={"https://github.com/SJ0107"} className="inline-block">
                            <img src={githubLogo} alt="github"
                                 className="Github w-20 h-15 "/>
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
};


export default Portpolio;