# REPLOOT— Mobile Application

> **TRAIN SMARTER WITH AI**  
> Premium AI-powered personal fitness, workout pose tracking, real-time coaching, and precision nutrition application built with React Native and Expo.

---

## 1. Project Overview

REPLOOTis a cross-platform mobile application designed for iOS and Android, offering:

- **AI Personal Trainer & Real-time Pose Tracking**: Skeletal landmark detection, rep counting, and form accuracy scoring.
- **Gym & Home Workouts**: Unified exercise library, tailored training paths, and routine generators.
- **Precision Nutrition & AI Food Scanner**: Camera-based meal recognition, automatic macronutrient breakdown, and hydration tracking.
- **Gamification & Analytics**: Dynamic XP leveling, weekly streak tracking, leaderboards, and personal records.
- **AI Coach**: Context-aware conversational fitness and nutrition companion.

---

## 2. Technology Stack

| Layer                  | Technology                                                           | Role                                                              |
| ---------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Runtime & Platform** | [Expo SDK 57](https://docs.expo.dev/) + React Native 0.86            | Cross-platform native mobile foundation (iOS & Android)           |
| **Routing**            | [Expo Router v4](https://docs.expo.dev/router/introduction/)         | File-based typed route-group navigation                           |
| **Language**           | TypeScript 6 (Strict Mode)                                           | Type safety, domain modeling, and strict contracts                |
| **Styling & Theme**    | NativeWind v4 + TailwindCSS                                          | Utility-first React Native styling with cyber-fitness tokens      |
| **Client State**       | [Zustand v5](https://github.com/pmndrs/zustand)                      | Light, reactive client/UI domain stores                           |
| **Server State**       | [TanStack React Query v5](https://tanstack.com/query)                | Caching, deduplication, background sync, and retry policies       |
| **Forms & Validation** | React Hook Form + Zod                                                | Schema-validated high-performance mobile forms                    |
| **Animations**         | React Native Reanimated v4 + Worklets                                | 60/120 FPS native thread animations and gestures                  |
| **Gestures**           | React Native Gesture Handler                                         | Multi-touch, swipe, and modal gesture coordination                |
| **Hardware & Native**  | Expo Camera, SecureStore, ImagePicker, LinearGradient, Blur, Haptics | Hardware permissions, Keychain/Keystore security, and luminous UI |
| **Icons**              | Lucide React Native                                                  | Minimal, consistent geometric icons                               |

---

## 3. Directory Architecture

```
kinetqx-app/
├── app/                               # EXPO ROUTER ROUTES ONLY (Thin delegates)
│   ├── _layout.tsx                    # Root layout with AppProviders & dark theme Stack
│   ├── index.tsx                      # Minimal REPLOOTDevelopment Verification Screen
│   ├── (onboarding)/                  # Splash & Onboarding Tutorial route group
│   ├── (auth)/                        # Authentication route group (sign-in, sign-up, reset)
│   ├── (profile-setup)/               # 5-Step Kinetic Profile onboarding flow
│   ├── (tabs)/                        # Primary bottom tab navigation (Home, Nutrition, Action, Progress, Profile)
│   ├── coach/                         # AI Coach chat interface
│   ├── workouts/                      # Workout hub & real-time camera tracking
│   └── modals/                        # Shared modal presentation container
│
├── src/                               # APPLICATION SOURCE CODE
│   ├── app/
│   │   ├── config/env.ts              # Typed environment variable access
│   │   ├── lifecycle/AppLifecycle.ts  # Background/foreground transition manager
│   │   └── providers/AppProviders.tsx # Composed SafeArea, QueryClient, GestureHandler roots
│   │
│   ├── features/                      # FEATURE-FIRST DOMAIN MODULES
│   │   ├── onboarding/                # Slides, carousel store
│   │   ├── auth/                      # Schemas, login/signup API, auth session store
│   │   ├── profile-onboarding/        # 5-step draft state, validation schemas
│   │   ├── home/                      # Dashboard widgets, streak & XP cards
│   │   ├── workouts/                  # Gym & Home shared models, workout tracking
│   │   ├── nutrition/                 # Macros, daily budgets, food scanner contracts
│   │   ├── progress/                  # Reports, weight tracking, achievements
│   │   ├── profile/                   # User profile, fitness profile, subscription
│   │   ├── ai-coach/                  # Chat streaming interfaces & suggestion prompts
│   │   ├── camera/                    # Centralized camera permission & hardware state
│   │   └── notifications/             # Notification permissions & scheduled reminders
│   │
│   ├── shared/
│   │   ├── components/ui/             # Reusable UI Primitives (Screen, AppText, Button, Card, GlassCard, GlowCard, etc.)
│   │   ├── types/                     # Domain models (User, Workout, Nutrition, Progress)
│   │   └── utils/                     # Utility helpers (cn, errors, formatters)
│   │
│   ├── services/
│   │   ├── api/                       # Typed HTTP client, QueryClient, centralized QueryKeys
│   │   ├── storage/                   # SecureStore (tokens) & AppStorage (preferences)
│   │   ├── camera/                    # Hardware camera permission & device state
│   │   ├── ai/                        # Pose tracking, food recognition, and coach boundaries
│   │   └── notifications/             # Push notification service
│   │
│   ├── stores/                        # Global client domain Zustand stores (appStore, authStore)
│   ├── theme/                         # Centralized design tokens (colors, gradients, typography, shadows, motion)
│   └── mocks/                         # Typed development mock data
│
├── assets/                            # Application icons, splash graphics
├── app.json                           # Expo application configuration & plugins
├── babel.config.js                    # Babel with NativeWind and Reanimated plugins
├── metro.config.js                    # Metro configuration with NativeWind wrapper
├── tailwind.config.js                 # Cyber-fitness dark theme tokens
├── tsconfig.json                      # Strict TypeScript with @/* path alias
├── package.json                       # Scripts and dependencies
└── README.md                          # Documentation
```

---

## 4. Design System & Visual Guidelines

The design language follows the provided REPLOOTFigma cyber-fitness specification:

- **Backgrounds**: Deepest obsidian black (`#070A11`), dark navy canvas (`#0D111D`), elevated glass surfaces (`#131826`).
- **Luminous CTAs**: Signature electric blue-to-cyan gradient (`linear-gradient(135deg, #0284C7, #0EA5E9, #22D3EE)`).
- **Glow Accents**: Cyber cyan (`#22D3EE`), kinetic mint (`#10B981`), neural AI purple (`#8B5CF6`).
- **Borders**: Subdued glass outlines (`rgba(255, 255, 255, 0.08)`) and luminous neon borders (`GlowCard`).
- **Typography**: Heavy, tracked uppercase display headers (`displayXL`, `displayLG`) paired with legible, proportional body fonts and high-impact metric scales (`metricXL`).

All tokens are accessible via:

```typescript
import {
  colors,
  gradients,
  typography,
  shadows,
  spacing,
  radius,
} from "@/theme";
```

Or via NativeWind classes:

```tsx
<View className="bg-background-card border border-border-subtle rounded-2xl p-4">
  <Text className="text-kinetic-primary font-bold text-lg">BENCH PRESS</Text>
</View>
```

---

## 5. Architectural Principles

### State Separation

1. **Client / UI State (`Zustand`)**:
   - Manages ephemeral interaction state, active tab, onboarding carousel index, and active workout timers.
   - Example: `useAppStore`, `useAuthStore`, `useProfileSetupStore`.
2. **Server State (`TanStack React Query`)**:
   - Manages all backend queries, mutations, caching, deduplication, and invalidation.
   - Centralized query keys defined in `src/services/api/queryKeys.ts`.
   - **Do NOT duplicate server data inside Zustand stores.**

### Hardware & Security

- **Sensitive Auth Tokens**: Stored exclusively via `secureStorage` (`expo-secure-store` backed by iOS Keychain & Android Keystore). Never in plaintext storage.
- **Hardware Camera**: Coordinated through `CameraPermissionService` and `appLifecycle` to guarantee streams never leak when screens unmount or when the application moves to the background.
- **AI Boundaries**: Decoupled from specific ML engines (MediaPipe, TensorFlow, ONNX, cloud) via TypeScript contracts in `src/services/ai/`.

---

## 6. Getting Started & Development Commands

### Prerequisites

- Node.js `v20+` or `v22+`
- npm `10+`
- iOS Simulator (macOS / Xcode) or Android Emulator / Physical Device with Expo Go / Dev Client

### Installation

```bash
cd kinetqx/kinetqx-app
npm install
```

### Development Scripts

```bash
# Start Expo development server
npm start

# Run on Android emulator / connected device
npm run android

# Run on iOS simulator (macOS required)
npm run ios

# Run in web browser (verification & responsive testing)
npm run web

# TypeScript validation (strict zero-error check)
npm run typecheck
```

---

## 7. Next Implementation Phase

The foundation is fully initialized and verified. The next development phase is:

- **Phase 1**: REPLOOTSplash & Onboarding Screens (4 tutorial slides with fitness backgrounds, HUD indicators, and animated CTAs matching the Figma specifications).
