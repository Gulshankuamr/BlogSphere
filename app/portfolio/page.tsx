"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PortfolioPage() {
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  }

  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section
        ref={sectionRefs.hero}
        className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Gulshan Kumar
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Web Developer</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Passionate about creating responsive and user-friendly web applications
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => scrollToSection("about")}>About Me</Button>
            <Button variant="outline" onClick={() => scrollToSection("projects")}>
              View Projects
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection("contact")}>
              Contact Me
            </Button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={sectionRefs.about} className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                I am a passionate web developer currently pursuing my Master of Computer Applications (MCA) at the
                Institute of Engineering & Technology, Dr. Ram Manohar Lohiya Awadh University. I specialize in
                front-end development with expertise in React.js, Next.js, and responsive design.
              </p>
              <p>
                My goal is to create intuitive and engaging web experiences that solve real-world problems. I am
                constantly learning new technologies and improving my skills to stay updated with the latest industry
                trends.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>gulshan73939314@email.com</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+917393931450</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Lucknow</span>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section ref={sectionRefs.skills} className="container mx-auto px-4 py-16 md:py-24 bg-muted/30 rounded-lg">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>

          <Tabs defaultValue="programming" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="programming">Languages</TabsTrigger>
              <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="databases">Databases</TabsTrigger>
            </TabsList>

            <TabsContent value="programming" className="mt-6">
              <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["C", "C++", "JavaScript (ES6+)", "HTML5", "CSS3"].map((skill) => (
                  <Badge key={skill} variant="outline" className="py-3 justify-center text-center">
                    {skill}
                  </Badge>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="frameworks" className="mt-6">
              <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["React.js", "Next.js", "Bootstrap", "Tailwind CSS"].map((skill) => (
                  <Badge key={skill} variant="outline" className="py-3 justify-center text-center">
                    {skill}
                  </Badge>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="tools" className="mt-6">
              <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["VS Code", "GitHub", "Netlify", "WordPress", "Figma", "Postman"].map((skill) => (
                  <Badge key={skill} variant="outline" className="py-3 justify-center text-center">
                    {skill}
                  </Badge>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="databases" className="mt-6">
              <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["MongoDB", "MySQL (Basic)"].map((skill) => (
                  <Badge key={skill} variant="outline" className="py-3 justify-center text-center">
                    {skill}
                  </Badge>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section ref={sectionRefs.projects} className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={item}>
              <ProjectCard
                title="Calculator"
                description="A calculator with basic mathematical functionalities using CSS, HTML, and JavaScript. It has an interactive interface to perform basic functions such as addition, subtraction, division, and multiplication."
                technologies={["HTML", "CSS", "JavaScript"]}
                link="#"
              />
            </motion.div>

            <motion.div variants={item}>
              <ProjectCard
                title="To-Do App"
                description="A web application built using HTML, CSS, and JavaScript. It allows users to create and manage their to-do lists with basic features such as adding, editing, and deleting tasks."
                technologies={["HTML", "CSS", "JavaScript"]}
                link="#"
              />
            </motion.div>

            <motion.div variants={item}>
              <ProjectCard
                title="Tribute Page"
                description="A webpage built using HTML and CSS that pays tribute to a person or entity by showcasing their life or achievements. The page is designed to be informative and visually appealing."
                technologies={["HTML", "CSS"]}
                link="#"
              />
            </motion.div>

            <motion.div variants={item}>
              <ProjectCard
                title="Amazon Front Page"
                description="A clone of the Amazon front page using HTML and CSS, replicating the layout and design of the popular e-commerce platform."
                technologies={["HTML", "CSS"]}
                link="#"
              />
            </motion.div>

            <motion.div variants={item}>
              <ProjectCard
                title="Myntra UI Clone"
                description="A fully responsive Myntra UI clone using HTML, JavaScript, React.js, and Bootstrap. The project replicates the front-end design, including navigation, product listings, and interactive elements."
                technologies={["HTML", "JavaScript", "React.js", "Bootstrap"]}
                link="#"
              />
            </motion.div>

            <motion.div variants={item}>
              <ProjectCard
                title="ByteUprise"
                description="A fully responsive web application using HTML, JavaScript, React.js, and Bootstrap. The project replicates front-end design, including navigation, product listings, and interactive elements."
                technologies={["HTML", "JavaScript", "React.js", "Bootstrap"]}
                link="#"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section ref={sectionRefs.education} className="container mx-auto px-4 py-16 md:py-24 bg-muted/30 rounded-lg">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>

          <div className="space-y-8">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Master of Computer Applications (MCA)</CardTitle>
                      <CardDescription>
                        Institute of Engineering & Technology, Dr. Ram Manohar Lohiya Awadh University
                      </CardDescription>
                    </div>
                    <Badge>2023-2025</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Location: Ayodhya</p>
                  <p>CGPA: 7.0</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Intermediate (Mathematics)</CardTitle>
                      <CardDescription>Kisan Inter College Pakri Bhojpur</CardDescription>
                    </div>
                    <Badge>2017-2018</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Location: Ambedkar Nagar</p>
                  <p>CGPA: 6.5</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Computer Science</CardTitle>
                      <CardDescription>Dr. Ram Manohar Lohia Avadh University</CardDescription>
                    </div>
                    <Badge>Current</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Location: Lucknow</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Certifications Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Certifications</h2>

          <motion.div variants={item}>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/10">
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Programming Fundamentals using Python - Part 1
                </CardTitle>
                <CardDescription>Infosys</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>
                  Completed comprehensive training in Python programming fundamentals, covering core concepts and
                  practical applications.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs.contact} className="container mx-auto px-4 py-16 md:py-24 bg-muted/30 rounded-lg">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Feel free to reach out for collaborations or just a friendly chat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="flex flex-col items-center p-6 hover:shadow-md transition-shadow">
              <Mail className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-4">gulshan73939314@email.com</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="mailto:gulshan73939314@email.com">Send Email</Link>
              </Button>
            </Card>

            <Card className="flex flex-col items-center p-6 hover:shadow-md transition-shadow">
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground mb-4">+917393931450</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="tel:+917393931450">Call Me</Link>
              </Button>
            </Card>

            <Card className="flex flex-col items-center p-6 hover:shadow-md transition-shadow">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">Location</h3>
              <p className="text-sm text-muted-foreground mb-4">Lucknow, India</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://maps.google.com/?q=Lucknow,India" target="_blank" rel="noopener noreferrer">
                  View on Map
                </Link>
              </Button>
            </Card>
          </div>

          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Link>
            </Button>
            <Button asChild>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

function ProjectCard({
  title,
  description,
  technologies,
  link,
}: {
  title: string
  description: string
  technologies: string[]
  link: string
}) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground line-clamp-4">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Project
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
