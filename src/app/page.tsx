import "swiper/css";
import "swiper/css/bundle";

import LandingHeader from "./_components/LandingHeader";
import LandingSection1 from "./_components/LandingSection1";
import LandingSection2 from "./_components/LandingSection2";
import LandingSection3 from "./_components/LandingSection3";
import LandingSection4 from "./_components/LandingSection4";
import LandingSection5 from "./_components/LandingSection5";
import LandingFooter from "./_components/LandingFooter";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="flex flex-col max-w-7xl mx-auto px-2">
        <LandingSection1 />
        <hr className="block border-gray-500/30 mt-16" />
        <LandingSection2 />
        <LandingSection3 />
        <LandingSection4 />
        <LandingSection5 />
      </main>
      <LandingFooter />
    </>
  );
}
