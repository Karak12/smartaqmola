import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Kpis from "@/components/Kpis";
import NavCards from "@/components/NavCards";
import NewsAndServices from "@/components/NewsAndServices";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-4">
        <Hero />
        <Kpis />
        <NavCards />
        <NewsAndServices />
      </main>
      <Footer />
    </>
  );
}
