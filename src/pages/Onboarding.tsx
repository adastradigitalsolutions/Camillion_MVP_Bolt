import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Upload, Calendar, Activity, Apple, Wine, Target, Trophy } from 'lucide-react';

const screens = [
  {
    id: 1,
    title: "Welcome 🎉💪🔥",
    content: "Welcome to your personalized fitness journey! Answer a few questions to help us create the perfect program for you.",
    buttonText: "Let's Start!"
  },
  {
    id: 2,
    type: "form",
    title: "Personal Information",
    fields: [
      { name: "fullName", type: "text", label: "Full Name" },
      { name: "dateOfBirth", type: "date", label: "Date of Birth" },
      { name: "weight", type: "number", label: "Current Weight (kg)" },
      { name: "height", type: "number", label: "Height (cm)" }
    ]
  },
  {
    id: 3,
    type: "multiChoice",
    title: "Your Lifestyle",
    questions: [
      {
        question: "Job Type",
        options: ["Very demanding", "Moderate", "Sedentary"]
      },
      {
        question: "Lifestyle",
        options: ["Active", "Moderately active", "Sedentary"]
      }
    ]
  },
  {
    id: 4,
    type: "motivational",
    title: "Every Step Counts!",
    content: "Your lifestyle impacts your progress. Even small changes can make a difference!",
    icon: Activity
  },
  {
    id: 5,
    type: "form",
    title: "Current Training",
    fields: [
      { name: "trainingExperience", type: "number", label: "How long have you been training? (months)" },
      { name: "trainingType", type: "text", label: "Type of training (optional)" }
    ],
    hasUpload: true
  },
  {
    id: 6,
    type: "frequency",
    title: "Training Frequency",
    question: "How many times per week do you want to train?",
    options: [2, 3, 4]
  },
  {
    id: 7,
    type: "form",
    title: "Health & Wellness",
    fields: [
      { 
        name: "medicalConditions", 
        type: "textarea", 
        label: "Current/past medical conditions",
        placeholder: "List any medical conditions that might affect your training"
      },
      { 
        name: "medications", 
        type: "text", 
        label: "Current medications",
        placeholder: "List any medications you're currently taking"
      },
      { 
        name: "jointPain", 
        type: "text", 
        label: "Any joint pain?",
        placeholder: "Describe any joint pain or discomfort"
      },
      { 
        name: "surgeries", 
        type: "text", 
        label: "Past surgeries",
        placeholder: "List any relevant surgeries"
      }
    ]
  },
  {
    id: 8,
    type: "nutrition",
    title: "Nutrition",
    icon: Apple,
    fields: [
      { 
        name: "diet", 
        type: "textarea", 
        label: "Describe your usual diet",
        placeholder: "Include typical meals and eating patterns"
      },
      { 
        name: "supplements", 
        type: "text", 
        label: "Current supplements",
        placeholder: "List any supplements you take regularly"
      },
      { 
        name: "allergies", 
        type: "text", 
        label: "Food intolerances/allergies",
        placeholder: "List any food allergies or intolerances"
      }
    ]
  },
  {
    id: 9,
    type: "lifestyle",
    title: "Lifestyle Details",
    icon: Wine,
    questions: [
      {
        question: "Alcohol consumption",
        options: ["Never", "Once a week", "More than 3 times a week"]
      },
      {
        question: "Menstrual cycle",
        options: ["Regular", "Irregular", "Not applicable"]
      }
    ]
  },
  {
    id: 10,
    type: "goals",
    title: "Your Goals",
    question: "What are your main goals? (Select all that apply)",
    options: [
      "Weight loss",
      "Muscle gain",
      "Performance improvement",
      "General well-being",
      "Flexibility",
      "Stress reduction",
      "Better sleep",
      "Other"
    ]
  },
  {
    id: 11,
    type: "conclusion",
    title: "Awesome! 🎉",
    content: "We have everything we need to create your personalized plan. Get ready to give it your all!",
    buttonText: "Explore the app",
    icon: Trophy,
    showDemo: true
  }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [formData, setFormData] = useState<any>({
    selectedGoals: []
  });
  const [showDemo, setShowDemo] = useState(false);

  const handleNext = () => {
    if (currentScreen === screens.length - 1) {
      if (screens[currentScreen].showDemo && !showDemo) {
        setShowDemo(true);
      } else {
        localStorage.setItem('onboardingData', JSON.stringify(formData));
        localStorage.setItem('onboardingCompleted', 'true');
        navigate('/subscription');
      }
    } else {
      setCurrentScreen(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(prev => prev - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => {
      const goals = prev.selectedGoals || [];
      if (goals.includes(goal)) {
        return { ...prev, selectedGoals: goals.filter((g: string) => g !== goal) };
      } else {
        return { ...prev, selectedGoals: [...goals, goal] };
      }
    });
  };

  const handleOptionSelect = (question: string, option: string) => {
    setFormData(prev => ({ ...prev, [question]: option }));
  };

  const screenVariants = {
    enter: { x: 1000, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -1000, opacity: 0 }
  };

  const demoFeatures = [
    {
      title: "Training Programs",
      description: "Access personalized workout plans tailored to your goals"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your progress with photos and measurements"
    },
    {
      title: "Exercise Library",
      description: "Browse through detailed exercise demonstrations"
    },
    {
      title: "Personal Notes",
      description: "Keep track of your thoughts and achievements"
    }
  ];

  const renderScreen = (screen: any) => {
    const Icon = screen.icon;

    if (showDemo) {
      return (
        <motion.div
          key="demo"
          className="w-full max-w-lg mx-auto p-6"
          variants={screenVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-center">Quick Tour</h2>
            <div className="space-y-6">
              {demoFeatures.map((feature, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                localStorage.setItem('onboardingData', JSON.stringify(formData));
                localStorage.setItem('onboardingCompleted', 'true');
                navigate('/subscription');
              }}
              className="btn-primary w-full mt-6"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      );
    }

    if (screen.type === "goals") {
      return (
        <motion.div
          key={screen.id}
          className="w-full max-w-lg mx-auto p-6"
          variants={screenVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="card">
            <h2 className="text-2xl font-bold mb-4 text-center">{screen.title}</h2>
            <p className="text-gray-600 text-center mb-6">{screen.question}</p>
            <div className="grid gap-3">
              {screen.options.map((option: string) => (
                <button
                  key={option}
                  onClick={() => handleGoalToggle(option)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    formData.selectedGoals.includes(option)
                      ? 'border-[--primary] bg-[--primary] bg-opacity-10'
                      : 'border-gray-200 hover:border-[--primary]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleBack}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <button
                onClick={handleNext}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
                disabled={formData.selectedGoals.length === 0}
              >
                Continue
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={screen.id}
        className="w-full max-w-lg mx-auto p-6"
        variants={screenVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="card">
          {Icon && <Icon className="w-12 h-12 mx-auto mb-4 text-[--primary]" />}
          <h2 className="text-2xl font-bold mb-4 text-center">{screen.title}</h2>
          
          {screen.content && (
            <p className="text-gray-600 text-center mb-6">{screen.content}</p>
          )}

          {screen.type === "form" && (
            <div className="space-y-4">
              {screen.fields.map((field: any) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      onChange={handleInputChange}
                      className="input-field"
                      rows={4}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              {screen.hasUpload && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload current training plan (optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-[--primary] hover:text-[--secondary] focus-within:outline-none">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {screen.type === "multiChoice" && (
            <div className="space-y-6">
              {screen.questions.map((q: any) => (
                <div key={q.question} className="space-y-2">
                  <h3 className="font-medium">{q.question}</h3>
                  <div className="grid gap-2">
                    {q.options.map((option: string) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(q.question, option)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData[q.question] === option
                            ? 'border-[--primary] bg-[--primary] bg-opacity-10'
                            : 'border-gray-200 hover:border-[--primary]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {screen.type === "frequency" && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {screen.options.map((option: number) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect('frequency', option)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData['frequency'] === option
                      ? 'border-[--primary] bg-[--primary] bg-opacity-10'
                      : 'border-gray-200 hover:border-[--primary]'
                  }`}
                >
                  <span className="block text-2xl font-bold mb-1">{option}x</span>
                  <span className="text-sm">per week</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-6">
            {currentScreen > 0 && (
              <button
                onClick={handleBack}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <ChevronLeft size={20} />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {screen.buttonText || "Continue"}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          {Array.from({ length: screens.length }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full mx-1 ${
                i === currentScreen ? 'bg-[--primary]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <AnimatePresence mode="wait">
        {renderScreen(screens[currentScreen])}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;