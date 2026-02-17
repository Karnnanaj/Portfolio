import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Karnnan",
  lastName: "AJ",
  name: `Karnnan AJ`,
  role: "Optoelectronics & Embedded Systems Engineer",
  avatar: "/images/avatar.jpg",
  email: "karnnanaj2004@gmail.com",
  location: "Asia/Kolkata",
  languages: ["English"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about optoelectronics and embedded systems</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Karnnanaj",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/karnnan-aj",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as an ${person.role}`,
  headline: <>Engineering optoelectronic systems and embedded solutions</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Latest Work</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Optoelectronics Projects
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
    I'm Karnnan, an MSc student in Photonics at <Text as="span" size="xl" weight="strong">CUSAT</Text>, specializing in <br /> quantum optics and embedded systems. Currently interning in optoelectronics.
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        MSc Photonics student at Cochin University of Science and Technology (CUSAT), 
        specializing in quantum optics and control systems. With expertise in optoelectronics, embedded systems, 
        and hardware design.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Oxford Instruments",
        timeframe: "2026 - Present",
        role: "Embedded Systems Engineer",
        achievements: [
          <>
            Developing humidity and temperature monitoring system with cloud database integration for remote environmental tracking and critical condition alerts
          </>,
        ],
        images: [],
      },
      {
        company: "Quanfluence PVT Ltd",
        timeframe: "2025",
        role: "Optoelectronics Intern",
        achievements: [
          <>
            Developed SPI-based communication protocol for automated characterization of high-bandwidth 
            transimpedance amplifier for quantum applications, reducing characterization time to under 3 minutes
          </>,
          <>
            Optimized PDH-locked bow-tie cavity with FPGA-based feedback system achieving 3µs latency for 
            light squeezing applications
          </>,
          <>
            Achieved complete EMI isolation of homodyne detector output, improving noise floor from -55 to -68 dBm
          </>,
        ],
        images: [],
      },
      {
        company: "Bravecore PVT Ltd",
        timeframe: "2025",
        role: "Fiber Optic Communication Engineer",
        achievements: [
          <>
            Developed hot-swappable fiber-optic communication link using SFP with 1 GHz bandwidth and 20km range
          </>,
        ],
        images: [],
      },
      {
        company: "SimRacer",
        timeframe: "2024 - Present",
        role: "Founder & Embedded Systems Engineer",
        achievements: [
          <>
            Founded company designing open-source sim racing setups
          </>,
          <>
            Built custom USB game controller with 4 analog and 12 digital inputs using Pi Pico
          </>,
        ],
        images: [],
      },
      {
        company: "Ensemble Electronics",
        timeframe: "2023 - Present",
        role: "Co-founder & Hardware Design Engineer",
        achievements: [
          <>
            Co-founded electronics hardware design and maintenance company
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Cochin University of Science and Technology (CUSAT)",
        description: <>MSc (5-year integrated) in Photonics (2022-2027). Specialized in quantum optics and control systems.</>,
      },
      {
        name: "GHSS, Karupadanna",
        description: <>Higher Secondary Education (2020-2022): Computer Science, Mathematics, Physics</>,
      },
      {
        name: "Technical High School, Kodungallur",
        description: <>Technical Education (2017-2020) with workshop experience in trades including automobile, turning, welding, and electronics.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Programming & Software",
        description: (
          <>Knowledge in Python, C++, Verilog for embedded systems; TensorFlow & Qiskit for quantum; 
          COMSOL & MATLAB-Simulink for simulations; CAD tools: FreeCAD, KiCad, Onshape, SolidWorks</>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "C++",
            icon: "cpp",
          },
          {
            name: "Verilog",
            icon: "verilog",
          },
        ],
        images: [],
      },
      {
        title: "Hardware & Instrumentation",
        description: (
          <>Proficient with oscilloscopes, spectrum/signal analyzers, EMI isolation, fiber optics & free-space optics, 
          laser operation, and advanced signal processing techniques</>
        ),
        tags: [
          {
            name: "Oscilloscopes",
            icon: "oscilloscope",
          },
          {
            name: "Fiber Optics",
            icon: "fiber",
          },
          {
            name: "Laser",
            icon: "laser",
          },
        ],
        images: [],
      },
      {
        title: "Electronics & Prototyping",
        description: (
          <>Expertise in PCB design, FPGA system design, microcontroller programming, SMD soldering, 
          electronics prototyping, and sensor hardware interfacing</>
        ),
        tags: [
          {
            name: "PCB Design",
            icon: "pcb",
          },
          {
            name: "FPGA",
            icon: "fpga",
          },
          {
            name: "Microcontroller",
            icon: "microcontroller",
          },
        ],
        images: [],
      },
      {
        title: "CAD & Machining",
        description: (
          <>Skills in FreeCAD, SolidWorks, Onshape for CAD design; lathe & milling machine operation, 3D printing</>
        ),
        tags: [
          {
            name: "FreeCAD",
            icon: "freecad",
          },
          {
            name: "SolidWorks",
            icon: "solidworks",
          },
          {
            name: "3D Printing",
            icon: "3dprinting",
          },
        ],
        images: [],
      },
      {
        title: "Machine Learning & Simulation",
        description: (
          <>Proficiency in machine learning techniques and optics simulation for quantum and photonic applications</>
        ),
        tags: [
          {
            name: "TensorFlow",
            icon: "tensorflow",
          },
          {
            name: "MATLAB",
            icon: "matlab",
          },
          {
            name: "ML",
            icon: "ml",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about optoelectronics and embedded systems...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Optoelectronics and embedded systems projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
