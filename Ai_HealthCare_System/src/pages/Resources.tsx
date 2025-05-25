import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Segmented } from 'antd';
import { 
  Book, 
  Heart, 
  Activity, 
  Stethoscope, 
  Brain, 
  Eye, 
  HeartPulse, 
  Thermometer
} from 'lucide-react';

const Resources = () => {
  const [activeTab, setActiveTab] = useState("heart-diseases");

  const diseases = [
    {
      id: "heart-diseases",
      name: "Heart Diseases",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      description: "Common cardiovascular conditions affecting the heart and blood vessels",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-2">What are Heart Diseases?</h3>
            <p className="text-gray-700">
              Heart diseases are a group of conditions that affect the structure and function of the heart.
              These include coronary artery disease, heart failure, arrhythmias, and heart valve diseases.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Common Symptoms</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Chest pain or discomfort (angina)</li>
              <li>Shortness of breath</li>
              <li>Irregular heartbeat</li>
              <li>Fatigue and weakness</li>
              <li>Swelling in the legs, ankles, and feet</li>
              <li>Light-headedness or dizziness</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Prevention Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Diet & Nutrition</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Eat a heart-healthy diet rich in fruits, vegetables, and whole grains</li>
                    <li>Limit sodium, sugar, and unhealthy fats</li>
                    <li>Choose lean proteins and fish rich in omega-3 fatty acids</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Lifestyle Changes</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Get regular physical activity (aim for 150 minutes per week)</li>
                    <li>Maintain a healthy weight</li>
                    <li>Quit smoking and avoid secondhand smoke</li>
                    <li>Manage stress through relaxation techniques</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )
    },
    {
      id: "respiratory-diseases",
      name: "Respiratory Diseases",
      icon: <Stethoscope className="h-6 w-6 text-blue-500" />,
      description: "Conditions affecting the lungs and breathing passages",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-2">What are Respiratory Diseases?</h3>
            <p className="text-gray-700">
              Respiratory diseases affect the lungs and other parts of the respiratory system. 
              Common respiratory diseases include asthma, chronic obstructive pulmonary disease (COPD), 
              pneumonia, and tuberculosis.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-medium mb-2">Common Symptoms</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Shortness of breath</li>
              <li>Chronic cough</li>
              <li>Chest pain or tightness</li>
              <li>Wheezing</li>
              <li>Excess mucus production</li>
              <li>Frequent respiratory infections</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Prevention Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Environmental Factors</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Avoid tobacco smoke and air pollutants</li>
                    <li>Use air purifiers in the home</li>
                    <li>Keep indoor humidity at proper levels (30-50%)</li>
                    <li>Reduce exposure to allergens and irritants</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Health Practices</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Get vaccinated against respiratory infections</li>
                    <li>Practice good hand hygiene to prevent infections</li>
                    <li>Stay physically active to maintain lung function</li>
                    <li>Get regular check-ups and follow medical advice</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )
    },
    {
      id: "skin-diseases",
      name: "Skin Diseases",
      icon: <Thermometer className="h-6 w-6 text-orange-500" />,
      description: "Common conditions affecting the skin including infections and inflammatory disorders",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-2">What are Skin Diseases?</h3>
            <p className="text-gray-700">
              Skin diseases encompass a wide range of conditions that affect the skin, including 
              infections, inflammatory disorders, and genetic conditions. Common skin diseases include 
              acne, eczema, psoriasis, and skin cancer.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-medium mb-2">Common Symptoms</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Rashes or inflammation</li>
              <li>Itching or burning sensation</li>
              <li>Changes in skin color or texture</li>
              <li>Unusual growths or moles</li>
              <li>Dry, cracked skin</li>
              <li>Blisters, bumps, or sores</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Prevention Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Sun Protection</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Use broad-spectrum sunscreen with SPF 30 or higher</li>
                    <li>Wear protective clothing and hats in direct sunlight</li>
                    <li>Avoid tanning beds and prolonged sun exposure</li>
                    <li>Seek shade during peak sun hours (10am-4pm)</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-pink-50 border-pink-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Skin Care</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Keep skin clean and moisturized</li>
                    <li>Avoid harsh soaps and chemicals</li>
                    <li>Stay hydrated and eat a balanced diet</li>
                    <li>Regularly check your skin for unusual changes</li>
                    <li>Avoid sharing personal items that contact skin</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )
    },
    {
      id: "neurological-disorders",
      name: "Neurological Disorders",
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      description: "Conditions affecting the brain, spinal cord, and nervous system",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-2">What are Neurological Disorders?</h3>
            <p className="text-gray-700">
              Neurological disorders affect the brain, spinal cord, and nerves throughout the body. 
              They include conditions like Alzheimer's disease, Parkinson's disease, epilepsy, 
              stroke, migraine, and multiple sclerosis.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-medium mb-2">Common Symptoms</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Headaches or migraines</li>
              <li>Memory problems or confusion</li>
              <li>Muscle weakness or paralysis</li>
              <li>Tremors or coordination problems</li>
              <li>Seizures</li>
              <li>Vision or speech problems</li>
              <li>Sleep disturbances</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Prevention Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-indigo-50 border-indigo-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Brain Health</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Stay mentally active with puzzles and learning new skills</li>
                    <li>Get adequate sleep (7-9 hours for adults)</li>
                    <li>Protect your head during sports and activities</li>
                    <li>Manage cardiovascular risk factors</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-teal-50 border-teal-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Lifestyle Factors</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Follow a Mediterranean-style diet rich in antioxidants</li>
                    <li>Stay physically active to improve brain circulation</li>
                    <li>Avoid excessive alcohol consumption</li>
                    <li>Manage stress through mindfulness and relaxation techniques</li>
                    <li>Maintain social connections</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )
    },
    {
      id: "infectious-diseases",
      name: "Infectious Diseases",
      icon: <Activity className="h-6 w-6 text-green-500" />,
      description: "Illnesses caused by bacteria, viruses, fungi, or parasites",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-2">What are Infectious Diseases?</h3>
            <p className="text-gray-700">
              Infectious diseases are disorders caused by organisms such as bacteria, viruses, fungi, or parasites. 
              Many infectious diseases can be passed from person to person, while others are transmitted by bites from 
              insects or animals, or by ingesting contaminated food or water.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-medium mb-2">Common Symptoms</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Fever</li>
              <li>Fatigue</li>
              <li>Muscle aches</li>
              <li>Coughing or sneezing</li>
              <li>Digestive issues (nausea, vomiting, diarrhea)</li>
              <li>Rash or skin changes</li>
              <li>Swollen lymph nodes</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Prevention Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Hygiene Practices</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Wash hands frequently with soap and water</li>
                    <li>Cover mouth and nose when coughing or sneezing</li>
                    <li>Avoid close contact with sick individuals</li>
                    <li>Clean and disinfect frequently touched surfaces</li>
                    <li>Practice safe food handling and preparation</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-cyan-50 border-cyan-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Medical Prevention</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Stay up to date with recommended vaccines</li>
                    <li>Use insect repellent in areas with insect-borne diseases</li>
                    <li>Practice safe sex</li>
                    <li>Don't share personal items like toothbrushes or razors</li>
                    <li>Seek medical attention promptly when infected</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )
    },
    {
      id: "eye-conditions",
      name: "Eye Conditions",
      icon: <Eye className="h-6 w-6 text-blue-500" />,
      description: "Disorders affecting vision and eye health",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-2">What are Common Eye Conditions?</h3>
            <p className="text-gray-700">
              Eye conditions encompass a range of disorders affecting vision and eye health. 
              These include refractive errors (nearsightedness, farsightedness), cataracts, 
              glaucoma, age-related macular degeneration, and diabetic retinopathy.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-medium mb-2">Common Symptoms</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Blurred or distorted vision</li>
              <li>Eye pain or discomfort</li>
              <li>Redness or irritation</li>
              <li>Sensitivity to light</li>
              <li>Dry eyes or excessive tearing</li>
              <li>Seeing spots or floaters</li>
              <li>Peripheral vision loss</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Prevention Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-sky-50 border-sky-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Eye Protection</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Wear sunglasses that block 99-100% of UV-A and UV-B radiation</li>
                    <li>Use protective eyewear during hazardous activities</li>
                    <li>Take regular breaks when using digital screens (20-20-20 rule)</li>
                    <li>Maintain proper lighting when reading or working</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-violet-50 border-violet-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium mb-2">Health Practices</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Get regular comprehensive eye exams</li>
                    <li>Eat a diet rich in fruits, vegetables, and omega-3 fatty acids</li>
                    <li>Manage chronic conditions like diabetes and hypertension</li>
                    <li>Don't smoke</li>
                    <li>Give your eyes adequate rest</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen my-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-teal-600 mb-2">Health Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about common diseases, their symptoms, and prevention strategies to maintain your health.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-4 mb-10">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8">
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 ">
                {diseases.map((disease) => (
                  <TabsTrigger 
                    key={disease.id} 
                    value={disease.id}
                    className="flex flex-col items-center gap-2 h-8 py-3 border-b-2 border-transparent   transition-colors duration-200"
                  >
                    {disease.icon}
                    <span>{disease.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {diseases.map((disease) => (
              <TabsContent key={disease.id} value={disease.id}>
                <Card className="border-t-4" style={{ borderTopColor: disease.id === "heart-diseases" ? "#ef4444" : 
                                                    disease.id === "respiratory-diseases" ? "#3b82f6" : 
                                                    disease.id === "skin-diseases" ? "#f97316" :
                                                    disease.id === "neurological-disorders" ? "#8b5cf6" :
                                                    disease.id === "infectious-diseases" ? "#10b981" : "#60a5fa" }}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {disease.icon}
                      <div>
                        <CardTitle className="text-2xl">{disease.name}</CardTitle>
                        <CardDescription className="text-base">{disease.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {disease.content}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
            <Book className="h-5 w-5 mr-2" />
            Additional Health Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeartPulse className="h-5 w-5 mr-2 text-pink-500" />
                  Wellness Articles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  Access our collection of wellness articles written by healthcare professionals to stay informed about the latest health trends and research.
                </p>
                <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="h-5 w-5 mr-2 text-blue-500" />
                  Health Guide Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  Download comprehensive health guides on various topics, including seasonal health tips, nutrition guidelines, and exercise plans.
                </p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="h-5 w-6 mr-2 text-orange-500" />
                  Health Calculator Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  Use our health calculators to estimate BMI, daily calorie needs, heart disease risk, and more based on your personal health data.
                </p>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
