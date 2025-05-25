import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const Hero: React.FC = () => {
  return (
    <div className="text-center my-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Welcome to{' '}
        <span className="text-blue-600 inline-block">
          <TypeAnimation
            sequence={[
              'HealthCare',
              1000,
              '', // pause and clear
              500,
            ]}
            wrapper="span"
            speed={70}
            repeat={Infinity}
          />
        </span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
Revolutionizing healthcare with instant access to expert consultations and intelligent medical insights—right at your fingertips      </p>
    </div>
  );
};

export default Hero;
