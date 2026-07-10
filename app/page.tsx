import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
import Hero from "./components/Hero";
import Kpis from "./components/Kpis";
import NavCards from "./components/NavCards";
import NewsAndServices from "./components/NewsAndServices";
import NewsTicker from "./components/NewsTicker";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-4">
        <Hero />
        <Kpis />
        <NewsTicker />
        <NavCards />
        <NewsAndServices />
      </main>
      <Footer />
    </>
  );
}
