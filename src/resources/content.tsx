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
  image: `/api/og/generate?title=${`${person.name}'s Portfolio`}`,
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
  description: `Meet ${person.name}, ${person.role}`,
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
          // <>
          //   Optimized PDH-locked bow-tie cavity with FPGA-based feedback system achieving 3µs latency for 
          //   light squeezing applications
          // </>,
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
        timeframe: "2024 - 2026",
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
        timeframe: "2023 - 2025",
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
  title: `Gallery – ${person.name}`,
  description: `Project media gallery by ${person.name}`,
  images: [
    // Cloud Chamber - Ionizing Particle Visualization
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/Americium%20test-optimized.mp4",
      alt: "Cloud chamber Americium test",
      orientation: "horizontal",
      caption: "Cloud Chamber - Americium Test",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/cooling%20test-optimized.mp4",
      alt: "Cloud chamber cooling test",
      orientation: "horizontal",
      caption: "Cloud Chamber - Cooling Test",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/operation(electron%20flood)-optimized.mp4",
      alt: "Cloud chamber operation with electron flood",
      orientation: "horizontal",
      caption: "Cloud Chamber - Electron Flood Operation",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/VID_20250124_141833022-optimized.mp4",
      alt: "Cloud chamber particle visualization",
      orientation: "vertical",
      caption: "Cloud Chamber - setup",
    },
    // Humidity & Temperature Data Logger
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/final-optimized.jpg",
      alt: "Humidity and temperature data logger final assembly",
      orientation: "vertical",
      caption: "Data Logger - Final Assembly",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/interface-optimized.png",
      alt: "Data logger interface display",
      orientation: "horizontal",
      caption: "Data Logger - Interface",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/internals-optimized.jpg",
      alt: "Data logger internal components",
      orientation: "vertical",
      caption: "Data Logger - Internal Components",
    },
    // EMI Isolation Detector
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/emi isolation testing-optimized.jpg",
      alt: "EMI isolation detector testing setup",
      orientation: "horizontal",
      caption: "EMI Isolation - Testing & Measurement",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/outputgraph-optimized.jpg",
      alt: "EMI isolation output graph analysis",
      orientation: "horizontal",
      caption: "EMI Isolation - Output Graph",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/testsetup-optimized.jpg",
      alt: "EMI isolation test setup overview",
      orientation: "horizontal",
      caption: "EMI Isolation - Test Setup",
    },
    // Fiber Optic Communication Link
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/videofeed-optimized.jpg",
      alt: "Fiber optic video feed demonstration",
      orientation: "horizontal",
      caption: "Fiber Optic - Video Feed Display",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/videofeedviafiber.mp4",
      alt: "Fiber optic video transmission via fiber link",
      orientation: "horizontal",
      caption: "Fiber Optic - Video Transmission",
    },
    // SimRacer Setup
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/pedalsandsteeringwheel-optimized.jpg",
      alt: "SimRacer pedals and steering wheel assembly",
      orientation: "horizontal",
      caption: "SimRacer - Pedals & Steering Wheel",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/showcase steering-optimized.jpg",
      alt: "SimRacer steering wheel system showcase",
      orientation: "horizontal",
      caption: "SimRacer - Steering Wheel Assembly",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/uncomplete steering system-optimized.jpg",
      alt: "SimRacer steering system in progress",
      orientation: "horizontal",
      caption: "SimRacer - Steering System Assembly",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/uncomplete pedal system-optimized.jpg",
      alt: "SimRacer pedal system assembly",
      orientation: "horizontal",
      caption: "SimRacer - Pedal System Assembly",
    },
    // PCB Strain Mapping
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/hotspot detected-optimized.png",
      alt: "PCB hotspot detection visualization",
      orientation: "horizontal",
      caption: "PCB Strain - Thermal Hotspot Detection",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/IMG_20260212_174414603-optimized.jpg",
      alt: "PCB strain mapping field measurement",
      orientation: "vertical",
      caption: "PCB Strain - Field Measurement Setup",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/IMG_20260212_174437091-optimized.jpg",
      alt: "PCB strain analysis in progress",
      orientation: "vertical",
      caption: "PCB Strain - Analysis Process",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/output strain S trace-optimized.png",
      alt: "PCB strain output trace analysis",
      orientation: "horizontal",
      caption: "PCB Strain - Strain Output Trace",
    },
    // SPI Chip Characterization
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/closeup setup-optimized.jpg",
      alt: "SPI communication test setup close-up",
      orientation: "horizontal",
      caption: "SPI Characterization - Test Equipment Detail",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/Spi communication development setup-optimized.jpg",
      alt: "SPI communication development setup",
      orientation: "horizontal",
      caption: "SPI Characterization - Development Setup",
    },
    // Photophoretic Optical Trapping
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/optical%20trapping/optical%20trapping.mp4",
      alt: "Photophoretic optical trapping system demonstration",
      orientation: "vertical",
      caption: "Optical Trapping - Particle Confinement in Action",
    },
    {
      src: "https://favw6hdckgdqdobu.public.blob.vercel-storage.com/portfolio/optical trapping-optimized.png",
      alt: "Photophoretic optical trapping system setup",
      orientation: "horizontal",
      caption: "Optical Trapping - System Architecture",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };



