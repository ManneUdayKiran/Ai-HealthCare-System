
import React from 'react';
import { Carousel } from 'antd';


const HeroImage: React.FC = () => {
  return (
    <div className="mb-16 overflow-hidden rounded-2xl shadow-xl">
      <div className="relative">
  <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
        <div>
          <img 
            src="/lovable-uploads/HealthCare.jpg" 
            alt="Doctor with patient" 
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div>
          <img 
            src="/lovable-uploads/HealthCare2.webp" 
            alt="Nurse assisting patient" 
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div>
          <img 
            src="/lovable-uploads/HealthCare3.jpg" 
            alt="Medical team in discussion" 
            className="w-full h-[400px] object-cover"
          />
        </div>
  </Carousel>      
    {/* <img 
          src="/lovable-uploads/HealthCare.jpg" 
          alt="Caregiver with elderly patient" 
          className="w-full h-[400px] object-cover"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent flex items-center">
          <div className="p-8 text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Your health, our priority always.</h2>
            {/* <p className="text-lg">Our network of healthcare professionals is committed to providing personalized care with empathy and understanding.</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
