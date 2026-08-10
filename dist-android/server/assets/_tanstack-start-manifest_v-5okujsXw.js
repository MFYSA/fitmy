//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/dev-server/src/routes/__root.tsx",
		children: [
			"/",
			"/favorites",
			"/history",
			"/onboarding",
			"/profile",
			"/progress",
			"/settings",
			"/nutrition/$slug",
			"/session/$workoutId",
			"/workouts/$workoutId",
			"/nutrition/",
			"/workouts/"
		],
		preloads: [
			"/./assets/index-BYvinDLG.js",
			"/./assets/store-Brul6wfB.js",
			"/./assets/link-tbKhRxkL.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/./assets/index-BYvinDLG.js"
		} }]
	},
	"/": {
		filePath: "/dev-server/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/./assets/routes-D7nBnz5T.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/droplets-Bn6gY4ns.js",
			"/./assets/flame-djqrUmVU.js",
			"/./assets/weekly-chart-CpeOn5rs.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/stat-card-DiEhk1G4.js",
			"/./assets/workout-card-dsJNjGIX.js",
			"/./assets/ad-slot-dl0aiEhO.js",
			"/./assets/log-weight-dialog-Cx9jB_ze.js"
		]
	},
	"/favorites": {
		filePath: "/dev-server/src/routes/favorites.tsx",
		children: void 0,
		preloads: [
			"/./assets/favorites-BpRdPy_q.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/stat-card-DiEhk1G4.js",
			"/./assets/workout-card-dsJNjGIX.js"
		]
	},
	"/history": {
		filePath: "/dev-server/src/routes/history.tsx",
		children: void 0,
		preloads: [
			"/./assets/history-dCkLuxvG.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/stat-card-DiEhk1G4.js"
		]
	},
	"/onboarding": {
		filePath: "/dev-server/src/routes/onboarding.tsx",
		children: void 0,
		preloads: [
			"/./assets/onboarding-kilwiJkH.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/chevron-right-DeHRtSE5.js",
			"/./assets/input-CVW4AgcZ.js",
			"/./assets/label-CUgysVJl.js"
		]
	},
	"/profile": {
		filePath: "/dev-server/src/routes/profile.tsx",
		children: void 0,
		preloads: [
			"/./assets/profile-jPBLwGr5.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/droplets-Bn6gY4ns.js",
			"/./assets/flame-djqrUmVU.js",
			"/./assets/trophy-CHVUxEkM.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/stat-card-DiEhk1G4.js",
			"/./assets/ad-slot-dl0aiEhO.js",
			"/./assets/log-weight-dialog-Cx9jB_ze.js",
			"/./assets/input-CVW4AgcZ.js",
			"/./assets/label-CUgysVJl.js"
		]
	},
	"/progress": {
		filePath: "/dev-server/src/routes/progress.tsx",
		children: void 0,
		preloads: [
			"/./assets/progress-DHB7KIGm.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/flame-djqrUmVU.js",
			"/./assets/weekly-chart-CpeOn5rs.js",
			"/./assets/trophy-CHVUxEkM.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/stat-card-DiEhk1G4.js",
			"/./assets/ad-slot-dl0aiEhO.js",
			"/./assets/dist-xgvfjk9M.js",
			"/./assets/dist-Dr4vb1tF.js",
			"/./assets/log-weight-dialog-Cx9jB_ze.js",
			"/./assets/input-CVW4AgcZ.js",
			"/./assets/label-CUgysVJl.js",
			"/./assets/badge-DXjaD4sV.js"
		]
	},
	"/settings": {
		filePath: "/dev-server/src/routes/settings.tsx",
		children: void 0,
		preloads: [
			"/./assets/settings-CEbZQJQU.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/dist-xgvfjk9M.js",
			"/./assets/dist-Dr4vb1tF.js",
			"/./assets/label-CUgysVJl.js",
			"/./assets/alert-dialog-Jr-lbaiq.js"
		]
	},
	"/nutrition/$slug": {
		filePath: "/dev-server/src/routes/nutrition.$slug.tsx",
		children: void 0,
		preloads: [
			"/./assets/nutrition._slug-BvSygODj.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/nutrition._slug-DsIpI-kr.js",
			"/./assets/button-B_hZm-Y9.js"
		]
	},
	"/session/$workoutId": {
		filePath: "/dev-server/src/routes/session.$workoutId.tsx",
		children: void 0,
		preloads: [
			"/./assets/session._workoutId-B_UaDmjV.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/session._workoutId-ilHkd_s1.js",
			"/./assets/x-Ch5Rb3sB.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/alert-dialog-Jr-lbaiq.js"
		]
	},
	"/workouts/$workoutId": {
		filePath: "/dev-server/src/routes/workouts.$workoutId.tsx",
		children: void 0,
		preloads: [
			"/./assets/workouts._workoutId-B0H2fOND.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/workouts._workoutId-CLUOSKA7.js",
			"/./assets/workout-images-BL2IYrE1.js",
			"/./assets/flame-djqrUmVU.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/ad-slot-dl0aiEhO.js",
			"/./assets/badge-DXjaD4sV.js"
		]
	},
	"/nutrition/": {
		filePath: "/dev-server/src/routes/nutrition.index.tsx",
		children: void 0,
		preloads: [
			"/./assets/nutrition.index-Dw61Y5mB.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/chevron-right-DeHRtSE5.js",
			"/./assets/droplets-Bn6gY4ns.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/stat-card-DiEhk1G4.js",
			"/./assets/ad-slot-dl0aiEhO.js"
		]
	},
	"/workouts/": {
		filePath: "/dev-server/src/routes/workouts.index.tsx",
		children: void 0,
		preloads: [
			"/./assets/workouts.index-BeOhOV7d.js",
			"/./assets/app-shell-DEoI5Y0o.js",
			"/./assets/button-B_hZm-Y9.js",
			"/./assets/workout-images-BL2IYrE1.js",
			"/./assets/x-Ch5Rb3sB.js",
			"/./assets/onboarding-gate-L6x0d7J-.js",
			"/./assets/stat-card-DiEhk1G4.js",
			"/./assets/workout-card-dsJNjGIX.js",
			"/./assets/ad-slot-dl0aiEhO.js",
			"/./assets/input-CVW4AgcZ.js",
			"/./assets/badge-DXjaD4sV.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
