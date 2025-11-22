# FitBuddy - Health & Wellness Mobile App 🏋️

A comprehensive React Native mobile application for tracking exercises, water intake, and wellness tips. Built with Expo, Redux Toolkit, and TypeScript.

## ✨ Features

### ✅ Implemented Features
- **User Authentication** - Secure login/registration with Yup validation
- **Exercise Library** - Browse 8+ exercises with detailed information
- **Favorites System** - Save and manage favorite exercises
- **Search Functionality** - Real-time search across exercises
- **User Profile** - Track personal information and stats
- **Water Intake Tracking** - Daily hydration monitoring
- **Dark Mode** - Toggle between light and dark themes
- **Persistent Storage** - All data saved locally with AsyncStorage
- **Responsive Design** - Works on phones, tablets, and web
- **Feather Icons** - Beautiful and consistent iconography

## 📋 Tech Stack

- **Frontend**: React Native / Expo
- **Navigation**: Expo Router + React Navigation
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form + Yup
- **Styling**: React Native StyleSheet
- **Database**: AsyncStorage (Local)
- **Icons**: Feather Icons / @expo/vector-icons
- **TypeScript**: Full type safety

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI

### Installation

```bash
# Navigate to project
cd Health_App

# Install dependencies
npm install

# Start development server
npm start

# Run on platform of choice
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

📖 **See `QUICK_START.md` for detailed quick start guide**

## 🔐 Test Credentials

```
Email: john@example.com
Password: password123
```

Or register a new account directly in the app.

## 📁 Project Structure

```
Health_App/
├── app/                      # App entry point & routing
│   ├── (auth)/              # Auth screens
│   ├── (app)/               # Main app screens
│   └── RootNavigator.tsx    # Navigation logic
├── screens/                 # Screen components
├── components/              # Reusable UI components
├── store/                   # Redux store & slices
├── services/                # API services
├── constants/               # App constants & themes
├── context/                 # React Context (Theme)
├── utils/                   # Helper functions
├── types/                   # TypeScript definitions
└── hooks/                   # Custom hooks
```

## 📱 Screen Overview

| Screen | Purpose | Features |
|--------|---------|----------|
| **Login** | User authentication | Email/password login, validation |
| **Register** | Create new account | Username, email, password |
| **Home** | Exercise library | Search, filter, view list |
| **Details** | Exercise info | Instructions, tips, difficulty |
| **Favorites** | Saved exercises | Quick access to favorites |
| **Profile** | User settings | Stats, water tracking, dark mode |

## 🎨 Design System

### Colors
- **Primary**: #6366F1 (Indigo)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Error**: #EF4444 (Red)

### Spacing
- **XS**: 4px | **SM**: 8px | **MD**: 12px | **LG**: 16px | **XL**: 20px | **XXL**: 24px

### Typography
- **Font Sizes**: XS(12) → SM(14) → MD(16) → LG(18) → XL(20) → XXL(24)
- **Font Weights**: Regular(400) → Medium(500) → Semibold(600) → Bold(700)

## 🔄 State Management

### Redux Store Structure
```
auth/           → User authentication state
exercises/      → Exercise data & details
favorites/      → Favorite exercises list
userStats/      → Health statistics
```

## 💾 Local Storage

Uses AsyncStorage to persist:
- Authentication tokens
- User profile data
- Favorite exercises
- Theme preference
- User statistics

## 🎯 API Integration

Currently uses mock data for development. Ready to integrate with:
- **API Ninjas Fitness API**
- **DummyJSON API**
- **Custom backend**

See `API_INTEGRATION_GUIDE.md` for integration instructions.

## ✅ Validation

### Form Validation
- **Email**: Valid email format required
- **Username**: Minimum 3 characters
- **Password**: Minimum 6 characters
- **Confirm Password**: Must match password

All validation uses Yup schemas for consistency and reusability.

## 🌙 Dark Mode

- Toggle in Profile screen
- Persisted to AsyncStorage
- All components support both themes
- Smooth transitions between modes

## 📝 File Examples

### Redux Slice
```typescript
// store/slices/authSlice.ts
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});
```

### Component with Theme
```typescript
// components/Button.tsx
const { isDark } = useTheme();
const colors = isDark ? Colors.dark : Colors.light;

return <TouchableOpacity style={{ backgroundColor: colors.primary }} />;
```

## 🧪 Best Practices

1. ✅ Type-safe with TypeScript
2. ✅ Centralized state management
3. ✅ Reusable components
4. ✅ Proper error handling
5. ✅ Input validation
6. ✅ Responsive design
7. ✅ Performance optimized
8. ✅ Clean code structure

## 🚀 Available Scripts

```bash
npm start           # Start Expo server
npm run android     # Build for Android
npm run ios         # Build for iOS
npm run web         # Build for Web
npm run lint        # Run ESLint
```

## 📚 Documentation

- `QUICK_START.md` - Quick start guide with demo login
- `SETUP_GUIDE.md` - Comprehensive setup and architecture guide
- `API_INTEGRATION_GUIDE.md` - How to integrate real APIs

## 🐛 Troubleshooting

### App Won't Start
```bash
rm -rf node_modules
npm install
npm start
```

### Icons Not Showing
- Reload app: Press `R` in terminal
- Clear cache: `expo prebuild --clean`

### Login Issues
- Use demo credentials: john@example.com / password123
- Or register a new account

## 📦 Dependencies

Key packages:
- `@reduxjs/toolkit` - State management
- `@react-navigation/native` - Navigation
- `expo-router` - File-based routing
- `react-hook-form` - Form management
- `yup` - Schema validation
- `@react-native-async-storage/async-storage` - Local storage

See `package.json` for full dependency list.

## 🎓 Learning Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Guide](https://reactnative.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [React Navigation](https://reactnavigation.org)
- [Feather Icons](https://feathericons.com)

## 📝 Project Features Checklist

- ✅ User authentication & validation
- ✅ Navigation (Stack + Tab)
- ✅ API integration (mock ready)
- ✅ State management (Redux)
- ✅ Favorites system
- ✅ UI/UX design
- ✅ Dark mode
- ✅ Form validation
- ✅ Local persistence
- ✅ Error handling
- ✅ Loading states
- ✅ Search functionality

## 👨‍💻 Development Tips

1. **Hot Reload**: Changes auto-reload (press `R` in terminal)
2. **Debug Menu**: Shake device or `Ctrl+M` (Android), `Cmd+D` (iOS)
3. **Redux DevTools**: Install extension for time-travel debugging
4. **Network DevTools**: Use React Native Debugger

## 📄 License

Created for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**Status**: ✅ Complete & Ready for Use

**Start building with FitBuddy! 🚀**
