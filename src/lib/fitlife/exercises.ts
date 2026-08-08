import type { Exercise } from "./types";

/**
 * Built-in exercise library (56 unique exercises).
 * Shipped with the app so everything works fully offline.
 */
export const EXERCISES: Exercise[] = [
  // --- Cardio / conditioning ---
  { id: "jumping-jacks", name: "Jumping Jacks", muscle: "Cardio", equipment: "None", seconds: 40, intensity: 1.2, instructions: "Stand tall, jump feet out while raising arms overhead, then return. Keep a steady rhythm." },
  { id: "high-knees", name: "High Knees", muscle: "Cardio", equipment: "None", seconds: 30, intensity: 1.3, instructions: "Run in place driving each knee to hip height. Stay light on the balls of your feet." },
  { id: "butt-kicks", name: "Butt Kicks", muscle: "Cardio", equipment: "None", seconds: 30, intensity: 1.2, instructions: "Jog in place kicking your heels toward your glutes. Keep your chest upright." },
  { id: "burpees", name: "Burpees", muscle: "Full Body", equipment: "None", seconds: 30, intensity: 1.6, instructions: "Squat, place hands down, jump feet back to a plank, return and jump up." },
  { id: "mountain-climbers", name: "Mountain Climbers", muscle: "Abs/Core", equipment: "None", seconds: 35, intensity: 1.4, instructions: "From a plank, drive knees toward your chest one at a time without lifting your hips." },
  { id: "skater-jumps", name: "Skater Jumps", muscle: "Lower Body", equipment: "None", seconds: 30, intensity: 1.3, instructions: "Leap side to side landing softly on one leg, swinging the opposite arm across." },
  { id: "squat-jumps", name: "Squat Jumps", muscle: "Legs", equipment: "None", seconds: 30, intensity: 1.5, instructions: "Squat down, then jump explosively. Land softly with knees tracking over toes." },
  { id: "shadow-boxing", name: "Shadow Boxing", muscle: "Cardio", equipment: "None", seconds: 45, intensity: 1.2, instructions: "Punch straight ahead alternating hands while staying light on your feet." },
  { id: "step-touch", name: "Step Touch", muscle: "Cardio", equipment: "None", seconds: 40, intensity: 0.9, instructions: "Step side to side, tapping your toe and swinging arms. A gentle warm-up pace." },
  { id: "march-in-place", name: "March In Place", muscle: "Cardio", equipment: "None", seconds: 45, intensity: 0.8, instructions: "March with tall posture, lifting knees to a comfortable height." },
  { id: "fast-feet", name: "Fast Feet", muscle: "Cardio", equipment: "None", seconds: 25, intensity: 1.4, instructions: "Small quick steps in an athletic stance, staying on the balls of your feet." },
  { id: "star-jumps", name: "Star Jumps", muscle: "Full Body", equipment: "None", seconds: 25, intensity: 1.5, instructions: "From a small squat, jump and spread arms and legs into a star, then land softly." },
  { id: "jump-rope-mime", name: "Invisible Jump Rope", muscle: "Cardio", equipment: "None", seconds: 40, intensity: 1.2, instructions: "Hop with both feet as if skipping, circling your wrists." },

  // --- Legs / lower body ---
  { id: "bodyweight-squats", name: "Bodyweight Squats", muscle: "Legs", equipment: "None", seconds: 40, intensity: 1.1, instructions: "Feet shoulder-width, sit hips back and down, keep chest up, then drive through the heels." },
  { id: "sumo-squats", name: "Sumo Squats", muscle: "Legs", equipment: "None", seconds: 40, intensity: 1.1, instructions: "Wide stance with toes turned out. Lower straight down keeping knees pushed out." },
  { id: "lunges", name: "Lunges", muscle: "Legs", equipment: "None", seconds: 40, intensity: 1.2, instructions: "Step forward and lower until both knees are near 90°, then push back to standing." },
  { id: "reverse-lunges", name: "Reverse Lunges", muscle: "Legs", equipment: "None", seconds: 40, intensity: 1.2, instructions: "Step backward into a lunge. Great for knee comfort and balance." },
  { id: "glute-bridges", name: "Glute Bridges", muscle: "Lower Body", equipment: "Mat", seconds: 40, intensity: 1.0, instructions: "Lie on your back, feet flat, drive hips up and squeeze your glutes at the top." },
  { id: "single-leg-bridge", name: "Single Leg Bridge", muscle: "Lower Body", equipment: "Mat", seconds: 40, intensity: 1.1, instructions: "Bridge with one foot planted and the other leg extended. Switch halfway." },
  { id: "wall-sit", name: "Wall Sit", muscle: "Legs", equipment: "None", seconds: 45, intensity: 1.0, instructions: "Slide down a wall until thighs are parallel to the floor and hold." },
  { id: "calf-raises", name: "Calf Raises", muscle: "Legs", equipment: "None", seconds: 40, intensity: 0.8, instructions: "Rise onto your toes slowly, pause at the top, and lower under control." },
  { id: "step-ups", name: "Step Ups", muscle: "Lower Body", equipment: "Bench", seconds: 40, intensity: 1.2, instructions: "Step onto a sturdy bench with the whole foot, stand tall, then lower slowly." },
  { id: "side-lunges", name: "Side Lunges", muscle: "Legs", equipment: "None", seconds: 40, intensity: 1.1, instructions: "Step wide to one side, sit into that hip, keep the other leg straight." },
  { id: "curtsy-lunges", name: "Curtsy Lunges", muscle: "Lower Body", equipment: "None", seconds: 40, intensity: 1.1, instructions: "Step one leg diagonally behind the other and lower into a lunge." },
  { id: "goblet-squat", name: "Goblet Squat", muscle: "Legs", equipment: "Dumbbells", seconds: 40, intensity: 1.3, instructions: "Hold one dumbbell at your chest and squat between your knees." },
  { id: "romanian-deadlift", name: "Romanian Deadlift", muscle: "Lower Body", equipment: "Dumbbells", seconds: 40, intensity: 1.2, instructions: "Hinge at the hips with a flat back, feeling a stretch in the hamstrings." },
  { id: "band-lateral-walk", name: "Band Lateral Walk", muscle: "Lower Body", equipment: "Resistance Band", seconds: 35, intensity: 1.0, instructions: "Band above the knees, small athletic stance, step sideways keeping tension." },
  { id: "donkey-kicks", name: "Donkey Kicks", muscle: "Lower Body", equipment: "Mat", seconds: 35, intensity: 0.9, instructions: "On all fours, drive one heel toward the ceiling without arching your back." },
  { id: "fire-hydrants", name: "Fire Hydrants", muscle: "Lower Body", equipment: "Mat", seconds: 35, intensity: 0.9, instructions: "On all fours, lift one knee out to the side keeping hips square." },

  // --- Chest / push ---
  { id: "push-ups", name: "Push Ups", muscle: "Chest", equipment: "None", seconds: 35, intensity: 1.3, instructions: "Hands under shoulders, body in one line, lower your chest then press back up." },
  { id: "knee-push-ups", name: "Knee Push Ups", muscle: "Chest", equipment: "Mat", seconds: 35, intensity: 1.0, instructions: "Push ups from your knees. Keep hips and shoulders moving together." },
  { id: "incline-push-ups", name: "Incline Push Ups", muscle: "Chest", equipment: "Bench", seconds: 35, intensity: 1.1, instructions: "Hands on a bench to reduce difficulty while keeping a straight body line." },
  { id: "wide-push-ups", name: "Wide Push Ups", muscle: "Chest", equipment: "None", seconds: 35, intensity: 1.3, instructions: "Hands slightly wider than shoulders to emphasise the chest." },
  { id: "diamond-push-ups", name: "Diamond Push Ups", muscle: "Arms", equipment: "None", seconds: 30, intensity: 1.4, instructions: "Hands together forming a diamond. Keep elbows close to your body." },
  { id: "chest-press", name: "Dumbbell Chest Press", muscle: "Chest", equipment: "Dumbbells", seconds: 40, intensity: 1.2, instructions: "Lying on a bench or floor, press dumbbells up over your chest." },
  { id: "chest-fly", name: "Dumbbell Chest Fly", muscle: "Chest", equipment: "Dumbbells", seconds: 40, intensity: 1.1, instructions: "Arms slightly bent, open wide then hug them back together over your chest." },
  { id: "band-chest-press", name: "Band Chest Press", muscle: "Chest", equipment: "Resistance Band", seconds: 40, intensity: 1.1, instructions: "Band behind your back, press both hands forward and squeeze the chest." },
  { id: "pike-push-ups", name: "Pike Push Ups", muscle: "Upper Body", equipment: "None", seconds: 30, intensity: 1.4, instructions: "Hips high in an A shape, lower the top of your head toward the floor." },

  // --- Back / pull ---
  { id: "superman", name: "Superman Hold", muscle: "Back", equipment: "Mat", seconds: 35, intensity: 0.9, instructions: "Face down, lift arms, chest and legs, squeezing your lower back gently." },
  { id: "reverse-snow-angels", name: "Reverse Snow Angels", muscle: "Back", equipment: "Mat", seconds: 35, intensity: 0.9, instructions: "Face down, sweep straight arms from your hips to overhead and back." },
  { id: "bent-over-row", name: "Bent Over Row", muscle: "Back", equipment: "Dumbbells", seconds: 40, intensity: 1.2, instructions: "Hinge forward with a flat back and row dumbbells toward your ribs." },
  { id: "single-arm-row", name: "Single Arm Row", muscle: "Back", equipment: "Dumbbells", seconds: 40, intensity: 1.2, instructions: "One hand on a bench, row the dumbbell up along your side." },
  { id: "band-pull-apart", name: "Band Pull Apart", muscle: "Back", equipment: "Resistance Band", seconds: 35, intensity: 0.9, instructions: "Arms straight ahead, pull the band apart squeezing your shoulder blades." },
  { id: "band-row", name: "Band Seated Row", muscle: "Back", equipment: "Resistance Band", seconds: 40, intensity: 1.1, instructions: "Anchor the band, pull elbows back keeping shoulders down." },
  { id: "prone-y-raise", name: "Prone Y Raise", muscle: "Upper Body", equipment: "Mat", seconds: 30, intensity: 0.8, instructions: "Face down, lift arms into a Y shape and lower slowly." },

  // --- Arms / shoulders ---
  { id: "shoulder-press", name: "Dumbbell Shoulder Press", muscle: "Arms", equipment: "Dumbbells", seconds: 40, intensity: 1.2, instructions: "Press dumbbells overhead without leaning back, then lower to ear height." },
  { id: "lateral-raise", name: "Lateral Raise", muscle: "Arms", equipment: "Dumbbells", seconds: 35, intensity: 1.0, instructions: "Raise dumbbells out to shoulder height with soft elbows." },
  { id: "bicep-curls", name: "Bicep Curls", muscle: "Arms", equipment: "Dumbbells", seconds: 40, intensity: 1.0, instructions: "Elbows pinned to your sides, curl up and lower slowly." },
  { id: "tricep-dips", name: "Tricep Dips", muscle: "Arms", equipment: "Bench", seconds: 35, intensity: 1.2, instructions: "Hands on a bench behind you, bend elbows to lower, then press up." },
  { id: "tricep-kickback", name: "Tricep Kickback", muscle: "Arms", equipment: "Dumbbells", seconds: 35, intensity: 1.0, instructions: "Hinge forward, extend the elbow straight back and squeeze the triceps." },
  { id: "arm-circles", name: "Arm Circles", muscle: "Upper Body", equipment: "None", seconds: 30, intensity: 0.7, instructions: "Small to large circles forward, then reverse the direction." },
  { id: "band-bicep-curl", name: "Band Bicep Curl", muscle: "Arms", equipment: "Resistance Band", seconds: 40, intensity: 1.0, instructions: "Stand on the band and curl the handles keeping tension throughout." },

  // --- Core ---
  { id: "plank", name: "Plank", muscle: "Abs/Core", equipment: "Mat", seconds: 45, intensity: 1.0, instructions: "Forearms down, body in a straight line, brace your abs and breathe." },
  { id: "side-plank", name: "Side Plank", muscle: "Abs/Core", equipment: "Mat", seconds: 35, intensity: 1.0, instructions: "Stack your feet and lift your hips. Switch sides halfway through." },
  { id: "crunches", name: "Crunches", muscle: "Abs/Core", equipment: "Mat", seconds: 40, intensity: 0.9, instructions: "Curl your shoulders off the floor, exhale at the top, lower slowly." },
  { id: "bicycle-crunches", name: "Bicycle Crunches", muscle: "Abs/Core", equipment: "Mat", seconds: 40, intensity: 1.1, instructions: "Alternate elbow to opposite knee with a controlled twist." },
  { id: "leg-raises", name: "Leg Raises", muscle: "Abs/Core", equipment: "Mat", seconds: 40, intensity: 1.1, instructions: "Legs straight, lower them slowly without letting your back arch." },
  { id: "russian-twists", name: "Russian Twists", muscle: "Abs/Core", equipment: "Mat", seconds: 40, intensity: 1.0, instructions: "Sit leaning back slightly and rotate your torso side to side." },
  { id: "flutter-kicks", name: "Flutter Kicks", muscle: "Abs/Core", equipment: "Mat", seconds: 35, intensity: 1.0, instructions: "Small quick alternating kicks with the lower back pressed down." },
  { id: "dead-bug", name: "Dead Bug", muscle: "Abs/Core", equipment: "Mat", seconds: 40, intensity: 0.9, instructions: "Extend opposite arm and leg slowly while keeping your ribs down." },
  { id: "bird-dog", name: "Bird Dog", muscle: "Abs/Core", equipment: "Mat", seconds: 40, intensity: 0.9, instructions: "On all fours, extend opposite arm and leg, pause, then switch." },
  { id: "hollow-hold", name: "Hollow Hold", muscle: "Abs/Core", equipment: "Mat", seconds: 30, intensity: 1.1, instructions: "Lift shoulders and legs into a shallow banana shape and hold." },
  { id: "toe-touches", name: "Toe Touches", muscle: "Abs/Core", equipment: "Mat", seconds: 35, intensity: 1.0, instructions: "Legs up, reach your hands toward your toes with a short crunch." },
  { id: "plank-shoulder-taps", name: "Plank Shoulder Taps", muscle: "Abs/Core", equipment: "Mat", seconds: 35, intensity: 1.1, instructions: "From a high plank, tap opposite shoulders while keeping hips still." },

  // --- Mobility / stretching ---
  { id: "cat-cow", name: "Cat Cow", muscle: "Mobility", equipment: "Mat", seconds: 40, intensity: 0.5, instructions: "On all fours, alternate rounding and arching your spine with your breath." },
  { id: "childs-pose", name: "Child's Pose", muscle: "Mobility", equipment: "Mat", seconds: 45, intensity: 0.4, instructions: "Sit hips back to your heels, arms long, and breathe deeply." },
  { id: "hamstring-stretch", name: "Seated Hamstring Stretch", muscle: "Mobility", equipment: "Mat", seconds: 40, intensity: 0.4, instructions: "One leg extended, hinge forward gently until you feel a light stretch." },
  { id: "quad-stretch", name: "Standing Quad Stretch", muscle: "Mobility", equipment: "None", seconds: 40, intensity: 0.4, instructions: "Hold one ankle behind you, knees together, stand tall." },
  { id: "hip-flexor-stretch", name: "Hip Flexor Stretch", muscle: "Mobility", equipment: "Mat", seconds: 40, intensity: 0.4, instructions: "Half-kneeling, tuck your pelvis and press gently forward." },
  { id: "chest-opener", name: "Doorway Chest Opener", muscle: "Mobility", equipment: "None", seconds: 40, intensity: 0.4, instructions: "Forearms on a doorframe, step through gently to open the chest." },
  { id: "neck-release", name: "Neck Release", muscle: "Mobility", equipment: "None", seconds: 35, intensity: 0.3, instructions: "Tilt your ear toward your shoulder and breathe. Never force the stretch." },
  { id: "seated-twist", name: "Seated Spinal Twist", muscle: "Mobility", equipment: "Mat", seconds: 40, intensity: 0.4, instructions: "Sit tall, rotate gently and hold, then switch sides." },
  { id: "figure-four", name: "Figure Four Stretch", muscle: "Mobility", equipment: "Mat", seconds: 40, intensity: 0.4, instructions: "Cross one ankle over the opposite knee and pull the leg toward you." },
  { id: "downward-dog", name: "Downward Dog", muscle: "Mobility", equipment: "Mat", seconds: 40, intensity: 0.6, instructions: "Hips high, heels reaching down, spine long." },
  { id: "world-greatest-stretch", name: "World's Greatest Stretch", muscle: "Mobility", equipment: "Mat", seconds: 45, intensity: 0.7, instructions: "Deep lunge, drop the elbow inside the foot, then rotate open." },
  { id: "ankle-circles", name: "Ankle Circles", muscle: "Mobility", equipment: "None", seconds: 30, intensity: 0.3, instructions: "Slow controlled circles in both directions on each ankle." },
  { id: "shoulder-rolls", name: "Shoulder Rolls", muscle: "Mobility", equipment: "None", seconds: 30, intensity: 0.3, instructions: "Roll shoulders backward in big slow circles." },
];

export const EXERCISE_MAP: Record<string, Exercise> = EXERCISES.reduce<Record<string, Exercise>>(
  (acc, exercise) => {
    acc[exercise.id] = exercise;
    return acc;
  },
  {},
);

export function getExercise(id: string): Exercise | undefined {
  return EXERCISE_MAP[id];
}
