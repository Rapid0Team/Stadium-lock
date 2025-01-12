import './HeroSection.css'
import { Navigation, Pagination, Scrollbar, A11y,Autoplay  } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return (
    <div className="heroSection-container" id='home'>

      <div className="heros">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 1500, // 1.5 seconds
            disableOnInteraction: false, // Keep autoplay active after user interaction
          }}>
          <SwiperSlide>
            <div className="hero hero1">
              <div className="hero-content">
                <h1 className="hero-title">Bienvenue au Stade du Club!</h1>
                <p className="hero-description">
                  Découvrez l'expérience ultime de football sur notre terrain.
                </p>
                <button className="btn btn-reserver-hero"><Link to="/reserver" >Reserver now</Link></button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero hero2">
              <div className="hero-content">
                <h1 className="hero-title">Bienvenue au Stade du Club!</h1>
                <p className="hero-description">
                  Découvrez l'expérience ultime de Tenis sur notre terrain.
                </p>
                <button className="btn btn-reserver-hero"><Link to="/reserver" >Reserver now</Link></button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero hero3">
              <div className="hero-content">
                <h1 className="hero-title">Bienvenue au Stade du Club!</h1>
                <p className="hero-description">
                  Découvrez l'expérience ultime de BasketBall sur notre terrain.
                </p>
                <button className="btn btn-reserver-hero"> <Link to="/reserver" >Reserver now</Link> </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

      </div>


    </div>
  )
}
export default HeroSection