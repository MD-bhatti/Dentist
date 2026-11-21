import { BookingProvider } from '@/context/BookingContext';
import { BookingModal } from '@/components/BookingModal';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { InsuranceMarquee } from '@/components/InsuranceMarquee';
import { Services } from '@/components/Services';
import { SmileGallery } from '@/components/SmileGallery';
import { Doctors } from '@/components/Doctors';
import { Testimonials } from '@/components/Testimonials';
import { HoursContact } from '@/components/HoursContact';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          <InsuranceMarquee />
          <Services />
          <SmileGallery />
          <Doctors />
          <Testimonials />
          <HoursContact />
          <FAQ />
        </main>
        <Footer />
        <BookingModal />
      </div>
    </BookingProvider>
  );
}

export default App;
