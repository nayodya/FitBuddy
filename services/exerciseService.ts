import { Exercise } from '../types';

// API Ninjas base URL
const API_NINJAS_BASE_URL = 'https://api.api-ninjas.com/v1/exercises';
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with actual API key from API Ninjas

// Fallback mock data for exercises
const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    type: 'calisthenics',
    muscle: 'chest',
    equipment: 'body weight',
    difficulty: 'beginner',
    instructions: 'Start in a plank position. Lower your body until your chest touches the floor. Push back up to the starting position.',
  },
  {
    id: '2',
    name: 'Squats',
    type: 'strength',
    muscle: 'quadriceps',
    equipment: 'body weight',
    difficulty: 'beginner',
    instructions: 'Stand with feet shoulder-width apart. Lower your body by bending knees and hips. Return to starting position.',
  },
  {
    id: '3',
    name: 'Deadlifts',
    type: 'strength',
    muscle: 'back',
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: 'Stand with feet hip-width apart. Bend at hips and knees. Grip the bar and lift with your legs.',
  },
  {
    id: '4',
    name: 'Planks',
    type: 'calisthenics',
    muscle: 'abs',
    equipment: 'body weight',
    difficulty: 'beginner',
    instructions: 'Hold a forearm plank position. Keep your body in a straight line from head to heels. Hold for 30-60 seconds.',
  },
  {
    id: '5',
    name: 'Burpees',
    type: 'cardio',
    muscle: 'full body',
    equipment: 'body weight',
    difficulty: 'intermediate',
    instructions: 'Start standing. Drop to plank, do a push-up, jump feet to hands, jump up with arms overhead.',
  },
  {
    id: '6',
    name: 'Mountain Climbers',
    type: 'cardio',
    muscle: 'core',
    equipment: 'body weight',
    difficulty: 'beginner',
    instructions: 'Start in plank position. Alternately drive your knees toward your chest in a running motion.',
  },
  {
    id: '7',
    name: 'Lunges',
    type: 'strength',
    muscle: 'legs',
    equipment: 'body weight',
    difficulty: 'beginner',
    instructions: 'Step forward and lower your hips until both knees are bent at 90 degrees. Return and repeat with other leg.',
  },
  {
    id: '8',
    name: 'Pull-ups',
    type: 'strength',
    muscle: 'back',
    equipment: 'pull-up bar',
    difficulty: 'advanced',
    instructions: 'Grip the bar with hands shoulder-width apart. Pull your body up until chin clears the bar. Lower back down.',
  },
];

export const exerciseService = {
  // Fetch exercises from API with fallback to mock data
  fetchExercises: async (muscle?: string): Promise<Exercise[]> => {
    try {
      // Note: API Ninjas requires authentication. Using mock data for demo
      // In production, you would need a valid API key
      // const url = muscle 
      //   ? `${API_NINJAS_BASE_URL}?muscle=${muscle}`
      //   : API_NINJAS_BASE_URL;
      
      // const response = await fetch(url, {
      //   headers: {
      //     'X-Api-Key': API_KEY
      //   }
      // });

      // For now, return mock data with optional filtering
      let exercises = [...mockExercises];
      
      if (muscle) {
        exercises = exercises.filter(ex => 
          ex.muscle.toLowerCase().includes(muscle.toLowerCase())
        );
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return exercises.map(ex => ({
        ...ex,
        isFavorite: false,
      }));
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw new Error('Failed to fetch exercises');
    }
  },

  // Get exercise by ID
  getExerciseById: async (id: string): Promise<Exercise | null> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockExercises.find(ex => ex.id === id) || null;
    } catch (error) {
      console.error('Error fetching exercise:', error);
      return null;
    }
  },

  // Get exercises by muscle group
  getExercisesByMuscle: async (muscle: string): Promise<Exercise[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockExercises
        .filter(ex => ex.muscle.toLowerCase() === muscle.toLowerCase())
        .map(ex => ({
          ...ex,
          isFavorite: false,
        }));
    } catch (error) {
      console.error('Error fetching exercises by muscle:', error);
      throw new Error('Failed to fetch exercises');
    }
  },

  // Get unique muscle groups
  getMuscleGroups: async (): Promise<string[]> => {
    const muscles = Array.from(new Set(mockExercises.map(ex => ex.muscle)));
    return muscles.sort();
  },

  // Search exercises by name or type
  searchExercises: async (query: string): Promise<Exercise[]> => {
    try {
      const lowerQuery = query.toLowerCase();
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return mockExercises
        .filter(ex =>
          ex.name.toLowerCase().includes(lowerQuery) ||
          ex.type.toLowerCase().includes(lowerQuery) ||
          ex.muscle.toLowerCase().includes(lowerQuery)
        )
        .map(ex => ({
          ...ex,
          isFavorite: false,
        }));
    } catch (error) {
      console.error('Error searching exercises:', error);
      throw new Error('Failed to search exercises');
    }
  },
};
