export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
}

export interface Exercise {
  id: string;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions?: string;
  description?: string;
  isFavorite?: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface ExerciseState {
  items: Exercise[];
  isLoading: boolean;
  error: string | null;
  selectedExercise: Exercise | null;
}

export interface FavoritesState {
  items: Exercise[];
  isLoading: boolean;
  error: string | null;
}

export interface UserStats {
  waterIntake: number;
  caloriesBurned: number;
  totalWorkoutTime: number;
}
