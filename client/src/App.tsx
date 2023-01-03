import './App.css';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Qualification from './components/qualification/Qualification';
import ScrollUp from './components/scrollup/ScrollUp';
import Services from './components/services/Services';
import Skills from './components/skills/Skills';
import Testimonials from './components/testimonials/Testimonials';
import Work from './components/work/Work';

function App() {

  let path:any = document.querySelector('path');
  let pathLength:any = path?.getTotalLength();

  // path.style.strokeDasharray = pathLength + ' ' + pathLength;

  // path.style.strokeDashoffset = pathLength;

  // window.addEventListener('scroll', () => {
  //   var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  //   console.log(scrollPercentage);
  //   var drawLength = pathLength * scrollPercentage;
  //   console.log(pathLength,drawLength)
  //   path.style.strokeDashoffset = pathLength - drawLength;
  // })

  return (
    <>
    <Header />

    <main className='main'>

      <div className="line-container">
        <svg  viewBox="0 0 59 5760" fill="none" preserveAspectRatio='xMidYMax meet'>
          <path d="M0.166667 29.5C0.166667 45.7004 13.2996 58.8333 29.5 58.8333C45.7004 58.8333 58.8333 45.7004 58.8333 29.5C58.8333 13.2996 45.7004 0.166667 29.5 0.166667C13.2996 0.166667 0.166667 13.2996 0.166667 29.5ZM0.166667 5730C0.166667 5746.2 13.2996 5759.33 29.5 5759.33C45.7004 5759.33 58.8333 5746.2 58.8333 5730C58.8333 5713.8 45.7004 5700.67 29.5 5700.67C13.2996 5700.67 0.166667 5713.8 0.166667 5730ZM24 29.5V5730H35V29.5H24Z" fill="black"/>
        </svg>
      </div>

      <Home />
      <About />
      <Work />
      <Skills />
      {/* <Services /> */}
      <Qualification />
      <Testimonials />
      <Contact />
    </main>

      <Footer />
      <ScrollUp />
    </>
  );
}

export default App;
