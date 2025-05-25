import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dumbbell, Heart, Bed, Utensils, Scale } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Define the schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0 && parseInt(val) <= 120, {
    message: 'Age must be a number between 1 and 120.',
  }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your gender.',
  }),
  weight: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 30 && parseInt(val) <= 300, {
    message: 'Weight must be a number between 30 and 300 kg.',
  }),
  height: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 100 && parseInt(val) <= 250, {
    message: 'Height must be a number between 100 and 250 cm.',
  }),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active'], {
    required_error: 'Please select your activity level.',
  }),
  goal: z.enum(['lose_weight', 'maintain', 'gain_muscle'], {
    required_error: 'Please select your goal.',
  }),
  sleepPattern: z.enum(['early_bird', 'night_owl', 'average'], {
    required_error: 'Please select your sleep pattern.',
  }),
  healthConditions: z.array(z.string()).optional(),
  dietaryPreferences: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;


const HealthPlan: React.FC = () => {
  

  const [plan, setPlan] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sleepTime: string;
    wakeTime: string;
    exerciseType: string;
    exerciseDuration: number;
    exerciseFrequency: number;
    exerciseTime: string;
    dietPlan: { meal: string; options: string[] }[];
  } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '',
      gender: 'male',
      weight: '',
      height: '',
      activityLevel: 'moderate',
      goal: 'maintain',
      sleepPattern: 'average',
      healthConditions: [],
      dietaryPreferences: [],
    },
  });

  const generatePlan = (data: FormData) => {
    // Calculate BMR using Harris-Benedict formula
    const age = parseInt(data.age);
    const weight = parseInt(data.weight); // kg
    const height = parseInt(data.height); // cm
    const isMale = data.gender === 'male';

    let bmr = 0;
    if (isMale) {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    // Goal adjustments
    const goalAdjustments = {
      lose_weight: 0.8,
      maintain: 1.0,
      gain_muscle: 1.15,
    };

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultipliers[data.activityLevel as keyof typeof activityMultipliers];
    
    // Calculate target calories based on goal
    const targetCalories = Math.round(tdee * goalAdjustments[data.goal as keyof typeof goalAdjustments]);
    
    // Calculate macronutrients
    let protein = 0, carbs = 0, fat = 0;
    
    if (data.goal === 'gain_muscle') {
      protein = Math.round(weight * 2.2); // 2.2g per kg of body weight
      fat = Math.round((targetCalories * 0.25) / 9); // 25% of calories from fat
      carbs = Math.round((targetCalories - (protein * 4) - (fat * 9)) / 4); // Remaining calories from carbs
    } else if (data.goal === 'lose_weight') {
      protein = Math.round(weight * 1.8); // 1.8g per kg of body weight
      fat = Math.round((targetCalories * 0.3) / 9); // 30% of calories from fat
      carbs = Math.round((targetCalories - (protein * 4) - (fat * 9)) / 4); // Remaining calories from carbs
    } else {
      protein = Math.round(weight * 1.6); // 1.6g per kg of body weight
      fat = Math.round((targetCalories * 0.25) / 9); // 25% of calories from fat
      carbs = Math.round((targetCalories - (protein * 4) - (fat * 9)) / 4); // Remaining calories from carbs
    }

    // Sleep times based on age and preference
    let sleepTime = '', wakeTime = '';
    if (data.sleepPattern === 'early_bird') {
      sleepTime = '9:30 PM';
      wakeTime = '5:30 AM';
    } else if (data.sleepPattern === 'night_owl') {
      sleepTime = '11:30 PM';
      wakeTime = '7:30 AM';
    } else {
      sleepTime = '10:30 PM';
      wakeTime = '6:30 AM';
    }
    
    // If user is older than 60, add an hour of sleep
    if (age > 60) {
      sleepTime = sleepTime.includes('11:30') ? '10:30 PM' : sleepTime.includes('10:30') ? '9:30 PM' : '8:30 PM';
    }
    
    // Exercise recommendations
    let exerciseType = '';
    let exerciseDuration = 0;
    let exerciseFrequency = 0;
    let exerciseTime = '';
    
    if (data.goal === 'lose_weight') {
      exerciseType = age > 50 ? 'Low-impact cardio (walking, swimming, cycling)' : 'Mix of cardio and HIIT';
      exerciseDuration = 45;
      exerciseFrequency = 5;
      exerciseTime = data.sleepPattern === 'early_bird' ? 'Morning (6:30 AM - 8:00 AM)' : 'Evening (5:00 PM - 7:00 PM)';
    } else if (data.goal === 'gain_muscle') {
      exerciseType = 'Strength training with progressive overload';
      exerciseDuration = 60;
      exerciseFrequency = 4;
      exerciseTime = 'Afternoon (4:00 PM - 6:00 PM)';
    } else {
      exerciseType = 'Balanced mix of cardio, strength, and flexibility';
      exerciseDuration = 30;
      exerciseFrequency = 4;
      exerciseTime = data.sleepPattern === 'early_bird' ? 'Morning' : 'Evening';
    }
    
    // Diet plan
    const dietPlan = [
      {
        meal: "Breakfast",
        options: [
          "Oatmeal with berries and nuts",
          "Greek yogurt with honey and fruit",
          "Eggs with whole grain toast and avocado"
        ]
      },
      {
        meal: "Lunch",
        options: [
          "Grilled chicken salad with olive oil dressing",
          "Quinoa bowl with roasted vegetables",
          "Tuna wrap with mixed greens"
        ]
      },
      {
        meal: "Dinner",
        options: [
          "Baked salmon with sweet potato and steamed broccoli",
          "Lean beef stir-fry with brown rice",
          "Turkey chili with mixed vegetables"
        ]
      },
      {
        meal: "Snacks",
        options: [
          "Apple with almond butter",
          "Protein shake with banana",
          "Carrot sticks with hummus"
        ]
      }
    ];


    // Create personalized plan
    const personalizedPlan = {
      calories: targetCalories,
      protein,
      carbs,
      fat,
      sleepTime,
      wakeTime,
      exerciseType,
      exerciseDuration,
      exerciseFrequency,
      exerciseTime,
      dietPlan
    };
    
    setPlan(personalizedPlan);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    generatePlan(data);
    setTabValue("results"); 
    

  };
  
  const healthConditions = [
    { id: "diabetes", label: "Diabetes" },
    { id: "hypertension", label: "Hypertension" },
    { id: "heart_disease", label: "Heart Disease" },
    { id: "arthritis", label: "Arthritis" }
  ];
  
  const dietaryPreferences = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten_free", label: "Gluten-free" },
    { id: "dairy_free", label: "Dairy-free" }
  ];
const [tabValue, setTabValue] = useState("form");
  return (
    <div className="min-h-screen bg-gray-50 my-14">
      <div className="container mx-auto py-10 px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Personalized Health Plan</h1>
          <p className="text-gray-600 md:text-lg">
            Fill in your details below to receive a customized diet, exercise, and sleep plan tailored just for you.
          </p>
        </div>

        <Tabs value={tabValue} onValueChange={setTabValue} defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Fill Your Information</TabsTrigger>
            <TabsTrigger value="results" disabled={!plan}>Your Health Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <Card className="shadow-lg border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Enter your details to generate a personalized health and wellness plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter your age" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter your weight in kg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter your height in cm" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Male</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Female</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="other" />
                                <Label htmlFor="other">Other</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="activityLevel"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Activity Level</FormLabel>
                          <FormDescription>
                            How active are you during a typical week?
                          </FormDescription>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 md:grid-cols-2 gap-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sedentary" id="sedentary" />
                                <Label htmlFor="sedentary">Sedentary (little to no exercise)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="light" id="light" />
                                <Label htmlFor="light">Light (1-3 days/week)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="moderate" id="moderate" />
                                <Label htmlFor="moderate">Moderate (3-5 days/week)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="active" id="active" />
                                <Label htmlFor="active">Active (6-7 days/week)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="very_active" id="very_active" />
                                <Label htmlFor="very_active">Very Active (twice daily)</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Health Goal</FormLabel>
                          <FormDescription>
                            What's your primary health goal?
                          </FormDescription>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="lose_weight" id="lose_weight" />
                                <Label htmlFor="lose_weight">Lose Weight</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="maintain" id="maintain" />
                                <Label htmlFor="maintain">Maintain Weight & Improve Health</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="gain_muscle" id="gain_muscle" />
                                <Label htmlFor="gain_muscle">Gain Muscle</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sleepPattern"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Sleep Pattern</FormLabel>
                          <FormDescription>
                            Which best describes your natural sleep pattern?
                          </FormDescription>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="early_bird" id="early_bird" />
                                <Label htmlFor="early_bird">Early Bird (Early to bed, early to rise)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="night_owl" id="night_owl" />
                                <Label htmlFor="night_owl">Night Owl (Stay up late, wake up late)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="average" id="average" />
                                <Label htmlFor="average">Average (Neither early nor late)</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="healthConditions"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Health Conditions (Optional)</FormLabel>
                            <FormDescription>
                              Select any health conditions you have.
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {healthConditions.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="healthConditions"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            const current = field.value || []
                                            return checked
                                              ? field.onChange([...current, item.id])
                                              : field.onChange(
                                                  current.filter((value) => value !== item.id)
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dietaryPreferences"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Dietary Preferences (Optional)</FormLabel>
                            <FormDescription>
                              Select any dietary preferences you have.
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {dietaryPreferences.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="dietaryPreferences"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            const current = field.value || []
                                            return checked
                                              ? field.onChange([...current, item.id])
                                              : field.onChange(
                                                  current.filter((value) => value !== item.id)
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button  type="submit" className="w-full">
                      Generate My Health Plan
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="results" className='transition-opacity duration-500 ease-in-out'>
            {plan && (
              <div className="space-y-6">
                <Card className="border-t-4 border-t-green-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="h-6 w-6 text-green-500" />
                      Your Nutrition Plan
                    </CardTitle>
                    <CardDescription>
                      Personalized dietary recommendations based on your profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-green-600 font-semibold">Daily Calories</div>
                        <div className="text-2xl font-bold">{plan.calories}</div>
                        <div className="text-sm text-green-600">kcal</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-blue-600 font-semibold">Protein</div>
                        <div className="text-2xl font-bold">{plan.protein}g</div>
                        <div className="text-sm text-blue-600">{Math.round((plan.protein * 4 / plan.calories) * 100)}% of calories</div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg text-center">
                        <div className="text-amber-600 font-semibold">Carbohydrates</div>
                        <div className="text-2xl font-bold">{plan.carbs}g</div>
                        <div className="text-sm text-amber-600">{Math.round((plan.carbs * 4 / plan.calories) * 100)}% of calories</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-purple-600 font-semibold">Fats</div>
                        <div className="text-2xl font-bold">{plan.fat}g</div>
                        <div className="text-sm text-purple-600">{Math.round((plan.fat * 9 / plan.calories) * 100)}% of calories</div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-4">Sample Diet Plan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {plan.dietPlan.map((meal, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-medium text-green-700 mb-2">{meal.meal}</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {meal.options.map((option, i) => (
                              <li key={i}>{option}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-t-4 border-t-blue-500 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Dumbbell className="h-6 w-6 text-blue-500" />
                        Your Exercise Plan
                      </CardTitle>
                      <CardDescription>
                        Recommended physical activity for optimal results
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="font-semibold mb-1">Recommended Exercise Type</div>
                          <div className="text-lg">{plan.exerciseType}</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <div className="font-semibold text-sm mb-1">Duration</div>
                            <div className="text-lg">{plan.exerciseDuration} min</div>
                            <div className="text-xs text-gray-600">per session</div>
                          </div>
                          
                          <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <div className="font-semibold text-sm mb-1">Frequency</div>
                            <div className="text-lg">{plan.exerciseFrequency}x</div>
                            <div className="text-xs text-gray-600">per week</div>
                          </div>
                          
                          <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <div className="font-semibold text-sm mb-1">Best Time</div>
                            <div className="text-lg">{plan.exerciseTime.split(' ')[0]}</div>
                            <div className="text-xs text-gray-600">{plan.exerciseTime}</div>
                          </div>
                        </div>
                        
                        <div className="text-gray-700 mt-4">
                          <p>Aim for a mix of cardio and strength training throughout the week. Start gradually if you're new to exercise and increase intensity over time.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-t-4 border-t-indigo-500 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bed className="h-6 w-6 text-indigo-500" />
                        Your Sleep Plan
                      </CardTitle>
                      <CardDescription>
                        Optimize your rest for better health outcomes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-6">
                        <div className="bg-indigo-50 p-4 rounded-lg text-center flex-1 mr-2">
                          <div className="font-semibold mb-1">Bedtime</div>
                          <div className="text-xl font-medium">{plan.sleepTime}</div>
                        </div>
                        
                        <div className="bg-indigo-50 p-4 rounded-lg text-center flex-1 ml-2">
                          <div className="font-semibold mb-1">Wake Up</div>
                          <div className="text-xl font-medium">{plan.wakeTime}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Sleep Hygiene Tips:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          <li>Maintain a consistent sleep schedule, even on weekends</li>
                          <li>Avoid screens 1 hour before bedtime</li>
                          <li>Keep your bedroom cool, dark, and quiet</li>
                          <li>Limit caffeine after noon and avoid large meals before bed</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="shadow-lg border-t-4 border-t-amber-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-6 w-6 text-red-500" />
                      Wellness Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-medium text-amber-700 mb-2">Hydration</h4>
                        <p className="text-gray-700">Drink at least 8-10 glasses of water daily. Increase intake during exercise and hot weather.</p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-700 mb-2">Stress Management</h4>
                        <p className="text-gray-700">Practice mindfulness, deep breathing, or meditation for 10-15 minutes daily.</p>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-700 mb-2">Regular Check-ups</h4>
                        <p className="text-gray-700">Schedule annual physical exams and follow up on any health conditions.</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-gray-500">
                      Note: This health plan is a general recommendation. Always consult with healthcare professionals before making significant changes to your diet or exercise routine.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HealthPlan;
