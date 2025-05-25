
// Simulated doctor data
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  address: string;
  distance: string;
  phone: string;
  rating: number;
}

// This function simulates fetching doctor recommendations
// In a real app, this would call a medical provider API
export const getDoctorRecommendations = async (
  symptoms: string,
  location: string
): Promise<Doctor[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate some fake doctor data based on symptoms
  // In a real app, this would come from an API
  const specialties = determineSpecialties(symptoms);
  
  return specialties.flatMap(specialty => 
    generateDoctorsForSpecialty(specialty, location, 2)
  );
};

// Enhanced logic to determine medical specialties based on symptoms
// In a real app, this would use more sophisticated medical logic or an API
const determineSpecialties = (symptoms: string): string[] => {
  const symptomText = symptoms.toLowerCase();
  const specialties = new Set<string>();
  
  // Neurological symptoms
  if (symptomText.includes('headache') || symptomText.includes('migraine') || 
      symptomText.includes('dizzy') || symptomText.includes('memory') ||
      symptomText.includes('seizure') || symptomText.includes('tremor')) {
    specialties.add('Neurology');
  }
  
  // Cardiac symptoms
  if (symptomText.includes('chest') || symptomText.includes('heart') || 
      symptomText.includes('breath') || symptomText.includes('pressure') ||
      symptomText.includes('palpitation') || symptomText.includes('irregular heartbeat')) {
    specialties.add('Cardiology');
  }
  
  // Digestive symptoms
  if (symptomText.includes('stomach') || symptomText.includes('digest') || 
      symptomText.includes('nausea') || symptomText.includes('vomit') ||
      symptomText.includes('diarrhea') || symptomText.includes('constipation') ||
      symptomText.includes('acid reflux') || symptomText.includes('bowel')) {
    specialties.add('Gastroenterology');
  }
  
  // Dermatological symptoms
  if (symptomText.includes('skin') || symptomText.includes('rash') || 
      symptomText.includes('itch') || symptomText.includes('acne') ||
      symptomText.includes('mole') || symptomText.includes('eczema')) {
    specialties.add('Dermatology');
  }
  
  // Musculoskeletal symptoms
  if (symptomText.includes('joint') || symptomText.includes('muscle') || 
      symptomText.includes('pain') || symptomText.includes('back') ||
      symptomText.includes('arthritis') || symptomText.includes('sprain')) {
    specialties.add('Orthopedics');
  }
  
  // Respiratory symptoms
  if (symptomText.includes('cough') || symptomText.includes('breath') ||
      symptomText.includes('asthma') || symptomText.includes('lung') ||
      symptomText.includes('wheeze') || symptomText.includes('pneumonia')) {
    specialties.add('Pulmonology');
  }
  
  // ENT symptoms
  if (symptomText.includes('ear') || symptomText.includes('nose') ||
      symptomText.includes('throat') || symptomText.includes('sinus') ||
      symptomText.includes('hearing') || symptomText.includes('tonsil')) {
    specialties.add('Otolaryngology (ENT)');
  }
  
  // Eye symptoms
  if (symptomText.includes('eye') || symptomText.includes('vision') ||
      symptomText.includes('blur') || symptomText.includes('sight')) {
    specialties.add('Ophthalmology');
  }
  
  // Mental health symptoms
  if (symptomText.includes('anxiety') || symptomText.includes('depress') ||
      symptomText.includes('mood') || symptomText.includes('stress') ||
      symptomText.includes('mental') || symptomText.includes('sleep')) {
    specialties.add('Psychiatry');
  }
  
  // Endocrine symptoms
  if (symptomText.includes('diabetes') || symptomText.includes('thyroid') ||
      symptomText.includes('hormones') || symptomText.includes('fatigue') ||
      symptomText.includes('weight') || symptomText.includes('thirst')) {
    specialties.add('Endocrinology');
  }
  
  // Gynecological symptoms
  if (symptomText.includes('period') || symptomText.includes('pregnancy') ||
      symptomText.includes('vaginal') || symptomText.includes('menstrual')) {
    specialties.add('Obstetrics & Gynecology');
  }
  
  // Urological symptoms
  if (symptomText.includes('urinate') || symptomText.includes('bladder') ||
      symptomText.includes('kidney') || symptomText.includes('prostate')) {
    specialties.add('Urology');
  }
  
  // Allergies and immunology
  if (symptomText.includes('allerg') || symptomText.includes('immune') ||
      symptomText.includes('hives') || symptomText.includes('sneez')) {
    specialties.add('Allergy & Immunology');
  }
  
  // Default to Family Medicine if no specific specialty is found
  // This is more specific than General Practice
  if (specialties.size === 0) {
    specialties.add('Family Medicine');
  }
  
  return Array.from(specialties);
};

// Generate fake doctor data
const generateDoctorsForSpecialty = (specialty: string, location: string, count: number): Doctor[] => {
  const doctors: Doctor[] = [];
  const locationPrefix = location.split(' ')[0];
  
  for (let i = 1; i <= count; i++) {
    const id = `${specialty.substring(0, 3)}-${i}-${Math.floor(Math.random() * 1000)}`;
    doctors.push({
      id,
      name: `Dr. ${getRandomLastName()}`,
      specialty,
      address: `${Math.floor(Math.random() * 1000) + 100} ${getRandomStreetName()} St, ${locationPrefix}, ${getRandomZipCode()}`,
      distance: `${(Math.random() * 5 + 0.5).toFixed(1)} miles`,
      phone: getRandomPhoneNumber(),
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 star rating
    });
  }
  
  return doctors;
};

const getRandomLastName = (): string => {
  const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White'];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomStreetName = (): string => {
  const streets = ['Main', 'Oak', 'Maple', 'Park', 'Elm', 'Washington', 'Lake', 'Hill', 'Pine', 'Cedar', 'Walnut', 'Highland', 'Meadow', 'Forest', 'River', 'Valley', 'Summit', 'Willow', 'Spring', 'Sunset'];
  return streets[Math.floor(Math.random() * streets.length)];
};

const getRandomZipCode = (): string => {
  return `${Math.floor(Math.random() * 90000) + 10000}`;
};

const getRandomPhoneNumber = (): string => {
  const area = Math.floor(Math.random() * 900) + 100;
  const middle = Math.floor(Math.random() * 900) + 100;
  const last = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${middle}-${last}`;
};
