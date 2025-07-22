import Body from "@/components/body/Body";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow">
        <Body/>
      </main>
      <Footer/>
    </div>
  );
}