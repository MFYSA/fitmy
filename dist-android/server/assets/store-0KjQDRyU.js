import * as React from "react";
import { jsx } from "react/jsx-runtime";
//#region src/lib/fitlife/constants.ts
var STORAGE_KEY = "fitlife.state.v1";
var MOTIVATION_QUOTES = [
	"The only bad workout is the one that didn't happen.",
	"Small steps every day beat big steps once in a while.",
	"You don't have to be extreme, just consistent.",
	"Your body can do it. It's your mind you need to convince.",
	"Progress, not perfection.",
	"Sweat now, shine later.",
	"Discipline is choosing what you want most over what you want now.",
	"One workout at a time. One day at a time.",
	"Strong is not a look, it's a feeling.",
	"Show up for yourself today.",
	"The hardest part is putting on your shoes.",
	"Rest is part of training, not a reward for it."
];
var FITNESS_GOALS = [
	"Lose Weight",
	"Build Muscle",
	"Improve Fitness",
	"Increase Strength",
	"Improve Endurance",
	"Stay Active"
];
var GENDERS = [
	"Male",
	"Female",
	"Other",
	"Prefer not to say"
];
var FITNESS_LEVELS = [
	"Beginner",
	"Intermediate",
	"Advanced"
];
/** Cumulative XP required to reach each level (index 0 = level 1). */
var LEVEL_THRESHOLDS = [
	0,
	100,
	250,
	500,
	800,
	1200,
	1800,
	2500,
	3500,
	5e3
];
var XP_REWARDS = {
	workout: 50,
	dailyGoal: 20,
	waterGoal: 10,
	streak: 25
};
var ACHIEVEMENTS = [
	{
		id: "first-workout",
		icon: "🏆",
		title: "First Workout",
		description: "Complete your first workout."
	},
	{
		id: "streak-3",
		icon: "🔥",
		title: "3 Day Streak",
		description: "Exercise for 3 consecutive days."
	},
	{
		id: "streak-7",
		icon: "🔥",
		title: "7 Day Streak",
		description: "Exercise for 7 consecutive days."
	},
	{
		id: "workouts-10",
		icon: "💪",
		title: "10 Workouts",
		description: "Complete 10 workouts."
	},
	{
		id: "workouts-50",
		icon: "💪",
		title: "50 Workouts",
		description: "Complete 50 workouts."
	},
	{
		id: "hydration-hero",
		icon: "💧",
		title: "Hydration Hero",
		description: "Reach your water goal 7 times."
	},
	{
		id: "xp-100",
		icon: "⭐",
		title: "100 XP",
		description: "Earn 100 XP."
	},
	{
		id: "level-10",
		icon: "🏆",
		title: "Level 10",
		description: "Reach Level 10."
	},
	{
		id: "calories-1000",
		icon: "🔥",
		title: "1000 Calories",
		description: "Burn 1000 calories in total."
	},
	{
		id: "weight-logger",
		icon: "⚖️",
		title: "Weight Watcher",
		description: "Log your weight 5 times."
	},
	{
		id: "favorite-five",
		icon: "❤️",
		title: "Curator",
		description: "Favorite 5 workouts."
	},
	{
		id: "early-bird",
		icon: "🌅",
		title: "Early Bird",
		description: "Finish a workout before 8 AM."
	}
];
function createInitialState() {
	return {
		version: 1,
		onboarded: false,
		profile: {
			name: "",
			age: null,
			gender: null,
			heightCm: null,
			weightKg: null,
			fitnessLevel: "Beginner",
			goal: "Improve Fitness"
		},
		goals: {
			targetWeightKg: null,
			weeklyWorkoutTarget: 4,
			dailyWaterTarget: 8,
			dailyWorkoutTarget: 1
		},
		settings: {
			theme: "dark",
			notifications: true,
			waterReminders: true,
			workoutReminders: true,
			sound: true,
			restBetweenExercises: true,
			defaultRestSeconds: 30,
			adsEnabled: false
		},
		progress: {
			xp: 0,
			currentStreak: 0,
			longestStreak: 0,
			lastWorkoutDay: null,
			waterGoalDaysHit: 0,
			waterRewardedDays: [],
			dailyGoalRewardedDays: []
		},
		history: [],
		weights: [],
		water: {},
		favorites: [],
		achievements: []
	};
}
var EXERCISE_MAP = [
	{
		id: "jumping-jacks",
		name: "Jumping Jacks",
		muscle: "Cardio",
		equipment: "None",
		seconds: 40,
		intensity: 1.2,
		instructions: "Stand tall, jump feet out while raising arms overhead, then return. Keep a steady rhythm."
	},
	{
		id: "high-knees",
		name: "High Knees",
		muscle: "Cardio",
		equipment: "None",
		seconds: 30,
		intensity: 1.3,
		instructions: "Run in place driving each knee to hip height. Stay light on the balls of your feet."
	},
	{
		id: "butt-kicks",
		name: "Butt Kicks",
		muscle: "Cardio",
		equipment: "None",
		seconds: 30,
		intensity: 1.2,
		instructions: "Jog in place kicking your heels toward your glutes. Keep your chest upright."
	},
	{
		id: "burpees",
		name: "Burpees",
		muscle: "Full Body",
		equipment: "None",
		seconds: 30,
		intensity: 1.6,
		instructions: "Squat, place hands down, jump feet back to a plank, return and jump up."
	},
	{
		id: "mountain-climbers",
		name: "Mountain Climbers",
		muscle: "Abs/Core",
		equipment: "None",
		seconds: 35,
		intensity: 1.4,
		instructions: "From a plank, drive knees toward your chest one at a time without lifting your hips."
	},
	{
		id: "skater-jumps",
		name: "Skater Jumps",
		muscle: "Lower Body",
		equipment: "None",
		seconds: 30,
		intensity: 1.3,
		instructions: "Leap side to side landing softly on one leg, swinging the opposite arm across."
	},
	{
		id: "squat-jumps",
		name: "Squat Jumps",
		muscle: "Legs",
		equipment: "None",
		seconds: 30,
		intensity: 1.5,
		instructions: "Squat down, then jump explosively. Land softly with knees tracking over toes."
	},
	{
		id: "shadow-boxing",
		name: "Shadow Boxing",
		muscle: "Cardio",
		equipment: "None",
		seconds: 45,
		intensity: 1.2,
		instructions: "Punch straight ahead alternating hands while staying light on your feet."
	},
	{
		id: "step-touch",
		name: "Step Touch",
		muscle: "Cardio",
		equipment: "None",
		seconds: 40,
		intensity: .9,
		instructions: "Step side to side, tapping your toe and swinging arms. A gentle warm-up pace."
	},
	{
		id: "march-in-place",
		name: "March In Place",
		muscle: "Cardio",
		equipment: "None",
		seconds: 45,
		intensity: .8,
		instructions: "March with tall posture, lifting knees to a comfortable height."
	},
	{
		id: "fast-feet",
		name: "Fast Feet",
		muscle: "Cardio",
		equipment: "None",
		seconds: 25,
		intensity: 1.4,
		instructions: "Small quick steps in an athletic stance, staying on the balls of your feet."
	},
	{
		id: "star-jumps",
		name: "Star Jumps",
		muscle: "Full Body",
		equipment: "None",
		seconds: 25,
		intensity: 1.5,
		instructions: "From a small squat, jump and spread arms and legs into a star, then land softly."
	},
	{
		id: "jump-rope-mime",
		name: "Invisible Jump Rope",
		muscle: "Cardio",
		equipment: "None",
		seconds: 40,
		intensity: 1.2,
		instructions: "Hop with both feet as if skipping, circling your wrists."
	},
	{
		id: "bodyweight-squats",
		name: "Bodyweight Squats",
		muscle: "Legs",
		equipment: "None",
		seconds: 40,
		intensity: 1.1,
		instructions: "Feet shoulder-width, sit hips back and down, keep chest up, then drive through the heels."
	},
	{
		id: "sumo-squats",
		name: "Sumo Squats",
		muscle: "Legs",
		equipment: "None",
		seconds: 40,
		intensity: 1.1,
		instructions: "Wide stance with toes turned out. Lower straight down keeping knees pushed out."
	},
	{
		id: "lunges",
		name: "Lunges",
		muscle: "Legs",
		equipment: "None",
		seconds: 40,
		intensity: 1.2,
		instructions: "Step forward and lower until both knees are near 90°, then push back to standing."
	},
	{
		id: "reverse-lunges",
		name: "Reverse Lunges",
		muscle: "Legs",
		equipment: "None",
		seconds: 40,
		intensity: 1.2,
		instructions: "Step backward into a lunge. Great for knee comfort and balance."
	},
	{
		id: "glute-bridges",
		name: "Glute Bridges",
		muscle: "Lower Body",
		equipment: "Mat",
		seconds: 40,
		intensity: 1,
		instructions: "Lie on your back, feet flat, drive hips up and squeeze your glutes at the top."
	},
	{
		id: "single-leg-bridge",
		name: "Single Leg Bridge",
		muscle: "Lower Body",
		equipment: "Mat",
		seconds: 40,
		intensity: 1.1,
		instructions: "Bridge with one foot planted and the other leg extended. Switch halfway."
	},
	{
		id: "wall-sit",
		name: "Wall Sit",
		muscle: "Legs",
		equipment: "None",
		seconds: 45,
		intensity: 1,
		instructions: "Slide down a wall until thighs are parallel to the floor and hold."
	},
	{
		id: "calf-raises",
		name: "Calf Raises",
		muscle: "Legs",
		equipment: "None",
		seconds: 40,
		intensity: .8,
		instructions: "Rise onto your toes slowly, pause at the top, and lower under control."
	},
	{
		id: "step-ups",
		name: "Step Ups",
		muscle: "Lower Body",
		equipment: "Bench",
		seconds: 40,
		intensity: 1.2,
		instructions: "Step onto a sturdy bench with the whole foot, stand tall, then lower slowly."
	},
	{
		id: "side-lunges",
		name: "Side Lunges",
		muscle: "Legs",
		equipment: "None",
		seconds: 40,
		intensity: 1.1,
		instructions: "Step wide to one side, sit into that hip, keep the other leg straight."
	},
	{
		id: "curtsy-lunges",
		name: "Curtsy Lunges",
		muscle: "Lower Body",
		equipment: "None",
		seconds: 40,
		intensity: 1.1,
		instructions: "Step one leg diagonally behind the other and lower into a lunge."
	},
	{
		id: "goblet-squat",
		name: "Goblet Squat",
		muscle: "Legs",
		equipment: "Dumbbells",
		seconds: 40,
		intensity: 1.3,
		instructions: "Hold one dumbbell at your chest and squat between your knees."
	},
	{
		id: "romanian-deadlift",
		name: "Romanian Deadlift",
		muscle: "Lower Body",
		equipment: "Dumbbells",
		seconds: 40,
		intensity: 1.2,
		instructions: "Hinge at the hips with a flat back, feeling a stretch in the hamstrings."
	},
	{
		id: "band-lateral-walk",
		name: "Band Lateral Walk",
		muscle: "Lower Body",
		equipment: "Resistance Band",
		seconds: 35,
		intensity: 1,
		instructions: "Band above the knees, small athletic stance, step sideways keeping tension."
	},
	{
		id: "donkey-kicks",
		name: "Donkey Kicks",
		muscle: "Lower Body",
		equipment: "Mat",
		seconds: 35,
		intensity: .9,
		instructions: "On all fours, drive one heel toward the ceiling without arching your back."
	},
	{
		id: "fire-hydrants",
		name: "Fire Hydrants",
		muscle: "Lower Body",
		equipment: "Mat",
		seconds: 35,
		intensity: .9,
		instructions: "On all fours, lift one knee out to the side keeping hips square."
	},
	{
		id: "push-ups",
		name: "Push Ups",
		muscle: "Chest",
		equipment: "None",
		seconds: 35,
		intensity: 1.3,
		instructions: "Hands under shoulders, body in one line, lower your chest then press back up."
	},
	{
		id: "knee-push-ups",
		name: "Knee Push Ups",
		muscle: "Chest",
		equipment: "Mat",
		seconds: 35,
		intensity: 1,
		instructions: "Push ups from your knees. Keep hips and shoulders moving together."
	},
	{
		id: "incline-push-ups",
		name: "Incline Push Ups",
		muscle: "Chest",
		equipment: "Bench",
		seconds: 35,
		intensity: 1.1,
		instructions: "Hands on a bench to reduce difficulty while keeping a straight body line."
	},
	{
		id: "wide-push-ups",
		name: "Wide Push Ups",
		muscle: "Chest",
		equipment: "None",
		seconds: 35,
		intensity: 1.3,
		instructions: "Hands slightly wider than shoulders to emphasise the chest."
	},
	{
		id: "diamond-push-ups",
		name: "Diamond Push Ups",
		muscle: "Arms",
		equipment: "None",
		seconds: 30,
		intensity: 1.4,
		instructions: "Hands together forming a diamond. Keep elbows close to your body."
	},
	{
		id: "chest-press",
		name: "Dumbbell Chest Press",
		muscle: "Chest",
		equipment: "Dumbbells",
		seconds: 40,
		intensity: 1.2,
		instructions: "Lying on a bench or floor, press dumbbells up over your chest."
	},
	{
		id: "chest-fly",
		name: "Dumbbell Chest Fly",
		muscle: "Chest",
		equipment: "Dumbbells",
		seconds: 40,
		intensity: 1.1,
		instructions: "Arms slightly bent, open wide then hug them back together over your chest."
	},
	{
		id: "band-chest-press",
		name: "Band Chest Press",
		muscle: "Chest",
		equipment: "Resistance Band",
		seconds: 40,
		intensity: 1.1,
		instructions: "Band behind your back, press both hands forward and squeeze the chest."
	},
	{
		id: "pike-push-ups",
		name: "Pike Push Ups",
		muscle: "Upper Body",
		equipment: "None",
		seconds: 30,
		intensity: 1.4,
		instructions: "Hips high in an A shape, lower the top of your head toward the floor."
	},
	{
		id: "superman",
		name: "Superman Hold",
		muscle: "Back",
		equipment: "Mat",
		seconds: 35,
		intensity: .9,
		instructions: "Face down, lift arms, chest and legs, squeezing your lower back gently."
	},
	{
		id: "reverse-snow-angels",
		name: "Reverse Snow Angels",
		muscle: "Back",
		equipment: "Mat",
		seconds: 35,
		intensity: .9,
		instructions: "Face down, sweep straight arms from your hips to overhead and back."
	},
	{
		id: "bent-over-row",
		name: "Bent Over Row",
		muscle: "Back",
		equipment: "Dumbbells",
		seconds: 40,
		intensity: 1.2,
		instructions: "Hinge forward with a flat back and row dumbbells toward your ribs."
	},
	{
		id: "single-arm-row",
		name: "Single Arm Row",
		muscle: "Back",
		equipment: "Dumbbells",
		seconds: 40,
		intensity: 1.2,
		instructions: "One hand on a bench, row the dumbbell up along your side."
	},
	{
		id: "band-pull-apart",
		name: "Band Pull Apart",
		muscle: "Back",
		equipment: "Resistance Band",
		seconds: 35,
		intensity: .9,
		instructions: "Arms straight ahead, pull the band apart squeezing your shoulder blades."
	},
	{
		id: "band-row",
		name: "Band Seated Row",
		muscle: "Back",
		equipment: "Resistance Band",
		seconds: 40,
		intensity: 1.1,
		instructions: "Anchor the band, pull elbows back keeping shoulders down."
	},
	{
		id: "prone-y-raise",
		name: "Prone Y Raise",
		muscle: "Upper Body",
		equipment: "Mat",
		seconds: 30,
		intensity: .8,
		instructions: "Face down, lift arms into a Y shape and lower slowly."
	},
	{
		id: "shoulder-press",
		name: "Dumbbell Shoulder Press",
		muscle: "Arms",
		equipment: "Dumbbells",
		seconds: 40,
		intensity: 1.2,
		instructions: "Press dumbbells overhead without leaning back, then lower to ear height."
	},
	{
		id: "lateral-raise",
		name: "Lateral Raise",
		muscle: "Arms",
		equipment: "Dumbbells",
		seconds: 35,
		intensity: 1,
		instructions: "Raise dumbbells out to shoulder height with soft elbows."
	},
	{
		id: "bicep-curls",
		name: "Bicep Curls",
		muscle: "Arms",
		equipment: "Dumbbells",
		seconds: 40,
		intensity: 1,
		instructions: "Elbows pinned to your sides, curl up and lower slowly."
	},
	{
		id: "tricep-dips",
		name: "Tricep Dips",
		muscle: "Arms",
		equipment: "Bench",
		seconds: 35,
		intensity: 1.2,
		instructions: "Hands on a bench behind you, bend elbows to lower, then press up."
	},
	{
		id: "tricep-kickback",
		name: "Tricep Kickback",
		muscle: "Arms",
		equipment: "Dumbbells",
		seconds: 35,
		intensity: 1,
		instructions: "Hinge forward, extend the elbow straight back and squeeze the triceps."
	},
	{
		id: "arm-circles",
		name: "Arm Circles",
		muscle: "Upper Body",
		equipment: "None",
		seconds: 30,
		intensity: .7,
		instructions: "Small to large circles forward, then reverse the direction."
	},
	{
		id: "band-bicep-curl",
		name: "Band Bicep Curl",
		muscle: "Arms",
		equipment: "Resistance Band",
		seconds: 40,
		intensity: 1,
		instructions: "Stand on the band and curl the handles keeping tension throughout."
	},
	{
		id: "plank",
		name: "Plank",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 45,
		intensity: 1,
		instructions: "Forearms down, body in a straight line, brace your abs and breathe."
	},
	{
		id: "side-plank",
		name: "Side Plank",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 35,
		intensity: 1,
		instructions: "Stack your feet and lift your hips. Switch sides halfway through."
	},
	{
		id: "crunches",
		name: "Crunches",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 40,
		intensity: .9,
		instructions: "Curl your shoulders off the floor, exhale at the top, lower slowly."
	},
	{
		id: "bicycle-crunches",
		name: "Bicycle Crunches",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 40,
		intensity: 1.1,
		instructions: "Alternate elbow to opposite knee with a controlled twist."
	},
	{
		id: "leg-raises",
		name: "Leg Raises",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 40,
		intensity: 1.1,
		instructions: "Legs straight, lower them slowly without letting your back arch."
	},
	{
		id: "russian-twists",
		name: "Russian Twists",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 40,
		intensity: 1,
		instructions: "Sit leaning back slightly and rotate your torso side to side."
	},
	{
		id: "flutter-kicks",
		name: "Flutter Kicks",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 35,
		intensity: 1,
		instructions: "Small quick alternating kicks with the lower back pressed down."
	},
	{
		id: "dead-bug",
		name: "Dead Bug",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 40,
		intensity: .9,
		instructions: "Extend opposite arm and leg slowly while keeping your ribs down."
	},
	{
		id: "bird-dog",
		name: "Bird Dog",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 40,
		intensity: .9,
		instructions: "On all fours, extend opposite arm and leg, pause, then switch."
	},
	{
		id: "hollow-hold",
		name: "Hollow Hold",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 30,
		intensity: 1.1,
		instructions: "Lift shoulders and legs into a shallow banana shape and hold."
	},
	{
		id: "toe-touches",
		name: "Toe Touches",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 35,
		intensity: 1,
		instructions: "Legs up, reach your hands toward your toes with a short crunch."
	},
	{
		id: "plank-shoulder-taps",
		name: "Plank Shoulder Taps",
		muscle: "Abs/Core",
		equipment: "Mat",
		seconds: 35,
		intensity: 1.1,
		instructions: "From a high plank, tap opposite shoulders while keeping hips still."
	},
	{
		id: "cat-cow",
		name: "Cat Cow",
		muscle: "Mobility",
		equipment: "Mat",
		seconds: 40,
		intensity: .5,
		instructions: "On all fours, alternate rounding and arching your spine with your breath."
	},
	{
		id: "childs-pose",
		name: "Child's Pose",
		muscle: "Mobility",
		equipment: "Mat",
		seconds: 45,
		intensity: .4,
		instructions: "Sit hips back to your heels, arms long, and breathe deeply."
	},
	{
		id: "hamstring-stretch",
		name: "Seated Hamstring Stretch",
		muscle: "Mobility",
		equipment: "Mat",
		seconds: 40,
		intensity: .4,
		instructions: "One leg extended, hinge forward gently until you feel a light stretch."
	},
	{
		id: "quad-stretch",
		name: "Standing Quad Stretch",
		muscle: "Mobility",
		equipment: "None",
		seconds: 40,
		intensity: .4,
		instructions: "Hold one ankle behind you, knees together, stand tall."
	},
	{
		id: "hip-flexor-stretch",
		name: "Hip Flexor Stretch",
		muscle: "Mobility",
		equipment: "Mat",
		seconds: 40,
		intensity: .4,
		instructions: "Half-kneeling, tuck your pelvis and press gently forward."
	},
	{
		id: "chest-opener",
		name: "Doorway Chest Opener",
		muscle: "Mobility",
		equipment: "None",
		seconds: 40,
		intensity: .4,
		instructions: "Forearms on a doorframe, step through gently to open the chest."
	},
	{
		id: "neck-release",
		name: "Neck Release",
		muscle: "Mobility",
		equipment: "None",
		seconds: 35,
		intensity: .3,
		instructions: "Tilt your ear toward your shoulder and breathe. Never force the stretch."
	},
	{
		id: "seated-twist",
		name: "Seated Spinal Twist",
		muscle: "Mobility",
		equipment: "Mat",
		seconds: 40,
		intensity: .4,
		instructions: "Sit tall, rotate gently and hold, then switch sides."
	},
	{
		id: "figure-four",
		name: "Figure Four Stretch",
		muscle: "Mobility",
		equipment: "Mat",
		seconds: 40,
		intensity: .4,
		instructions: "Cross one ankle over the opposite knee and pull the leg toward you."
	},
	{
		id: "downward-dog",
		name: "Downward Dog",
		muscle: "Mobility",
		equipment: "Mat",
		seconds: 40,
		intensity: .6,
		instructions: "Hips high, heels reaching down, spine long."
	},
	{
		id: "world-greatest-stretch",
		name: "World's Greatest Stretch",
		muscle: "Mobility",
		equipment: "Mat",
		seconds: 45,
		intensity: .7,
		instructions: "Deep lunge, drop the elbow inside the foot, then rotate open."
	},
	{
		id: "ankle-circles",
		name: "Ankle Circles",
		muscle: "Mobility",
		equipment: "None",
		seconds: 30,
		intensity: .3,
		instructions: "Slow controlled circles in both directions on each ankle."
	},
	{
		id: "shoulder-rolls",
		name: "Shoulder Rolls",
		muscle: "Mobility",
		equipment: "None",
		seconds: 30,
		intensity: .3,
		instructions: "Roll shoulders backward in big slow circles."
	}
].reduce((acc, exercise) => {
	acc[exercise.id] = exercise;
	return acc;
}, {});
function getExercise(id) {
	return EXERCISE_MAP[id];
}
//#endregion
//#region src/lib/fitlife/logic.ts
/** Local calendar day key, e.g. "2026-08-08". */
function dayKey(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
}
function addDays(date, amount) {
	const next = new Date(date);
	next.setDate(next.getDate() + amount);
	return next;
}
function dayDifference(fromKey, toKey) {
	const from = /* @__PURE__ */ new Date(`${fromKey}T00:00:00`);
	const to = /* @__PURE__ */ new Date(`${toKey}T00:00:00`);
	if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return NaN;
	return Math.round((to.getTime() - from.getTime()) / 864e5);
}
/** Last 7 days ending today, oldest first. */
function lastSevenDays(today = /* @__PURE__ */ new Date()) {
	return Array.from({ length: 7 }, (_, i) => {
		const date = addDays(today, i - 6);
		return {
			key: dayKey(date),
			label: date.toLocaleDateString(void 0, { weekday: "short" }).slice(0, 3)
		};
	});
}
function getLevelInfo(xp) {
	const safeXp = Math.max(0, Math.floor(xp || 0));
	let level = 1;
	for (let i = 0; i < LEVEL_THRESHOLDS.length; i += 1) if (safeXp >= (LEVEL_THRESHOLDS[i] ?? 0)) level = i + 1;
	const currentLevelXp = LEVEL_THRESHOLDS[level - 1] ?? 0;
	const nextLevelXp = level < LEVEL_THRESHOLDS.length ? LEVEL_THRESHOLDS[level] ?? null : null;
	const progressPercent = nextLevelXp === null ? 100 : Math.min(100, Math.round((safeXp - currentLevelXp) / (nextLevelXp - currentLevelXp) * 100));
	return {
		level,
		xp: safeXp,
		currentLevelXp,
		nextLevelXp,
		progressPercent,
		xpToNextLevel: nextLevelXp === null ? null : Math.max(0, nextLevelXp - safeXp)
	};
}
function calculateBmi(heightCm, weightKg) {
	if (!heightCm || !weightKg) return null;
	if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) return null;
	if (heightCm < 80 || heightCm > 250) return null;
	if (weightKg < 20 || weightKg > 400) return null;
	const metres = heightCm / 100;
	const bmi = Math.round(weightKg / (metres * metres) * 10) / 10;
	let category = "Normal";
	if (bmi < 18.5) category = "Underweight";
	else if (bmi < 25) category = "Normal";
	else if (bmi < 30) category = "Overweight";
	else category = "Obese";
	return {
		bmi,
		category,
		explanation: {
			Underweight: "Your BMI is below the typical range. Focus on strength training and eating enough to support your body. Consider speaking to a health professional.",
			Normal: "Your BMI sits in the typical range. Keep training consistently and eating a balanced diet to maintain it.",
			Overweight: "Your BMI is above the typical range. Regular activity and small sustainable eating changes make the biggest difference over time.",
			Obese: "Your BMI is well above the typical range. Gentle, consistent activity is a great starting point, and a health professional can help you build a safe plan."
		}[category]
	};
}
function estimateCalories(workout, completedExercises, weightKg) {
	const intensitySum = workout.exercises.slice(0, Math.max(0, completedExercises)).reduce((sum, e) => sum + e.seconds * (EXERCISE_MAP[e.exerciseId]?.intensity ?? 1), 0);
	const weightFactor = weightKg ? weightKg / 70 : 1;
	return Math.max(1, Math.round(intensitySum / 60 * 7 * weightFactor));
}
function formatDuration(totalSeconds) {
	const safe = Math.max(0, Math.floor(totalSeconds || 0));
	const m = Math.floor(safe / 60);
	const s = safe % 60;
	if (m === 0) return `${s}s`;
	return s === 0 ? `${m} min` : `${m} min ${s}s`;
}
function computeStreak(history, today = dayKey()) {
	const days = Array.from(new Set(history.map((h) => h.day))).sort();
	if (!days.length) return {
		current: 0,
		longest: 0
	};
	let longest = 1;
	let run = 1;
	for (let i = 1; i < days.length; i += 1) {
		const diff = dayDifference(days[i - 1], days[i]);
		if (diff === 1) {
			run += 1;
			longest = Math.max(longest, run);
		} else if (diff !== 0) run = 1;
	}
	const lastDay = days[days.length - 1];
	const sinceLast = dayDifference(lastDay, today);
	let current = 0;
	if (sinceLast === 0 || sinceLast === 1) {
		current = 1;
		for (let i = days.length - 1; i > 0; i -= 1) if (dayDifference(days[i - 1], days[i]) === 1) current += 1;
		else break;
	}
	return {
		current,
		longest: Math.max(longest, current)
	};
}
function getActivityStats(state, today = /* @__PURE__ */ new Date()) {
	const monthPrefix = dayKey(today).slice(0, 7);
	const weekKeys = new Set(lastSevenDays(today).map((d) => d.key));
	const streak = computeStreak(state.history, dayKey(today));
	const monthEntries = state.history.filter((h) => h.day.startsWith(monthPrefix));
	return {
		totalWorkouts: state.history.length,
		totalSeconds: state.history.reduce((s, h) => s + h.durationSeconds, 0),
		totalCalories: state.history.reduce((s, h) => s + h.calories, 0),
		currentStreak: streak.current,
		longestStreak: Math.max(streak.longest, state.progress.longestStreak),
		monthWorkouts: monthEntries.length,
		monthCalories: monthEntries.reduce((s, h) => s + h.calories, 0),
		monthSeconds: monthEntries.reduce((s, h) => s + h.durationSeconds, 0),
		weekWorkouts: state.history.filter((h) => weekKeys.has(h.day)).length
	};
}
function getTodayStats(state, today = /* @__PURE__ */ new Date()) {
	const key = dayKey(today);
	const todaysWorkouts = state.history.filter((h) => h.day === key);
	return {
		workouts: todaysWorkouts.length,
		workoutTarget: Math.max(1, state.goals.dailyWorkoutTarget),
		calories: todaysWorkouts.reduce((s, h) => s + h.calories, 0),
		water: state.water[key] ?? 0,
		waterTarget: Math.max(1, state.goals.dailyWaterTarget),
		minutes: Math.round(todaysWorkouts.reduce((s, h) => s + h.durationSeconds, 0) / 60)
	};
}
function greetingFor(date = /* @__PURE__ */ new Date()) {
	const hour = date.getHours();
	if (hour < 12) return "Good morning";
	if (hour < 18) return "Good afternoon";
	return "Good evening";
}
function quoteOfTheDay(quotes, date = /* @__PURE__ */ new Date()) {
	if (!quotes.length) return "";
	return quotes[Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5) % quotes.length];
}
//#endregion
//#region src/lib/fitlife/storage.ts
/**
* Local persistence layer (browser localStorage).
* Every operation is defensive: corrupt or unavailable storage must never
* crash the app, it just falls back to a fresh state.
*/
function isBrowser() {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
function mergeState(raw) {
	const base = createInitialState();
	if (!raw || typeof raw !== "object") return base;
	const parsed = raw;
	return {
		...base,
		...parsed,
		profile: {
			...base.profile,
			...parsed.profile ?? {}
		},
		goals: {
			...base.goals,
			...parsed.goals ?? {}
		},
		settings: {
			...base.settings,
			...parsed.settings ?? {}
		},
		progress: {
			...base.progress,
			...parsed.progress ?? {}
		},
		history: Array.isArray(parsed.history) ? parsed.history : [],
		weights: Array.isArray(parsed.weights) ? parsed.weights : [],
		water: parsed.water && typeof parsed.water === "object" ? parsed.water : {},
		favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
		achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
		version: base.version
	};
}
function loadState() {
	if (!isBrowser()) return createInitialState();
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return createInitialState();
		return mergeState(JSON.parse(raw));
	} catch (error) {
		console.warn("FitLife: could not read saved data, starting fresh.", error);
		return createInitialState();
	}
}
function saveState(state) {
	if (!isBrowser()) return false;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		return true;
	} catch (error) {
		console.warn("FitLife: could not save your data.", error);
		return false;
	}
}
function clearState() {
	if (!isBrowser()) return;
	try {
		window.localStorage.removeItem(STORAGE_KEY);
	} catch (error) {
		console.warn("FitLife: could not clear saved data.", error);
	}
}
function createId(prefix = "id") {
	const random = Math.random().toString(36).slice(2, 10);
	return `${prefix}_${Date.now().toString(36)}_${random}`;
}
//#endregion
//#region src/lib/fitlife/store.tsx
var FitLifeContext = React.createContext(null);
/** Returns achievement ids that the state qualifies for. */
function qualifyingAchievements(state, now) {
	const ids = [];
	const totalCalories = state.history.reduce((s, h) => s + h.calories, 0);
	const streak = computeStreak(state.history, dayKey(now));
	const level = getLevelInfo(state.progress.xp).level;
	if (state.history.length >= 1) ids.push("first-workout");
	if (state.history.length >= 10) ids.push("workouts-10");
	if (state.history.length >= 50) ids.push("workouts-50");
	if (streak.longest >= 3 || state.progress.longestStreak >= 3) ids.push("streak-3");
	if (streak.longest >= 7 || state.progress.longestStreak >= 7) ids.push("streak-7");
	if (state.progress.waterGoalDaysHit >= 7) ids.push("hydration-hero");
	if (state.progress.xp >= 100) ids.push("xp-100");
	if (level >= 10) ids.push("level-10");
	if (totalCalories >= 1e3) ids.push("calories-1000");
	if (state.weights.length >= 5) ids.push("weight-logger");
	if (state.favorites.length >= 5) ids.push("favorite-five");
	if (state.history.some((h) => new Date(h.completedAt).getHours() < 8)) ids.push("early-bird");
	return ids;
}
function applyAchievements(state, now) {
	const owned = new Set(state.achievements.map((a) => a.id));
	const newIds = qualifyingAchievements(state, now).filter((id) => !owned.has(id));
	if (!newIds.length) return {
		state,
		unlocked: []
	};
	const unlocked = newIds.map((id) => ACHIEVEMENTS.find((a) => a.id === id)).filter((a) => Boolean(a));
	return {
		state: {
			...state,
			achievements: [...state.achievements, ...newIds.map((id) => ({
				id,
				unlockedAt: now.toISOString()
			}))]
		},
		unlocked
	};
}
function FitLifeProvider({ children }) {
	const [state, setState] = React.useState(() => createInitialState());
	const [ready, setReady] = React.useState(false);
	const [storageWorking, setStorageWorking] = React.useState(true);
	const [queue, setQueue] = React.useState([]);
	React.useEffect(() => {
		setState(loadState());
		setReady(true);
	}, []);
	React.useEffect(() => {
		if (!ready) return;
		setStorageWorking(saveState(state));
	}, [state, ready]);
	React.useEffect(() => {
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const apply = () => {
			const dark = state.settings.theme === "dark" || state.settings.theme === "system" && media.matches;
			root.classList.toggle("dark", dark);
			root.classList.toggle("light", !dark);
		};
		apply();
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, [state.settings.theme]);
	const enqueue = React.useCallback((items) => {
		if (items.length) setQueue((prev) => [...prev, ...items]);
	}, []);
	const updateProfile = React.useCallback((patch) => {
		setState((prev) => ({
			...prev,
			profile: {
				...prev.profile,
				...patch
			}
		}));
	}, []);
	const updateGoals = React.useCallback((patch) => {
		setState((prev) => ({
			...prev,
			goals: {
				...prev.goals,
				...patch
			}
		}));
	}, []);
	const updateSettings = React.useCallback((patch) => {
		setState((prev) => ({
			...prev,
			settings: {
				...prev.settings,
				...patch
			}
		}));
	}, []);
	const completeOnboarding = React.useCallback((profile, goals) => {
		setState((prev) => {
			const next = {
				...prev,
				onboarded: true,
				profile: {
					...prev.profile,
					...profile
				},
				goals: {
					...prev.goals,
					...goals
				}
			};
			if (profile.weightKg) next.weights = [...prev.weights, {
				id: createId("w"),
				day: dayKey(),
				weightKg: profile.weightKg
			}];
			return next;
		});
	}, []);
	const addWater = React.useCallback((delta) => {
		const now = /* @__PURE__ */ new Date();
		const key = dayKey(now);
		let unlockedOut = [];
		setState((prev) => {
			const target = Math.max(1, prev.goals.dailyWaterTarget);
			const current = prev.water[key] ?? 0;
			const value = Math.max(0, Math.min(50, current + delta));
			let next = {
				...prev,
				water: {
					...prev.water,
					[key]: value
				}
			};
			const alreadyRewarded = prev.progress.waterRewardedDays.includes(key);
			if (value >= target && !alreadyRewarded) next = {
				...next,
				progress: {
					...next.progress,
					xp: next.progress.xp + XP_REWARDS.waterGoal,
					waterGoalDaysHit: next.progress.waterGoalDaysHit + 1,
					waterRewardedDays: [...next.progress.waterRewardedDays, key]
				}
			};
			const result = applyAchievements(next, now);
			unlockedOut = result.unlocked;
			return result.state;
		});
		setTimeout(() => enqueue(unlockedOut), 0);
	}, [enqueue]);
	const logWeight = React.useCallback((weightKg) => {
		if (!Number.isFinite(weightKg) || weightKg < 20 || weightKg > 400) return false;
		const now = /* @__PURE__ */ new Date();
		let unlockedOut = [];
		setState((prev) => {
			const entry = {
				id: createId("w"),
				day: dayKey(now),
				weightKg: Math.round(weightKg * 10) / 10
			};
			const result = applyAchievements({
				...prev,
				weights: [...prev.weights, entry],
				profile: {
					...prev.profile,
					weightKg: entry.weightKg
				}
			}, now);
			unlockedOut = result.unlocked;
			return result.state;
		});
		setTimeout(() => enqueue(unlockedOut), 0);
		return true;
	}, [enqueue]);
	const toggleFavorite = React.useCallback((workoutId) => {
		const now = /* @__PURE__ */ new Date();
		let unlockedOut = [];
		setState((prev) => {
			const favorites = prev.favorites.includes(workoutId) ? prev.favorites.filter((id) => id !== workoutId) : [...prev.favorites, workoutId];
			const result = applyAchievements({
				...prev,
				favorites
			}, now);
			unlockedOut = result.unlocked;
			return result.state;
		});
		setTimeout(() => enqueue(unlockedOut), 0);
	}, [enqueue]);
	const completeWorkout = React.useCallback(({ workout, durationSeconds, exercisesCompleted }) => {
		const now = /* @__PURE__ */ new Date();
		const key = dayKey(now);
		const safeExercises = Math.max(1, Math.min(workout.exercises.length, exercisesCompleted));
		const safeDuration = Math.max(1, Math.round(durationSeconds));
		const outcome = {
			xp: XP_REWARDS.workout,
			calories: 0,
			durationSeconds: safeDuration,
			exercisesCompleted: safeExercises,
			unlocked: [],
			leveledUpTo: null
		};
		setState((prev) => {
			const calories = estimateCalories(workout, safeExercises, prev.profile.weightKg);
			const entry = {
				id: createId("s"),
				workoutId: workout.id,
				workoutName: workout.name,
				completedAt: now.toISOString(),
				day: key,
				durationSeconds: safeDuration,
				exercisesCompleted: safeExercises,
				calories,
				xp: XP_REWARDS.workout
			};
			const previousLevel = getLevelInfo(prev.progress.xp).level;
			const history = [entry, ...prev.history];
			const streak = computeStreak(history, key);
			const firstToday = !prev.history.some((h) => h.day === key);
			let xpGain = XP_REWARDS.workout;
			if (firstToday && streak.current >= 2) xpGain += XP_REWARDS.streak;
			const workoutsToday = history.filter((h) => h.day === key).length;
			const dailyTarget = Math.max(1, prev.goals.dailyWorkoutTarget);
			const dailyRewarded = prev.progress.dailyGoalRewardedDays.includes(key);
			const hitsDailyGoal = workoutsToday >= dailyTarget && !dailyRewarded;
			if (hitsDailyGoal) xpGain += XP_REWARDS.dailyGoal;
			let next = {
				...prev,
				history,
				progress: {
					...prev.progress,
					xp: prev.progress.xp + xpGain,
					currentStreak: streak.current,
					longestStreak: Math.max(prev.progress.longestStreak, streak.longest),
					lastWorkoutDay: key,
					dailyGoalRewardedDays: hitsDailyGoal ? [...prev.progress.dailyGoalRewardedDays, key] : prev.progress.dailyGoalRewardedDays
				}
			};
			const result = applyAchievements(next, now);
			next = result.state;
			const newLevel = getLevelInfo(next.progress.xp).level;
			outcome.xp = xpGain;
			outcome.calories = calories;
			outcome.unlocked = result.unlocked;
			outcome.leveledUpTo = newLevel > previousLevel ? newLevel : null;
			return next;
		});
		setTimeout(() => enqueue(outcome.unlocked), 0);
		return outcome;
	}, [enqueue]);
	const resetProgress = React.useCallback(() => {
		setState((prev) => ({
			...prev,
			history: [],
			weights: [],
			achievements: [],
			progress: createInitialState().progress
		}));
	}, []);
	const resetWater = React.useCallback(() => {
		setState((prev) => ({
			...prev,
			water: {},
			progress: {
				...prev.progress,
				waterGoalDaysHit: 0,
				waterRewardedDays: []
			}
		}));
	}, []);
	const resetEverything = React.useCallback(() => {
		clearState();
		setState(createInitialState());
	}, []);
	const dismissAchievement = React.useCallback(() => {
		setQueue((prev) => prev.slice(1));
	}, []);
	const value = React.useMemo(() => ({
		state,
		ready,
		storageWorking,
		updateProfile,
		updateGoals,
		updateSettings,
		completeOnboarding,
		addWater,
		logWeight,
		toggleFavorite,
		completeWorkout,
		resetProgress,
		resetWater,
		resetEverything,
		pendingAchievement: queue[0] ?? null,
		dismissAchievement
	}), [
		state,
		ready,
		storageWorking,
		updateProfile,
		updateGoals,
		updateSettings,
		completeOnboarding,
		addWater,
		logWeight,
		toggleFavorite,
		completeWorkout,
		resetProgress,
		resetWater,
		resetEverything,
		queue,
		dismissAchievement
	]);
	return /* @__PURE__ */ jsx(FitLifeContext.Provider, {
		value,
		children
	});
}
function useFitLife() {
	const context = React.useContext(FitLifeContext);
	if (!context) throw new Error("useFitLife must be used inside <FitLifeProvider>.");
	return context;
}
//#endregion
export { MOTIVATION_QUOTES as _, getActivityStats as a, greetingFor as c, EXERCISE_MAP as d, getExercise as f, GENDERS as g, FITNESS_LEVELS as h, formatDuration as i, lastSevenDays as l, FITNESS_GOALS as m, useFitLife as n, getLevelInfo as o, ACHIEVEMENTS as p, calculateBmi as r, getTodayStats as s, FitLifeProvider as t, quoteOfTheDay as u };
