# Elevate Fitness

Build a Fully Functional Android Fitness App

You are an expert Android app developer, UI/UX designer, fitness app architect, and database engineer.

Build a production-ready Android fitness application from scratch. The app must be fully functional, not a prototype or static UI.

APP NAME

FitLife

PLATFORM

- Android only

- Modern Android phones

- Responsive design for different screen sizes

- Support Android 8.0+ where practical

- Use Material 3 design principles

- The application must work offline for core features

MAIN GOAL

Create an easy-to-use fitness application that helps users:

1. Discover workouts

2. Follow workout routines

3. Track completed workouts

4. Track water intake

5. Calculate BMI

6. Track weight

7. Set fitness goals

8. Monitor progress

9. Earn XP and achievements

10. Maintain motivation

11. Learn basic nutrition information

The app should be useful for beginners as well as intermediate users.

---

DESIGN

Use a modern, clean and professional fitness-app design.

Color scheme

Primary color:

- Green

Use:

- White/light backgrounds

- Green primary actions

- Dark text

- Soft gray secondary backgrounds

- Green progress indicators

The interface should feel:

- Modern

- Friendly

- Motivating

- Professional

- Simple

- Easy to navigate

Avoid overly complicated screens.

Use rounded cards, subtle shadows, clear typography and appropriate spacing.

---

BOTTOM NAVIGATION

Create 5 main tabs:

1. Home

2. Workouts

3. Progress

4. Nutrition

5. Profile

The selected tab should clearly indicate the current section.

---

1. HOME SCREEN

Create a personalized dashboard.

Display:

Greeting

Example:

"Good morning, Alex 👋"

The user's name must come from their profile.

Daily motivation

Display a motivational fitness quote.

Rotate between multiple quotes.

Today's Progress

Show:

- Workout progress

- Water intake

- Calories burned

- Daily goal completion

Example:

Workout

"1 / 3"

Water

"5 / 8 glasses"

Calories

"320 kcal"

Quick Actions

Create buttons/cards for:

- Start Workout

- Log Water

- Calculate BMI

- Log Weight

Today's Recommended Workout

Display one recommended workout based on the user's selected fitness level.

Weekly Activity

Show a simple chart representing workouts completed during the last 7 days.

---

2. WORKOUTS

Create a complete workout library.

Workout categories:

- Beginner

- Full Body

- Upper Body

- Lower Body

- Chest

- Back

- Arms

- Legs

- Abs/Core

- Cardio

- Stretching

- Home Workout

- No Equipment

Each workout should contain:

- Workout name

- Difficulty

- Duration

- Estimated calories

- Exercise count

- Description

- Exercise list

Example:

Beginner Full Body

Duration:

20 minutes

Exercises:

1. Jumping Jacks

2. Bodyweight Squats

3. Push Ups

4. Lunges

5. Plank

---

WORKOUT DETAIL

When the user selects a workout, show:

- Workout image/illustration

- Workout description

- Duration

- Difficulty

- Exercise list

- Start Workout button

---

WORKOUT SESSION

Create a functional workout timer.

During a workout display:

- Current exercise

- Exercise number

- Total exercises

- Countdown timer

- Progress bar

- Pause button

- Skip button

- Previous button

- Next button

Example:

"Exercise 3 / 8"

"Squats"

"00:32"

When an exercise finishes, automatically move to the next exercise.

At the end show a completion screen.

Display:

🎉 Workout Complete!

- Duration

- Exercises completed

- Estimated calories

- XP earned

Add the workout to the user's history.

---

REST TIMER

Between exercises, optionally show a rest timer.

Default:

"30 seconds"

Allow the user to skip rest.

---

WORKOUT HISTORY

Store completed workouts locally.

Show:

- Date

- Workout name

- Duration

- Calories

- XP earned

Allow users to view previous workouts.

---

3. PROGRESS

Create a complete fitness progress dashboard.

Show:

Weight

Current weight

Previous weight

Weight change

Allow users to log weight.

BMI

Create a BMI calculator.

Inputs:

- Height

- Weight

Calculate:

BMI = weight / height²

Display category:

- Underweight

- Normal

- Overweight

- Obese

Also display an appropriate explanation.

Activity

Show:

- Total workouts

- Total workout time

- Calories burned

- Current streak

- Longest streak

Weekly chart

Display workout activity for:

Monday

Tuesday

Wednesday

Thursday

Friday

Saturday

Sunday

Monthly statistics

Show:

- Workouts this month

- Calories burned

- Total exercise time

---

4. WATER TRACKER

Create a functional water tracker.

Default daily target:

"8 glasses"

Allow users to:

- Add water

- Remove water

- Set daily target

Example:

💧

"5 / 8 glasses"

Progress:

"62%"

Save the water intake locally.

Reset daily automatically.

---

5. NUTRITION

Create a nutrition education section.

Categories:

- Protein

- Carbohydrates

- Healthy Fats

- Fruits

- Vegetables

- Hydration

- Pre-workout

- Post-workout

- Healthy Snacks

Each article should contain:

- Title

- Description

- Benefits

- Examples

- Practical tips

Do not present medical claims as guaranteed results.

Include a disclaimer that the nutrition information is general educational information and not medical advice.

---

6. FITNESS GOALS

Allow users to select a goal:

- Lose Weight

- Build Muscle

- Improve Fitness

- Increase Strength

- Improve Endurance

- Stay Active

Allow the user to set:

- Target weight

- Weekly workout target

- Daily water target

Show progress toward their goals.

---

7. PROFILE

Create a user profile screen.

Display:

- Profile avatar

- Name

- Fitness goal

- Current level

- XP

- Total workouts

- Total calories burned

- Achievements

Allow editing:

- Name

- Age

- Gender

- Height

- Weight

- Fitness level

- Fitness goal

Store profile information locally.

---

8. XP SYSTEM

Create a gamification system.

Users earn XP for activities.

Example:

Complete workout:

"+50 XP"

Complete daily goal:

"+20 XP"

Drink daily water target:

"+10 XP"

Maintain workout streak:

"+25 XP"

Create levels.

Example:

Level 1:

0 XP

Level 2:

100 XP

Level 3:

250 XP

Level 4:

500 XP

Level 5:

800 XP

Level 6:

1200 XP

Level 7:

1800 XP

Level 8:

2500 XP

Level 9:

3500 XP

Level 10:

5000 XP

Display a progress bar toward the next level.

---

9. ACHIEVEMENTS

Create an achievement/badge system.

Examples:

🏆 First Workout

Complete your first workout.

🔥 3 Day Streak

Exercise for 3 consecutive days.

🔥 7 Day Streak

Exercise for 7 consecutive days.

💪 10 Workouts

Complete 10 workouts.

💪 50 Workouts

Complete 50 workouts.

💧 Hydration Hero

Reach your water goal 7 times.

⭐ 100 XP

Earn 100 XP.

🏆 Level 10

Reach Level 10.

Locked achievements should appear visually different from unlocked achievements.

When an achievement is unlocked, show an animated popup.

---

10. STREAK SYSTEM

Track consecutive workout days.

Example:

Current streak:

"🔥 5 days"

If the user completes a workout today, increase the streak.

If they miss a day, reset the streak appropriately.

Store the required dates locally.

---

11. NOTIFICATIONS

Implement local notifications where supported.

Examples:

Morning:

"Good morning! Ready for today's workout? 💪"

Water reminder:

"Don't forget to drink some water 💧"

Workout reminder:

"Your workout is waiting for you!"

Allow the user to enable/disable reminders in Settings.

Do not spam notifications.

---

12. SETTINGS

Create a Settings screen.

Options:

- Notifications ON/OFF

- Water reminders ON/OFF

- Workout reminders ON/OFF

- Dark mode

- Sound ON/OFF

- Reset progress

- Reset water data

- About

- Privacy

- Terms

For destructive actions, show a confirmation dialog.

---

13. DARK MODE

Support:

- Light mode

- Dark mode

- System default

The UI must remain readable in dark mode.

---

14. OFFLINE STORAGE

Core functionality must work without internet.

Store locally:

- User profile

- Workout history

- Water intake

- Weight history

- XP

- Achievements

- Streaks

- Goals

- Settings

Use a reliable local database/storage solution appropriate for Android.

Do not require a server for basic functionality.

---

15. DATA MODEL

Create proper models/entities for:

UserProfile

Workout

Exercise

WorkoutSession

WorkoutHistory

WaterIntake

WeightEntry

FitnessGoal

Achievement

UserAchievement

UserProgress

AppSettings

Use clean architecture and separate UI, business logic and data layers.

---

16. ERROR HANDLING

The application must gracefully handle:

- Empty data

- Invalid input

- Missing profile information

- Invalid BMI input

- Storage errors

- Notification permission denial

Never allow the app to crash because of normal user input.

---

17. ONBOARDING

Create a first-launch onboarding flow.

Screens:

Welcome

"Welcome to FitLife"

About You

Ask:

- Name

- Age

- Gender

- Height

- Weight

Fitness Level

- Beginner

- Intermediate

- Advanced

Goal

- Lose Weight

- Build Muscle

- Improve Fitness

- Increase Strength

- Improve Endurance

- Stay Active

Daily Target

Allow the user to select their preferred workout target.

Finish with:

"Let's Get Started 💪"

After onboarding, go to Home.

Allow users to skip optional information.

---

18. SEARCH

Add workout search.

Users can search workouts by:

- Name

- Muscle group

- Difficulty

- Duration

- Equipment

Include filters.

---

19. FAVORITES

Allow users to favorite workouts.

Create a Favorites section.

Store favorites locally.

---

20. WORKOUT EQUIPMENT

Each exercise should indicate equipment requirements:

- No Equipment

- Dumbbells

- Resistance Band

- Mat

- Bench

Allow filtering by equipment.

---

21. ACCESSIBILITY

Follow Android accessibility best practices.

Include:

- Adequate contrast

- Large touch targets

- Semantic labels

- Readable fonts

- Accessible buttons

- Screen reader-friendly controls

---

22. PERFORMANCE

The application should:

- Start quickly

- Avoid unnecessary rebuilds

- Avoid memory leaks

- Handle long workout histories efficiently

- Work smoothly on budget Android phones

---

23. SECURITY & PRIVACY

Do not collect unnecessary personal information.

Keep locally stored data private.

Do not expose sensitive data in logs.

If analytics are added, make them optional and privacy-conscious.

---

24. ADS

Prepare the application for Google AdMob.

Use non-intrusive advertising.

Recommended placements:

- Banner advertisement on selected content screens

- Optional interstitial advertisement after appropriate natural breaks

Do NOT show advertisements:

- During active workouts

- During countdown timers

- Immediately after every button click

- In a way that interferes with navigation

Structure the code so AdMob can easily be configured later.

Use test ad IDs during development.

---

25. PREMIUM-READY ARCHITECTURE

Structure the application so premium functionality can be added later.

Potential future features:

- Advanced workout plans

- Detailed analytics

- Custom workout builder

- AI workout recommendations

- Cloud backup

- Wearable integration

Do not implement paid functionality yet.

---

26. APP ARCHITECTURE

Use a professional maintainable architecture.

Separate:

- UI

- Models

- Services

- Repositories

- Database/storage

- Business logic

- Navigation

- Theme

- Constants

Avoid putting the entire application into one file.

Use reusable components.

---

27. SAMPLE WORKOUT DATA

Include enough built-in workout data for the application to be useful immediately after installation.

At minimum create:

Beginner

10 workouts

Full Body

10 workouts

Cardio

10 workouts

Upper Body

10 workouts

Lower Body

10 workouts

Abs/Core

10 workouts

Stretching

10 workouts

Total:

70+ workouts

Each workout should contain multiple exercises.

Create at least 50 unique exercises.

---

28. FIRST LAUNCH EXPERIENCE

The complete flow should be:

Install app

↓

Splash screen

↓

Onboarding

↓

Home dashboard

↓

Select workout

↓

Workout details

↓

Start workout

↓

Exercise timer

↓

Rest timer

↓

Workout complete

↓

XP awarded

↓

Achievement check

↓

Progress updated

↓

Return to Home

Everything must work without placeholder buttons.

---

29. IMPORTANT DEVELOPMENT REQUIREMENTS

DO NOT create a fake prototype.

DO NOT create buttons that do nothing.

DO NOT use placeholder navigation.

DO NOT create screens that only look functional.

Every major button must perform its intended action.

All calculations must actually work.

All user data must persist after closing and reopening the application.

All progress must update automatically when the user completes activities.

---

30. TESTING

Before considering the project complete, test:

- App launch

- Onboarding

- Navigation

- Profile editing

- BMI calculation

- Weight tracking

- Water tracking

- Workout search

- Workout filtering

- Favorite workouts

- Workout timer

- Pause/resume

- Skip exercise

- Rest timer

- Workout completion

- XP calculation

- Level calculation

- Achievement unlocking

- Streak calculation

- Progress statistics

- Settings

- Dark mode

- Data persistence

- App restart

- Invalid input

- Empty states

Fix all build errors and runtime errors.

---

31. FINAL REQUIREMENT

Build the application completely.

Do not stop after creating the UI.

Implement the complete functionality, data storage, navigation, calculations, state management, workout engine, progress system, achievements, water tracker, profile, settings and onboarding.

When finished, provide:

1. Complete source code

2. Project structure

3. Setup instructions

4. Build instructions

5. Android APK build instructions

6. Release/AAB build instructions

7. List of dependencies

8. Explanation of where to configure AdMob

9. Explanation of where to change the app name

10. Explanation of where to change the app icon

11. Explanation of where to change the theme colors

The final result must be a real, fully functional Android fitness application ready for testing and further development, not merely a visual prototype.

Start by creating the project architecture and core models, then implement the features systematically and test each feature before moving to the next.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://healthy-stride-pro.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/09b309de-25ad-4658-b905-41d768230606).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
