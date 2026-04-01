import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Karnnan",
  lastName: "AJ",
  name: `Karnnan AJ`,
  role: "Optoelectronics & Embedded Systems Engineer",
  avatar: "/avatar.jpg",
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
        Photonics Integrated MSc student at Cochin University of Science and Technology (CUSAT), specializing in quantum optics and control systems. 
        With expertise in optoelectronics, embedded systems, hardware design, and signal processing. Research interests include PICs for quantum computing applications, 
        high-performance photodetectors, and optoelectronics hardware development.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Quanfluence Private Limited",
        timeframe: "2025",
        role: "Optoelectronics Intern",
        achievements: [
          <>
            Developed an SPI-based communication protocol for automated characterization of an experimental high-bandwidth transimpedance amplifier designed for quantum applications
          </>,
          <>
            Reduced full characterization time to 3 minutes from 1+ hours
          </>,
          <>
            Optimized a PDH-locked bow-tie cavity and implemented FPGA-based feedback system achieving ~3µs latency for light squeezing applications
          </>,
          <>
            Achieved complete EMI isolation of homodyne detector output under 5 GHz, improving noise floor from -55 dBm to -68 dBm
          </>,
        ],
        images: [],
      },
      {
        company: "Oxford Instruments",
        timeframe: "2026",
        role: "Embedded Systems Developer (Contract)",
        achievements: [
          <>
            Engineered an open-source device for remote monitoring of system and environment variables
          </>,
          <>
            Implemented cloud database for data logging and risk assessment with CSV export capability
          </>,
          <>
            Achieved 200+ days runtime using deep sleep optimization
          </>,
        ],
        images: [],
      },
      {
        company: "Bravecore Private Limited",
        timeframe: "2025",
        role: "Fiber Optic Communication Developer",
        achievements: [
          <>
            Developed a hot-swappable fiber-optic communication link utilizing SFP transceivers
          </>,
          <>
            Achieved 1 GHz bandwidth and 20 km maximum operational range with both telemetry and camera feed transmission
          </>,
          <>
            Designed system compatible with wide range of SFP transceivers for upgraded range and data rate
          </>,
        ],
        images: [],
      },
      {
        company: "SimRacer",
        timeframe: "2024 - 2026",
        role: "Embedded Systems Engineer / Founder",
        achievements: [
          <>
            Built a sim racing rig with open-source hardware and custom firmware
          </>,
          <>
            Programmed Raspberry Pi Pico as DirectInput HID device with auto-calibrator and software-based calibration mode
          </>,
          <>
            Implemented steering wheel, paddle shifter, brake/accelerator pedals, and 8 mappable buttons
          </>,
        ],
        images: [],
      },
      {
        company: "Cochin University of Science and Technology",
        timeframe: "2022 - 2026",
        role: "Project Researcher",
        achievements: [
          <>
            Developed a new method for full-field PCB strain mapping using laser-generated speckles and Digital Image Correlation
          </>,
          <>
            Designed and built a 300W cloud chamber for visualizing ionizing particle paths with cascaded Peltier cooling to -37°C
          </>,
          <>
            Successfully detected failure points on PCBs without causing damage using advanced optical techniques
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
        name: "International School of Photonics, CUSAT",
        description: <>Integrated MSc in Photonics (5-year program, 2022-2027). Specialized in quantum optics and control systems. CGPA: 8.61</>,
      },
      {
        name: "GHSS, Karupadanna",
        description: <>Higher Secondary Education (2020-2022): Majored in Computer Science, Mathematics, and Physics. Grade: 90%</>,
      },
      {
        name: "Technical High School, Kodungallur",
        description: <>Technical Education (2017-2020) with workshop experience in automobile, turning, welding, electrical, electronics, carpentry, fitting, and sheet metal. Majored in automobile engineering. Grade: 98%</>,
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
          <>Python, C++, Verilog, SQL; TensorFlow & Qiskit for quantum computing; COMSOL, MATLAB-Simulink for simulations; 
          CAD tools: FreeCAD, KiCad, Onshape, SolidWorks, Fusion360</>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "C++", icon: "cplusplus" },
          { name: "Verilog", icon: "code" },
          { name: "MATLAB", icon: "matlab" },
        ],
        images: [],
      },
      {
        title: "Hardware & Instrumentation",
        description: (
          <>Oscilloscope automation, Spectrum/Signal Analyzers, EMI Isolation, Fiber Optics & Free-Space Optics, 
          Laser Operation, Signal Processing</>
        ),
        tags: [
          { name: "Oscilloscopes", icon: "oscilloscope" },
          { name: "Laser Systems", icon: "lightbulb" },
          { name: "Fiber Optics", icon: "link" },
          { name: "Signal Processing", icon: "pulse" },
        ],
        images: [],
      },
      {
        title: "Electronics & Prototyping",
        description: (
          <>PCB Design, FPGA systems design, Microcontroller Programming, SMD Soldering (Hot Air/Station), 
          Electronics Prototyping, Sensor Hardware Interfacing</>
        ),
        tags: [
          { name: "PCB Design", icon: "grid" },
          { name: "FPGA", icon: "processor" },
          { name: "Microcontrollers", icon: "chip" },
          { name: "Soldering", icon: "wrench" },
        ],
        images: [],
      },
      {
        title: "CAD & Machining",
        description: (
          <>FreeCAD, KiCad, Onshape, SolidWorks, Fusion360 for CAD design; Lathe & Milling machine operation, 3D printing, Metal fabrication</>
        ),
        tags: [
          { name: "CAD Design", icon: "grid" },
          { name: "Machining", icon: "tool" },
          { name: "3D Printing", icon: "cube" },
          { name: "Fabrication", icon: "wrench" },
        ],
        images: [],
      },
      {
        title: "Machine Learning & Simulation",
        description: (
          <>Proficiency in machine learning techniques, optics simulation, TensorFlow, Qiskit for quantum computing, and COMSOL for photonic simulations</>
        ),
        tags: [
          { name: "TensorFlow", icon: "brain" },
          { name: "MATLAB", icon: "matlab" },
          { name: "Qiskit", icon: "code" },
          { name: "Simulation", icon: "pulse" },
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
      src: "/images/Americium test-optimized.mp4",
      alt: "Cloud chamber Americium test",
      orientation: "horizontal",
      caption: "Cloud Chamber - Americium Test",
    },
    {
      src: "/images/cooling test-optimized.mp4",
      alt: "Cloud chamber cooling test",
      orientation: "horizontal",
      caption: "Cloud Chamber - Cooling Test",
    },
    {
      src: "/images/operation(electron flood)-optimized.mp4",
      alt: "Cloud chamber operation with electron flood",
      orientation: "horizontal",
      caption: "Cloud Chamber - Electron Flood Operation",
    },
    {
      src: "/images/VID_20250124_141833022-optimized.mp4",
      alt: "Cloud chamber particle visualization",
      orientation: "vertical",
      caption: "Cloud Chamber - setup",
    },
    // Humidity & Temperature Data Logger
    {
      src: "/images/final-optimized.jpg",
      alt: "Humidity and temperature data logger final assembly",
      orientation: "vertical",
      caption: "Data Logger - Final Assembly",
    },
    {
      src: "/images/interface-optimized.png",
      alt: "Data logger interface display",
      orientation: "horizontal",
      caption: "Data Logger - Interface",
    },
    {
      src: "/images/internals-optimized.jpg",
      alt: "Data logger internal components",
      orientation: "vertical",
      caption: "Data Logger - Internal Components",
    },
    // EMI Isolation Detector
    {
      src: "/images/emi isolation testing-optimized.jpg",
      alt: "EMI isolation detector testing setup",
      orientation: "horizontal",
      caption: "EMI Isolation - Testing & Measurement",
    },
    {
      src: "/images/outputgraph-optimized.jpg",
      alt: "EMI isolation output graph analysis",
      orientation: "horizontal",
      caption: "EMI Isolation - Output Graph",
    },
    {
      src: "/images/testsetup-optimized.jpg",
      alt: "EMI isolation test setup overview",
      orientation: "horizontal",
      caption: "EMI Isolation - Test Setup",
    },
    // Fiber Optic Communication Link
    {
      src: "/images/videofeed-optimized.jpg",
      alt: "Fiber optic video feed demonstration",
      orientation: "horizontal",
      caption: "Fiber Optic - Video Feed Display",
    },
    {
      src: "/images/videofeed-optimized.mp4",
      alt: "Fiber optic video feed demonstration",
      orientation: "horizontal",
      caption: "Fiber Optic - Video Feed Display",
    },
    // SimRacer Setup
    {
      src: "/images/pedalsandsteeringwheel-optimized.jpg",
      alt: "SimRacer pedals and steering wheel assembly",
      orientation: "horizontal",
      caption: "SimRacer - Pedals & Steering Wheel",
    },
    {
      src: "/images/showcase steering-optimized.jpg",
      alt: "SimRacer steering wheel system showcase",
      orientation: "horizontal",
      caption: "SimRacer - Steering Wheel Assembly",
    },
    {
      src: "/images/uncomplete steering system-optimized.jpg",
      alt: "SimRacer steering system in progress",
      orientation: "horizontal",
      caption: "SimRacer - Steering System Assembly",
    },
    {
      src: "/images/uncomplete pedal system-optimized.jpg",
      alt: "SimRacer pedal system assembly",
      orientation: "horizontal",
      caption: "SimRacer - Pedal System Assembly",
    },
    // PCB Strain Mapping
    {
      src: "/images/hotspot detected-optimized.png",
      alt: "PCB hotspot detection visualization",
      orientation: "horizontal",
      caption: "PCB Strain - Thermal Hotspot Detection",
    },
    {
      src: "/images/IMG_20260212_174414603-optimized.jpg",
      alt: "PCB strain mapping field measurement",
      orientation: "vertical",
      caption: "PCB Strain - Field Measurement Setup",
    },
    {
      src: "/images/IMG_20260212_174437091-optimized.jpg",
      alt: "PCB strain analysis in progress",
      orientation: "vertical",
      caption: "PCB Strain - Analysis Process",
    },
    {
      src: "/images/output strain S trace-optimized.png",
      alt: "PCB strain output trace analysis",
      orientation: "horizontal",
      caption: "PCB Strain - Strain Output Trace",
    },
    // SPI Chip Characterization
    {
      src: "/images/closeup setup-optimized.jpg",
      alt: "SPI communication test setup close-up",
      orientation: "horizontal",
      caption: "SPI Characterization - Test Equipment Detail",
    },
    {
      src: "/images/Spi communication development setup-optimized.jpg",
      alt: "SPI communication development setup",
      orientation: "horizontal",
      caption: "SPI Characterization - Development Setup",
    },
    // Photophoretic Optical Trapping
    {
      src: "/images/optical_trapping-optimized.mp4",
      alt: "Photophoretic optical trapping system demonstration",
      orientation: "vertical",
      caption: "Optical Trapping - System Architecture",
    },
    {
      src: "/images/optical trapping-optimized.png",
      alt: "Photophoretic optical trapping system demonstration",
      orientation: "horizontal",
      caption: "Optical Trapping - System Architecture",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };



