import HeroSection from "../components/landing/HeroSection";
import ImpactStats from "../components/landing/ImpactStats";
import HowItWorks from "../components/landing/HowItWorks";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import SmartDispatchEngine from "../components/landing/SmartDispatchEngine";
import JoinFoodBridge from "../components/landing/JoinFoodBridge";
import CsrEnterpriseImpact from "../components/landing/CsrEnterpriseImpact";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import CtaSection from "../components/landing/CtaSection";

export default function Landing() {
  return (
    <div className="flex flex-col">
      <div id="home">
        <HeroSection />
      </div>
      
      <div id="about">
        <WhyChooseUs />
      </div>

      <div id="how-it-works">
        <HowItWorks />
        <SmartDispatchEngine />
        <JoinFoodBridge />
      </div>

      <div id="impact">
        <ImpactStats />
        <CsrEnterpriseImpact />
      </div>

      <div id="testimonials">
        <Testimonials />
      </div>

      <div id="faq">
        <FAQ />
      </div>

      <div id="contact">
        <CtaSection />
      </div>
    </div>
  )
}
