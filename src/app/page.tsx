// Home page - displays About content
import About, { generateMetadata as generateAboutMetadata } from "./about/page";

export async function generateMetadata() {
  const metadata = await generateAboutMetadata();
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      url: "/",
    },
  };
}

export default function Home() {
  return <About />;
}
