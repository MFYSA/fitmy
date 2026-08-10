import { d as EXERCISE_MAP } from "./store-0KjQDRyU.js";
//#region src/lib/fitlife/workouts.ts
var SPECS = [
	{
		category: "Beginner",
		muscle: "Full Body",
		restSeconds: 30,
		pool: [
			"march-in-place",
			"step-touch",
			"bodyweight-squats",
			"knee-push-ups",
			"glute-bridges",
			"crunches",
			"plank",
			"arm-circles",
			"calf-raises",
			"dead-bug",
			"bird-dog",
			"wall-sit",
			"superman",
			"shoulder-rolls",
			"reverse-lunges"
		],
		items: [
			{
				name: "First Steps",
				difficulty: "Beginner",
				count: 5,
				description: "A gentle introduction to moving your whole body. Perfect for day one."
			},
			{
				name: "Beginner Full Body",
				difficulty: "Beginner",
				count: 6,
				description: "The classic starter routine hitting every major muscle group."
			},
			{
				name: "Easy Morning Wake Up",
				difficulty: "Beginner",
				count: 5,
				description: "Light movement to shake off sleep and start the day well."
			},
			{
				name: "Gentle Strength Start",
				difficulty: "Beginner",
				count: 6,
				description: "Build a base of strength with simple, controlled movements."
			},
			{
				name: "Beginner Core Basics",
				difficulty: "Beginner",
				count: 5,
				description: "Learn to brace your core safely with foundational holds."
			},
			{
				name: "Low Impact Starter",
				difficulty: "Beginner",
				count: 6,
				description: "No jumping at all — kind to knees and downstairs neighbours."
			},
			{
				name: "Confidence Builder",
				difficulty: "Beginner",
				count: 7,
				description: "A slightly longer session to prove to yourself you can do it."
			},
			{
				name: "Beginner Strength Circuit",
				difficulty: "Beginner",
				count: 7,
				description: "Simple circuit format with generous rest between exercises."
			},
			{
				name: "Desk Break Reset",
				difficulty: "Beginner",
				count: 5,
				description: "A short movement break for long days at a desk."
			},
			{
				name: "Beginner Progression",
				difficulty: "Intermediate",
				count: 8,
				description: "Ready for a bit more? A step up from the beginner basics."
			}
		]
	},
	{
		category: "Full Body",
		muscle: "Full Body",
		restSeconds: 25,
		pool: [
			"jumping-jacks",
			"bodyweight-squats",
			"push-ups",
			"lunges",
			"plank",
			"mountain-climbers",
			"glute-bridges",
			"burpees",
			"russian-twists",
			"superman",
			"high-knees",
			"wall-sit",
			"pike-push-ups",
			"bicycle-crunches",
			"squat-jumps",
			"tricep-dips"
		],
		items: [
			{
				name: "Total Body Blast",
				difficulty: "Intermediate",
				count: 8,
				description: "A balanced full body circuit that leaves nothing untrained."
			},
			{
				name: "Full Body Foundations",
				difficulty: "Beginner",
				count: 6,
				description: "The essential movement patterns: squat, push, hinge, brace."
			},
			{
				name: "Metabolic Full Body",
				difficulty: "Advanced",
				count: 9,
				description: "Short rests and big movements to keep the heart rate high."
			},
			{
				name: "30 Minute Full Body",
				difficulty: "Intermediate",
				count: 10,
				description: "A longer complete session when you have time to spare."
			},
			{
				name: "Full Body Power",
				difficulty: "Advanced",
				count: 8,
				description: "Explosive movements for athletic strength and conditioning."
			},
			{
				name: "Express Full Body",
				difficulty: "Beginner",
				count: 5,
				description: "Everything that matters, compressed into a quick session."
			},
			{
				name: "Strength Endurance Mix",
				difficulty: "Intermediate",
				count: 8,
				description: "Alternating strength holds and moving exercises."
			},
			{
				name: "Full Body Burn",
				difficulty: "Advanced",
				count: 9,
				description: "High effort session for experienced trainees."
			},
			{
				name: "Balanced Body Circuit",
				difficulty: "Intermediate",
				count: 7,
				description: "Push, pull and legs in a smooth repeating circuit."
			},
			{
				name: "Weekend Warrior",
				difficulty: "Intermediate",
				count: 9,
				description: "A satisfying longer workout for your day off."
			}
		]
	},
	{
		category: "Cardio",
		muscle: "Cardio",
		restSeconds: 20,
		pool: [
			"jumping-jacks",
			"high-knees",
			"butt-kicks",
			"burpees",
			"mountain-climbers",
			"skater-jumps",
			"squat-jumps",
			"shadow-boxing",
			"fast-feet",
			"star-jumps",
			"jump-rope-mime",
			"step-touch",
			"march-in-place"
		],
		items: [
			{
				name: "Cardio Kickstart",
				difficulty: "Beginner",
				count: 6,
				description: "An approachable cardio session to build your engine."
			},
			{
				name: "HIIT Express",
				difficulty: "Advanced",
				count: 8,
				description: "Short bursts of maximum effort with minimal rest."
			},
			{
				name: "Fat Burn Circuit",
				difficulty: "Intermediate",
				count: 8,
				description: "Steady, continuous work to keep your heart rate elevated."
			},
			{
				name: "Low Impact Cardio",
				difficulty: "Beginner",
				count: 6,
				description: "Get your heart rate up with no jumping at all."
			},
			{
				name: "Boxing Conditioning",
				difficulty: "Intermediate",
				count: 7,
				description: "Punch, move and breathe your way to better conditioning."
			},
			{
				name: "Sprint Intervals",
				difficulty: "Advanced",
				count: 8,
				description: "Repeat all-out efforts with short recoveries."
			},
			{
				name: "Cardio Core Combo",
				difficulty: "Intermediate",
				count: 8,
				description: "Cardio bursts paired with core work."
			},
			{
				name: "Morning Heart Starter",
				difficulty: "Beginner",
				count: 5,
				description: "Five minutes of movement to wake up your system."
			},
			{
				name: "Endurance Builder",
				difficulty: "Intermediate",
				count: 10,
				description: "Longer intervals to develop staying power."
			},
			{
				name: "Cardio Finisher",
				difficulty: "Advanced",
				count: 6,
				description: "A brutal short finisher to add to any workout."
			}
		]
	},
	{
		category: "Upper Body",
		muscle: "Upper Body",
		restSeconds: 30,
		pool: [
			"push-ups",
			"pike-push-ups",
			"tricep-dips",
			"superman",
			"band-pull-apart",
			"shoulder-press",
			"bicep-curls",
			"lateral-raise",
			"bent-over-row",
			"diamond-push-ups",
			"wide-push-ups",
			"arm-circles",
			"prone-y-raise",
			"reverse-snow-angels",
			"knee-push-ups"
		],
		items: [
			{
				name: "Upper Body Basics",
				difficulty: "Beginner",
				count: 6,
				description: "Simple pushing and pulling for a stronger upper body."
			},
			{
				name: "Push Pull Circuit",
				difficulty: "Intermediate",
				count: 8,
				description: "Alternate pushing and pulling to balance your training."
			},
			{
				name: "Dumbbell Upper Body",
				difficulty: "Intermediate",
				count: 7,
				description: "A dumbbell-focused session for shoulders, back and arms."
			},
			{
				name: "Bodyweight Upper Strength",
				difficulty: "Intermediate",
				count: 7,
				description: "No equipment needed — just you and the floor."
			},
			{
				name: "Shoulder Sculpt",
				difficulty: "Intermediate",
				count: 6,
				description: "Targeted shoulder work for posture and definition."
			},
			{
				name: "Upper Body Burnout",
				difficulty: "Advanced",
				count: 9,
				description: "High volume work to fully fatigue the upper body."
			},
			{
				name: "Posture Builder",
				difficulty: "Beginner",
				count: 6,
				description: "Back-focused work to counteract sitting all day."
			},
			{
				name: "Band Upper Body",
				difficulty: "Beginner",
				count: 6,
				description: "Resistance band training that's easy on the joints."
			},
			{
				name: "Chest And Triceps",
				difficulty: "Intermediate",
				count: 7,
				description: "Press-focused session for chest and arm strength."
			},
			{
				name: "Back And Biceps",
				difficulty: "Intermediate",
				count: 7,
				description: "Pull-focused session for a strong, healthy back."
			}
		]
	},
	{
		category: "Lower Body",
		muscle: "Lower Body",
		restSeconds: 30,
		pool: [
			"bodyweight-squats",
			"lunges",
			"reverse-lunges",
			"glute-bridges",
			"wall-sit",
			"calf-raises",
			"sumo-squats",
			"side-lunges",
			"curtsy-lunges",
			"single-leg-bridge",
			"donkey-kicks",
			"fire-hydrants",
			"squat-jumps",
			"goblet-squat",
			"romanian-deadlift",
			"band-lateral-walk",
			"step-ups"
		],
		items: [
			{
				name: "Leg Day Basics",
				difficulty: "Beginner",
				count: 6,
				description: "Foundational leg strength without any equipment."
			},
			{
				name: "Glute Focus",
				difficulty: "Intermediate",
				count: 7,
				description: "Targeted glute work for strength and hip health."
			},
			{
				name: "Lower Body Strength",
				difficulty: "Intermediate",
				count: 8,
				description: "Heavier, slower work to build real leg strength."
			},
			{
				name: "Quad Burner",
				difficulty: "Advanced",
				count: 7,
				description: "Squat-heavy session — expect your legs to talk back."
			},
			{
				name: "Hamstrings And Glutes",
				difficulty: "Intermediate",
				count: 7,
				description: "Hinge patterns for the back of your legs."
			},
			{
				name: "Bodyweight Leg Circuit",
				difficulty: "Beginner",
				count: 7,
				description: "Continuous leg circuit you can do anywhere."
			},
			{
				name: "Dumbbell Legs",
				difficulty: "Advanced",
				count: 7,
				description: "Add load for progressive lower body strength."
			},
			{
				name: "Band Lower Body",
				difficulty: "Beginner",
				count: 6,
				description: "Band-based activation and strength for hips and glutes."
			},
			{
				name: "Single Leg Stability",
				difficulty: "Intermediate",
				count: 7,
				description: "Balance-focused work to even out left and right."
			},
			{
				name: "Legs And Calves",
				difficulty: "Intermediate",
				count: 8,
				description: "Complete lower body session, calves included."
			}
		]
	},
	{
		category: "Abs/Core",
		muscle: "Abs/Core",
		restSeconds: 20,
		pool: [
			"plank",
			"crunches",
			"bicycle-crunches",
			"leg-raises",
			"russian-twists",
			"flutter-kicks",
			"side-plank",
			"dead-bug",
			"bird-dog",
			"hollow-hold",
			"toe-touches",
			"plank-shoulder-taps",
			"mountain-climbers"
		],
		items: [
			{
				name: "Core Basics",
				difficulty: "Beginner",
				count: 5,
				description: "Learn to brace properly before adding intensity."
			},
			{
				name: "Six Pack Circuit",
				difficulty: "Intermediate",
				count: 8,
				description: "Classic ab circuit hitting upper, lower and obliques."
			},
			{
				name: "Plank Challenge",
				difficulty: "Intermediate",
				count: 6,
				description: "Isometric holds to build deep core endurance."
			},
			{
				name: "Oblique Focus",
				difficulty: "Intermediate",
				count: 6,
				description: "Rotation and side work for the waist."
			},
			{
				name: "Lower Ab Focus",
				difficulty: "Intermediate",
				count: 6,
				description: "Target the lower abs with leg-driven movements."
			},
			{
				name: "Core Power",
				difficulty: "Advanced",
				count: 9,
				description: "Demanding core session for experienced trainees."
			},
			{
				name: "5 Minute Abs",
				difficulty: "Beginner",
				count: 5,
				description: "Quick daily core hit you can fit in anywhere."
			},
			{
				name: "Standing Core",
				difficulty: "Beginner",
				count: 6,
				description: "No floor needed — core work on your feet."
			},
			{
				name: "Core Stability",
				difficulty: "Beginner",
				count: 6,
				description: "Slow controlled work for a resilient back and core."
			},
			{
				name: "Ab Finisher",
				difficulty: "Advanced",
				count: 7,
				description: "Add this to the end of any workout for extra burn."
			}
		]
	},
	{
		category: "Stretching",
		muscle: "Mobility",
		restSeconds: 10,
		pool: [
			"cat-cow",
			"childs-pose",
			"hamstring-stretch",
			"quad-stretch",
			"hip-flexor-stretch",
			"chest-opener",
			"neck-release",
			"seated-twist",
			"figure-four",
			"downward-dog",
			"world-greatest-stretch",
			"ankle-circles",
			"shoulder-rolls",
			"arm-circles"
		],
		items: [
			{
				name: "Morning Mobility",
				difficulty: "Beginner",
				count: 6,
				description: "Wake your joints up with slow, easy movement."
			},
			{
				name: "Full Body Stretch",
				difficulty: "Beginner",
				count: 8,
				description: "Head-to-toe stretching for general flexibility."
			},
			{
				name: "Post Workout Cooldown",
				difficulty: "Beginner",
				count: 6,
				description: "Bring the heart rate down and stretch what you trained."
			},
			{
				name: "Lower Body Stretch",
				difficulty: "Beginner",
				count: 6,
				description: "Hips, hamstrings and quads get some attention."
			},
			{
				name: "Upper Body Stretch",
				difficulty: "Beginner",
				count: 6,
				description: "Open the chest and release the shoulders and neck."
			},
			{
				name: "Hip Opener Flow",
				difficulty: "Beginner",
				count: 6,
				description: "Relieve tight hips from long hours of sitting."
			},
			{
				name: "Back Relief",
				difficulty: "Beginner",
				count: 6,
				description: "Gentle spinal movement to ease a stiff back."
			},
			{
				name: "Bedtime Wind Down",
				difficulty: "Beginner",
				count: 6,
				description: "Slow, calming stretches to finish the day."
			},
			{
				name: "Desk Worker Reset",
				difficulty: "Beginner",
				count: 6,
				description: "Undo the effects of sitting in a chair all day."
			},
			{
				name: "Deep Flexibility",
				difficulty: "Intermediate",
				count: 9,
				description: "Longer holds for real flexibility gains over time."
			}
		]
	},
	{
		category: "Chest",
		muscle: "Chest",
		restSeconds: 30,
		pool: [
			"push-ups",
			"wide-push-ups",
			"incline-push-ups",
			"knee-push-ups",
			"chest-press",
			"chest-fly",
			"band-chest-press",
			"diamond-push-ups"
		],
		items: [
			{
				name: "Chest Builder",
				difficulty: "Intermediate",
				count: 6,
				description: "Classic pressing volume for chest development."
			},
			{
				name: "Push Up Ladder",
				difficulty: "Advanced",
				count: 6,
				description: "Every push up variation, back to back."
			},
			{
				name: "Dumbbell Chest",
				difficulty: "Intermediate",
				count: 5,
				description: "Press and fly work with a pair of dumbbells."
			},
			{
				name: "Beginner Chest",
				difficulty: "Beginner",
				count: 5,
				description: "Scaled pressing to build your first push ups."
			}
		]
	},
	{
		category: "Back",
		muscle: "Back",
		restSeconds: 30,
		pool: [
			"superman",
			"reverse-snow-angels",
			"bent-over-row",
			"single-arm-row",
			"band-pull-apart",
			"band-row",
			"prone-y-raise",
			"bird-dog"
		],
		items: [
			{
				name: "Strong Back",
				difficulty: "Intermediate",
				count: 6,
				description: "Rowing and extension work for a resilient back."
			},
			{
				name: "Back Without Equipment",
				difficulty: "Beginner",
				count: 5,
				description: "Floor-based back work, no gear required."
			},
			{
				name: "Band Back Session",
				difficulty: "Beginner",
				count: 5,
				description: "Resistance band pulls for posture and strength."
			},
			{
				name: "Back Strength Builder",
				difficulty: "Advanced",
				count: 7,
				description: "Higher volume pulling for serious back development."
			}
		]
	},
	{
		category: "Arms",
		muscle: "Arms",
		restSeconds: 25,
		pool: [
			"bicep-curls",
			"tricep-dips",
			"tricep-kickback",
			"diamond-push-ups",
			"shoulder-press",
			"lateral-raise",
			"band-bicep-curl",
			"arm-circles"
		],
		items: [
			{
				name: "Arm Sculpt",
				difficulty: "Intermediate",
				count: 6,
				description: "Biceps and triceps in a straightforward superset format."
			},
			{
				name: "Bodyweight Arms",
				difficulty: "Beginner",
				count: 5,
				description: "Arm training with nothing but your bodyweight."
			},
			{
				name: "Dumbbell Arms",
				difficulty: "Intermediate",
				count: 6,
				description: "Curls, presses and extensions with dumbbells."
			},
			{
				name: "Arm Burnout",
				difficulty: "Advanced",
				count: 7,
				description: "High rep finisher for a serious pump."
			}
		]
	},
	{
		category: "Legs",
		muscle: "Legs",
		restSeconds: 30,
		pool: [
			"bodyweight-squats",
			"sumo-squats",
			"lunges",
			"side-lunges",
			"wall-sit",
			"calf-raises",
			"squat-jumps",
			"goblet-squat",
			"step-ups"
		],
		items: [
			{
				name: "Squat Focus",
				difficulty: "Intermediate",
				count: 6,
				description: "All squats, all the time. Build serious leg strength."
			},
			{
				name: "Lunge Matrix",
				difficulty: "Intermediate",
				count: 6,
				description: "Lunges in every direction for balanced legs."
			},
			{
				name: "Explosive Legs",
				difficulty: "Advanced",
				count: 6,
				description: "Jump training for power and athleticism."
			},
			{
				name: "Easy Legs",
				difficulty: "Beginner",
				count: 5,
				description: "Low impact leg work suitable for any level."
			}
		]
	},
	{
		category: "Home Workout",
		muscle: "Full Body",
		restSeconds: 25,
		pool: [
			"bodyweight-squats",
			"knee-push-ups",
			"glute-bridges",
			"plank",
			"step-touch",
			"crunches",
			"wall-sit",
			"superman",
			"reverse-lunges",
			"march-in-place",
			"calf-raises"
		],
		items: [
			{
				name: "Living Room Workout",
				difficulty: "Beginner",
				count: 6,
				description: "Fits in a small space with zero equipment."
			},
			{
				name: "Quiet Apartment Session",
				difficulty: "Beginner",
				count: 6,
				description: "No jumping and no noise — neighbour friendly."
			},
			{
				name: "Home Strength Circuit",
				difficulty: "Intermediate",
				count: 8,
				description: "A full strength session in your own home."
			},
			{
				name: "Hotel Room Workout",
				difficulty: "Beginner",
				count: 6,
				description: "Travel-friendly training in a tiny space."
			},
			{
				name: "Family Friendly Moves",
				difficulty: "Beginner",
				count: 6,
				description: "Simple exercises the whole household can join in on."
			}
		]
	},
	{
		category: "No Equipment",
		muscle: "Full Body",
		restSeconds: 25,
		pool: [
			"jumping-jacks",
			"bodyweight-squats",
			"push-ups",
			"lunges",
			"plank",
			"burpees",
			"mountain-climbers",
			"high-knees",
			"crunches",
			"wall-sit",
			"squat-jumps"
		],
		items: [
			{
				name: "Zero Equipment Blast",
				difficulty: "Intermediate",
				count: 8,
				description: "Nothing but your bodyweight and some determination."
			},
			{
				name: "Anywhere Anytime",
				difficulty: "Beginner",
				count: 6,
				description: "A workout that travels with you everywhere."
			},
			{
				name: "Park Workout",
				difficulty: "Intermediate",
				count: 7,
				description: "Take your training outdoors."
			},
			{
				name: "No Excuses Circuit",
				difficulty: "Advanced",
				count: 9,
				description: "When motivation is low, this one still gets done."
			},
			{
				name: "10 Minute No Gear",
				difficulty: "Beginner",
				count: 5,
				description: "Ten focused minutes, no equipment required."
			}
		]
	}
];
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function fallbackExerciseId(spec) {
	return spec.pool[0] ?? "plank";
}
function buildWorkout(spec, item, index) {
	const offset = index * 3;
	const exercises = [];
	const scale = item.difficulty === "Advanced" ? 1.25 : item.difficulty === "Beginner" ? .85 : 1;
	for (let i = 0; i < item.count; i += 1) {
		const exerciseId = spec.pool[(offset + i) % spec.pool.length] ?? fallbackExerciseId(spec);
		const baseSeconds = EXERCISE_MAP[exerciseId]?.seconds ?? 30;
		exercises.push({
			exerciseId,
			seconds: Math.round(baseSeconds * scale / 5) * 5,
			restSeconds: spec.restSeconds
		});
	}
	const workSeconds = exercises.reduce((sum, e) => sum + e.seconds, 0);
	const restTotal = spec.restSeconds * Math.max(0, exercises.length - 1);
	const intensitySum = exercises.reduce((sum, e) => sum + e.seconds * (EXERCISE_MAP[e.exerciseId]?.intensity ?? 1), 0);
	const equipment = Array.from(new Set(exercises.map((e) => EXERCISE_MAP[e.exerciseId]?.equipment ?? "None")));
	return {
		id: `${slugify(spec.category)}-${slugify(item.name)}`,
		name: item.name,
		category: spec.category,
		muscle: spec.muscle,
		difficulty: item.difficulty,
		durationMinutes: Math.max(3, Math.round((workSeconds + restTotal) / 60)),
		calories: Math.max(15, Math.round(intensitySum / 60 * 7)),
		description: item.description,
		equipment: equipment.length ? equipment : ["None"],
		exercises
	};
}
var WORKOUTS = SPECS.flatMap((spec) => spec.items.map((item, index) => buildWorkout(spec, item, index)));
var WORKOUT_CATEGORIES = SPECS.map((s) => s.category);
function getWorkout(id) {
	return WORKOUTS.find((w) => w.id === id);
}
var ALL_EQUIPMENT = [
	"None",
	"Dumbbells",
	"Resistance Band",
	"Mat",
	"Bench"
];
var ALL_DIFFICULTIES = [
	"Beginner",
	"Intermediate",
	"Advanced"
];
//#endregion
export { getWorkout as a, WORKOUT_CATEGORIES as i, ALL_EQUIPMENT as n, WORKOUTS as r, ALL_DIFFICULTIES as t };
