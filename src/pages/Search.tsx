import React, { useState, useMemo } from 'react';
import { SearchIcon, ChevronRight, X, ChevronLeft } from 'lucide-react';

const muscleGroups = [
  {
    id: 'chest',
    name: 'Chest',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2940&auto=format&fit=crop',
    exercises: [
      {
        id: 1,
        title: 'Bench Press',
        description: 'A compound exercise that works the chest, shoulders, and triceps.',
        videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
        muscleGroup: 'Chest',
      },
      {
        id: 2,
        title: 'Incline Dumbbell Press',
        description: 'Targets the upper chest while also engaging the shoulders and triceps.',
        videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8',
        muscleGroup: 'Chest',
      }
    ]
  },
  {
    id: 'back',
    name: 'Back',
    image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=2940&auto=format&fit=crop',
    exercises: [
      {
        id: 3,
        title: 'Pull-ups',
        description: 'A compound exercise that targets the entire back, biceps, and core.',
        videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g',
        muscleGroup: 'Back',
      }
    ]
  },
  {
    id: 'legs',
    name: 'Legs',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=2940&auto=format&fit=crop',
    exercises: [
      {
        id: 4,
        title: 'Squats',
        description: 'The king of leg exercises, targeting quadriceps, hamstrings, and glutes.',
        videoUrl: 'https://www.youtube.com/embed/gsNoPYwWXeM',
        muscleGroup: 'Legs',
      }
    ]
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<any | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<any | null>(null);

  // Get all exercises across all muscle groups
  const allExercises = useMemo(() => {
    return muscleGroups.flatMap(group => 
      group.exercises.map(exercise => ({
        ...exercise,
        muscleGroupId: group.id,
        muscleGroupName: group.name
      }))
    );
  }, []);

  // Filter based on search query
  const filteredResults = useMemo(() => {
    const query = searchQuery.toLowerCase();
    
    if (!selectedMuscleGroup) {
      // On main page, show muscle groups and matching exercises from search
      const matchingGroups = muscleGroups.filter(group =>
        group.name.toLowerCase().includes(query)
      );

      const matchingExercises = !query ? [] : allExercises.filter(exercise =>
        exercise.title.toLowerCase().includes(query)
      );

      return {
        muscleGroups: matchingGroups,
        exercises: matchingExercises
      };
    } else {
      // On muscle group page, only show exercises from that group
      const exercises = selectedMuscleGroup.exercises.filter(exercise =>
        exercise.title.toLowerCase().includes(query)
      );

      return {
        muscleGroups: [],
        exercises
      };
    }
  }, [searchQuery, selectedMuscleGroup, allExercises]);

  const handleExerciseClick = (exercise: any) => {
    setSelectedExercise(exercise);
  };

  const handleMuscleGroupClick = (group: any) => {
    setSelectedMuscleGroup(group);
    setSearchQuery(''); // Clear search when entering a muscle group
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="mb-6">
        {selectedMuscleGroup && (
          <button
            onClick={() => {
              setSelectedMuscleGroup(null);
              setSearchQuery('');
            }}
            className="flex items-center text-[--primary] hover:underline mb-4"
          >
            <ChevronLeft size={20} className="mr-2" />
            Back to Muscle Groups
          </button>
        )}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={selectedMuscleGroup ? 
              `Search ${selectedMuscleGroup.name} exercises...` : 
              "Search muscle groups or exercises..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setSelectedExercise(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4">{selectedExercise.title}</h2>
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4">
              <iframe
                src={selectedExercise.videoUrl}
                title={selectedExercise.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <p className="text-gray-600">{selectedExercise.description}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {!selectedMuscleGroup ? (
          // Main page view
          <>
            {/* Show matching exercises from search if any */}
            {searchQuery && filteredResults.exercises.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Matching Exercises</h2>
                {filteredResults.exercises.map(exercise => (
                  <button
                    key={exercise.id}
                    onClick={() => {
                      const group = muscleGroups.find(g => g.id === exercise.muscleGroupId);
                      setSelectedMuscleGroup(group);
                      handleExerciseClick(exercise);
                    }}
                    className="w-full card hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{exercise.title}</h3>
                        <p className="text-sm text-gray-600">{exercise.muscleGroupName}</p>
                      </div>
                      <ChevronRight size={20} className="text-[--primary]" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Show muscle groups */}
            <div>
              <h2 className="text-xl font-bold mb-4">Muscle Groups</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResults.muscleGroups.map(group => (
                  <button
                    key={group.id}
                    onClick={() => handleMuscleGroupClick(group)}
                    className="card hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={group.image}
                        alt={group.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{group.name}</h3>
                      <ChevronRight size={20} className="text-[--primary]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          // Muscle group exercises view
          <div>
            <h2 className="text-2xl font-bold mb-6">{selectedMuscleGroup.name} Exercises</h2>
            <div className="grid gap-6">
              {filteredResults.exercises.map(exercise => (
                <button
                  key={exercise.id}
                  onClick={() => handleExerciseClick(exercise)}
                  className="card hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2">{exercise.title}</h3>
                  <p className="text-gray-600">{exercise.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;