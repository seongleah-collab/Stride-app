export interface Workout {
  id: string;
  emoji: string;
  name: string;
  activityId: string;
  type: string;
  duration: string;
  detail: string;
  difficulty: number; // 1–5
  tags: string[];
  goalIds: string[];
  levels: string[]; // beginner | intermediate | active | athlete
}

export const activityMeta: Record<string, { label: string; sectionTitle: string; emoji: string; color: string }> = {
  running:    { label: "Running",         sectionTitle: "Running Workouts",       emoji: "🏃", color: "#f97316" },
  cycling:    { label: "Cycling",         sectionTitle: "Cycling Routes",          emoji: "🚴", color: "#7c3aed" },
  swimming:   { label: "Swimming",        sectionTitle: "Swim Sessions",           emoji: "🏊", color: "#0ea5e9" },
  weights:    { label: "Weight Training", sectionTitle: "Strength Training",       emoji: "🏋️", color: "#7c3aed" },
  hiit:       { label: "HIIT",            sectionTitle: "HIIT Workouts",           emoji: "⚡", color: "#f97316" },
  yoga:       { label: "Yoga",            sectionTitle: "Yoga & Mindfulness",      emoji: "🧘", color: "#8b5cf6" },
  boxing:     { label: "Boxing",          sectionTitle: "Boxing Sessions",         emoji: "🥊", color: "#ef4444" },
  hiking:     { label: "Hiking",          sectionTitle: "Hikes & Trails",          emoji: "🥾", color: "#10b981" },
  dance:      { label: "Dance",           sectionTitle: "Dance Fitness",           emoji: "💃", color: "#ec4899" },
  basketball: { label: "Basketball",      sectionTitle: "Basketball Training",     emoji: "🏀", color: "#f97316" },
  soccer:     { label: "Soccer",          sectionTitle: "Soccer Training",         emoji: "⚽", color: "#10b981" },
  tennis:     { label: "Tennis",          sectionTitle: "Tennis Training",         emoji: "🎾", color: "#84cc16" },
  crossfit:   { label: "CrossFit",        sectionTitle: "CrossFit WODs",           emoji: "🔗", color: "#ef4444" },
  climbing:   { label: "Rock Climbing",   sectionTitle: "Climbing Sessions",       emoji: "🧗", color: "#78716c" },
  pilates:    { label: "Pilates",         sectionTitle: "Pilates Classes",         emoji: "🤸", color: "#a78bfa" },
  rowing:     { label: "Rowing",          sectionTitle: "Rowing Workouts",         emoji: "🚣", color: "#0ea5e9" },
  golf:       { label: "Golf",            sectionTitle: "Golf & Course Walks",     emoji: "⛳", color: "#84cc16" },
  skiing:     { label: "Skiing",          sectionTitle: "Ski Conditioning",        emoji: "🎿", color: "#60a5fa" },
};

export const workoutLibrary: Workout[] = [
  // ── RUNNING ─────────────────────────────────────────────────────
  { id: "run_easy",      emoji: "🌿", name: "Easy Recovery Run",    activityId: "running",  type: "Running",  duration: "30 min", detail: "4–5 km",          difficulty: 1, tags: ["Recovery","Outdoors","Base"],            goalIds: ["endurance","heart","consistency"],          levels: ["beginner","intermediate","active","athlete"] },
  { id: "run_intervals", emoji: "⚡", name: "Speed Intervals",       activityId: "running",  type: "Running",  duration: "40 min", detail: "6 × 400 m",       difficulty: 4, tags: ["Speed","Track","Performance"],           goalIds: ["endurance","performance","event"],          levels: ["intermediate","active","athlete"] },
  { id: "run_tempo",     emoji: "🔥", name: "Tempo Run",             activityId: "running",  type: "Running",  duration: "45 min", detail: "7 km",             difficulty: 3, tags: ["Threshold","Race prep"],                 goalIds: ["endurance","event","performance"],          levels: ["intermediate","active","athlete"] },
  { id: "run_long",      emoji: "🛤️", name: "Long Run",               activityId: "running",  type: "Running",  duration: "70 min", detail: "10–12 km",        difficulty: 3, tags: ["Base building","Endurance"],             goalIds: ["endurance","event"],                        levels: ["intermediate","active","athlete"] },
  { id: "run_trail",     emoji: "🌲", name: "Trail Run",              activityId: "running",  type: "Trail",    duration: "60 min", detail: "8 km trail",      difficulty: 4, tags: ["Trail","Nature","Hills","Adventure"],    goalIds: ["endurance","mental","event"],               levels: ["intermediate","active","athlete"] },
  { id: "run_couch5k",   emoji: "🏃", name: "Run/Walk Intervals",    activityId: "running",  type: "Running",  duration: "30 min", detail: "Couch to 5K",    difficulty: 1, tags: ["Beginner","Walk/Run","Easy start"],      goalIds: ["consistency","heart","energy"],             levels: ["beginner"] },

  // ── HIKING ──────────────────────────────────────────────────────
  { id: "hike_nature",   emoji: "🌿", name: "Nature Trail Walk",     activityId: "hiking",   type: "Hiking",   duration: "60 min", detail: "4–5 km",          difficulty: 1, tags: ["Nature","Easy","Scenic"],                goalIds: ["mental","heart","consistency"],             levels: ["beginner","intermediate"] },
  { id: "hike_summit",   emoji: "⛰️", name: "Mountain Summit Hike",  activityId: "hiking",   type: "Hiking",   duration: "180 min",detail: "12 km +800m",     difficulty: 5, tags: ["Summit","Elevation","Epic"],             goalIds: ["endurance","mental","event"],               levels: ["active","athlete"] },
  { id: "hike_hills",    emoji: "🏔️", name: "Hill Climb Challenge",  activityId: "hiking",   type: "Hiking",   duration: "90 min", detail: "7 km +400m",      difficulty: 3, tags: ["Hills","Elevation","Cardio"],            goalIds: ["endurance","performance","heart"],          levels: ["intermediate","active"] },
  { id: "hike_urban",    emoji: "🌆", name: "Urban Explore Walk",    activityId: "hiking",   type: "Walking",  duration: "45 min", detail: "5 km",             difficulty: 1, tags: ["Urban","Casual","Steps"],               goalIds: ["consistency","heart","energy"],             levels: ["beginner","intermediate"] },
  { id: "hike_overnight",emoji: "🌙", name: "Overnight Trail Prep",  activityId: "hiking",   type: "Hiking",   duration: "120 min",detail: "15 km",           difficulty: 4, tags: ["Backpacking","Endurance","Adventure"],  goalIds: ["endurance","event","mental"],               levels: ["active","athlete"] },

  // ── CYCLING ─────────────────────────────────────────────────────
  { id: "cycle_easy",    emoji: "🌅", name: "Easy Spin",              activityId: "cycling",  type: "Cycling",  duration: "30 min", detail: "10–15 km",        difficulty: 1, tags: ["Recovery","Easy","Beginner"],           goalIds: ["consistency","heart","energy"],             levels: ["beginner","intermediate"] },
  { id: "cycle_endur",   emoji: "🚴", name: "Endurance Road Ride",   activityId: "cycling",  type: "Cycling",  duration: "60 min", detail: "25–30 km",        difficulty: 3, tags: ["Road","Endurance","Outdoors"],           goalIds: ["endurance","heart"],                        levels: ["intermediate","active"] },
  { id: "cycle_inter",   emoji: "⚡", name: "Cycling Intervals",      activityId: "cycling",  type: "Cycling",  duration: "45 min", detail: "8 × 2 min",       difficulty: 4, tags: ["Power","VO2 max","Indoor"],             goalIds: ["endurance","performance"],                  levels: ["active","athlete"] },
  { id: "cycle_mtb",     emoji: "🏔️", name: "Mountain Bike Trail",   activityId: "cycling",  type: "Cycling",  duration: "90 min", detail: "20 km trail",     difficulty: 4, tags: ["MTB","Trail","Adventure","Outdoors"],   goalIds: ["endurance","mental","performance"],         levels: ["intermediate","active","athlete"] },
  { id: "cycle_hills",   emoji: "🏔️", name: "Hill Climb Challenge",  activityId: "cycling",  type: "Cycling",  duration: "75 min", detail: "30 km +600m",     difficulty: 5, tags: ["Hills","Climbing","Power"],             goalIds: ["endurance","performance","event"],          levels: ["active","athlete"] },

  // ── SWIMMING ────────────────────────────────────────────────────
  { id: "swim_tech",     emoji: "🌊", name: "Stroke Technique",       activityId: "swimming", type: "Swimming", duration: "45 min", detail: "1500 m",          difficulty: 2, tags: ["Technique","Form","Drills"],            goalIds: ["consistency","performance"],                levels: ["beginner","intermediate"] },
  { id: "swim_inter",    emoji: "💧", name: "Swim Intervals",         activityId: "swimming", type: "Swimming", duration: "50 min", detail: "8 × 100 m",       difficulty: 4, tags: ["Speed","Power","Intervals"],            goalIds: ["endurance","performance"],                  levels: ["active","athlete"] },
  { id: "swim_endur",    emoji: "🏊", name: "Open Water Prep",        activityId: "swimming", type: "Swimming", duration: "60 min", detail: "2000 m",          difficulty: 3, tags: ["Endurance","Event prep","Open water"],  goalIds: ["endurance","event"],                        levels: ["intermediate","active"] },

  // ── WEIGHTS ─────────────────────────────────────────────────────
  { id: "wt_upper",      emoji: "💪", name: "Upper Body Power",       activityId: "weights",  type: "Strength", duration: "45 min", detail: "8 exercises",     difficulty: 4, tags: ["Chest","Shoulders","Triceps"],          goalIds: ["build_muscle","tone","performance"],        levels: ["intermediate","active","athlete"] },
  { id: "wt_lower",      emoji: "🦵", name: "Lower Body Burn",        activityId: "weights",  type: "Strength", duration: "50 min", detail: "9 exercises",     difficulty: 4, tags: ["Quads","Glutes","Hamstrings"],          goalIds: ["build_muscle","tone","lose_weight"],        levels: ["intermediate","active"] },
  { id: "wt_full",       emoji: "🏋️", name: "Full Body Strength",     activityId: "weights",  type: "Strength", duration: "55 min", detail: "10 exercises",    difficulty: 3, tags: ["Full body","Compound lifts"],           goalIds: ["build_muscle","tone","performance"],        levels: ["beginner","intermediate","active"] },
  { id: "wt_push",       emoji: "💥", name: "Push Day",               activityId: "weights",  type: "Strength", duration: "50 min", detail: "7 exercises",     difficulty: 4, tags: ["Push","Chest","Shoulders","Triceps"],  goalIds: ["build_muscle","performance"],               levels: ["active","athlete"] },
  { id: "wt_pull",       emoji: "🔗", name: "Pull Day",               activityId: "weights",  type: "Strength", duration: "50 min", detail: "7 exercises",     difficulty: 4, tags: ["Back","Biceps","Pull"],                goalIds: ["build_muscle","performance"],               levels: ["active","athlete"] },
  { id: "wt_beginner",   emoji: "🌱", name: "Beginner Strength",      activityId: "weights",  type: "Strength", duration: "35 min", detail: "6 exercises",     difficulty: 1, tags: ["Beginner-friendly","Learn the basics"], goalIds: ["build_muscle","consistency"],               levels: ["beginner"] },

  // ── HIIT ────────────────────────────────────────────────────────
  { id: "hiit_tabata",   emoji: "⚡", name: "Tabata Full Body",       activityId: "hiit",     type: "HIIT",     duration: "25 min", detail: "8 rounds",        difficulty: 5, tags: ["Intense","Fat burn","No equipment"],   goalIds: ["lose_weight","endurance","performance"],    levels: ["active","athlete"] },
  { id: "hiit_begin",    emoji: "🔥", name: "Beginner HIIT",          activityId: "hiit",     type: "HIIT",     duration: "20 min", detail: "4 rounds",        difficulty: 2, tags: ["Low impact","Beginner-friendly"],       goalIds: ["lose_weight","consistency"],                levels: ["beginner","intermediate"] },
  { id: "hiit_circuit",  emoji: "💥", name: "Circuit Cardio",         activityId: "hiit",     type: "HIIT",     duration: "35 min", detail: "5 stations",      difficulty: 4, tags: ["Circuit","Cardio","Strength mix"],      goalIds: ["lose_weight","tone","endurance"],           levels: ["intermediate","active"] },
  { id: "hiit_kb",       emoji: "🔔", name: "Kettlebell HIIT",        activityId: "hiit",     type: "HIIT",     duration: "30 min", detail: "6 movements",     difficulty: 3, tags: ["Kettlebell","Power","Full body"],       goalIds: ["lose_weight","build_muscle","performance"], levels: ["intermediate","active"] },

  // ── YOGA ────────────────────────────────────────────────────────
  { id: "yoga_morning",  emoji: "🌅", name: "Morning Flow",           activityId: "yoga",     type: "Yoga",     duration: "20 min", detail: "12 poses",        difficulty: 1, tags: ["Wake-up","Stretching","Daily habit"],  goalIds: ["flexibility","mental","energy"],            levels: ["beginner","intermediate","active","athlete"] },
  { id: "yoga_power",    emoji: "🧘", name: "Power Yoga",             activityId: "yoga",     type: "Yoga",     duration: "45 min", detail: "20 poses",        difficulty: 3, tags: ["Strength","Balance","Core"],           goalIds: ["flexibility","tone","mental"],              levels: ["intermediate","active"] },
  { id: "yoga_restore",  emoji: "🌸", name: "Restorative Yoga",       activityId: "yoga",     type: "Yoga",     duration: "40 min", detail: "8 poses",         difficulty: 1, tags: ["Recovery","Deep stretch","Calm"],      goalIds: ["flexibility","mental","rehab"],             levels: ["beginner","intermediate","active","athlete"] },
  { id: "yoga_yin",      emoji: "☯️", name: "Yin Yoga",               activityId: "yoga",     type: "Yoga",     duration: "50 min", detail: "10 long holds",   difficulty: 1, tags: ["Fascia","Flexibility","Mindfulness"], goalIds: ["flexibility","mental","rehab"],             levels: ["beginner","intermediate","active","athlete"] },

  // ── BOXING ──────────────────────────────────────────────────────
  { id: "box_fundament", emoji: "🥊", name: "Boxing Fundamentals",    activityId: "boxing",   type: "Boxing",   duration: "45 min", detail: "6 rounds",        difficulty: 3, tags: ["Technique","Beginner","Cardio"],       goalIds: ["lose_weight","performance","mental"],       levels: ["beginner","intermediate"] },
  { id: "box_bag",       emoji: "🥊", name: "Heavy Bag HIIT",         activityId: "boxing",   type: "Boxing",   duration: "30 min", detail: "8 × 3 min",       difficulty: 4, tags: ["Power","Bag work","Fat burn"],         goalIds: ["lose_weight","performance"],                levels: ["intermediate","active"] },
  { id: "box_shadow",    emoji: "👊", name: "Shadowboxing Flow",       activityId: "boxing",   type: "Boxing",   duration: "25 min", detail: "5 rounds",        difficulty: 2, tags: ["Footwork","Coordination","Anywhere"],  goalIds: ["performance","mental"],                    levels: ["beginner","intermediate","active"] },

  // ── DANCE ───────────────────────────────────────────────────────
  { id: "dance_cardio",  emoji: "💃", name: "Cardio Dance Party",     activityId: "dance",    type: "Dance",    duration: "35 min", detail: "Full body",        difficulty: 2, tags: ["Fun","Cardio","No equipment"],         goalIds: ["lose_weight","energy","mental"],            levels: ["beginner","intermediate"] },
  { id: "dance_hiphop",  emoji: "🎵", name: "Hip Hop Workout",        activityId: "dance",    type: "Dance",    duration: "40 min", detail: "Full body",        difficulty: 3, tags: ["Hip hop","Coordination","Cardio"],     goalIds: ["lose_weight","performance"],                levels: ["intermediate","active"] },
  { id: "dance_latin",   emoji: "🎶", name: "Latin Cardio Burn",      activityId: "dance",    type: "Dance",    duration: "30 min", detail: "Full body",        difficulty: 2, tags: ["Latin","Fun","Full body"],             goalIds: ["lose_weight","energy"],                    levels: ["beginner","intermediate"] },

  // ── BASKETBALL ──────────────────────────────────────────────────
  { id: "bball_handles", emoji: "🏀", name: "Ball Handling Drills",   activityId: "basketball",type: "Sports",  duration: "45 min", detail: "6 drills",        difficulty: 2, tags: ["Handles","Dribbling","Skill"],         goalIds: ["performance","consistency"],                levels: ["beginner","intermediate"] },
  { id: "bball_cond",    emoji: "🏀", name: "Basketball Conditioning",activityId: "basketball",type: "Sports",  duration: "40 min", detail: "8 exercises",     difficulty: 4, tags: ["Agility","Speed","Jumps"],             goalIds: ["performance","endurance"],                  levels: ["intermediate","active"] },
  { id: "bball_shoot",   emoji: "🎯", name: "Shooting Mechanics",     activityId: "basketball",type: "Sports",  duration: "30 min", detail: "100 shots",       difficulty: 2, tags: ["Shooting","Form","Focus"],             goalIds: ["performance","consistency"],                levels: ["beginner","intermediate","active"] },

  // ── SOCCER ──────────────────────────────────────────────────────
  { id: "soccer_drills", emoji: "⚽", name: "Technical Drills",       activityId: "soccer",   type: "Sports",   duration: "50 min", detail: "8 drills",        difficulty: 3, tags: ["Ball control","Passing","Shooting"],   goalIds: ["performance","consistency"],                levels: ["beginner","intermediate"] },
  { id: "soccer_cond",   emoji: "🏃", name: "Match Conditioning",     activityId: "soccer",   type: "Sports",   duration: "45 min", detail: "Sprint intervals", difficulty: 4, tags: ["Speed","Endurance","Agility"],        goalIds: ["performance","endurance"],                  levels: ["intermediate","active"] },

  // ── TENNIS ──────────────────────────────────────────────────────
  { id: "tennis_serve",  emoji: "🎾", name: "Serve Practice",         activityId: "tennis",   type: "Sports",   duration: "45 min", detail: "4 drills",        difficulty: 3, tags: ["Serve","Technique","Consistency"],     goalIds: ["performance","consistency"],                levels: ["beginner","intermediate"] },
  { id: "tennis_fit",    emoji: "🎾", name: "Court Conditioning",     activityId: "tennis",   type: "Sports",   duration: "40 min", detail: "6 drills",        difficulty: 3, tags: ["Footwork","Agility","Lateral"],        goalIds: ["performance","endurance"],                  levels: ["intermediate","active"] },

  // ── CROSSFIT ────────────────────────────────────────────────────
  { id: "cf_intro",      emoji: "🔗", name: "Intro to CrossFit",      activityId: "crossfit", type: "CrossFit", duration: "40 min", detail: "6 movements",     difficulty: 2, tags: ["Foundations","Technique","Beginner"],  goalIds: ["build_muscle","consistency"],               levels: ["beginner","intermediate"] },
  { id: "cf_wod",        emoji: "💥", name: "Classic WOD",            activityId: "crossfit", type: "CrossFit", duration: "30 min", detail: "AMRAP · 5 moves", difficulty: 5, tags: ["AMRAP","Intensity","Community"],       goalIds: ["build_muscle","endurance","performance"],   levels: ["active","athlete"] },
  { id: "cf_strength",   emoji: "🏋️", name: "Olympic Lifting Basics", activityId: "crossfit", type: "CrossFit", duration: "55 min", detail: "3 lifts",         difficulty: 4, tags: ["Clean","Snatch","Power"],              goalIds: ["build_muscle","performance"],               levels: ["intermediate","active","athlete"] },

  // ── CLIMBING ────────────────────────────────────────────────────
  { id: "climb_boulder", emoji: "🧗", name: "Indoor Bouldering",      activityId: "climbing", type: "Climbing", duration: "60 min", detail: "V0–V4 problems",  difficulty: 3, tags: ["Bouldering","Problem solving","Grip"],goalIds: ["performance","mental"],                    levels: ["beginner","intermediate"] },
  { id: "climb_strength",emoji: "💪", name: "Climbing Strength",      activityId: "climbing", type: "Climbing", duration: "45 min", detail: "8 exercises",     difficulty: 4, tags: ["Fingerboard","Core","Pull strength"],  goalIds: ["build_muscle","performance"],               levels: ["active","athlete"] },
  { id: "climb_outdoor", emoji: "⛰️", name: "Outdoor Sport Climbing", activityId: "climbing", type: "Climbing", duration: "180 min",detail: "Multi-pitch",    difficulty: 5, tags: ["Outdoors","Lead climbing","Adventure"],goalIds: ["mental","performance","event"],             levels: ["active","athlete"] },

  // ── PILATES ─────────────────────────────────────────────────────
  { id: "pilates_core",  emoji: "🤸", name: "Core Pilates",           activityId: "pilates",  type: "Pilates",  duration: "35 min", detail: "12 exercises",    difficulty: 2, tags: ["Core","Posture","Stability"],          goalIds: ["flexibility","tone","rehab"],               levels: ["beginner","intermediate"] },
  { id: "pilates_power", emoji: "✨", name: "Power Pilates",           activityId: "pilates",  type: "Pilates",  duration: "45 min", detail: "15 exercises",    difficulty: 3, tags: ["Strength","Flexibility","Control"],    goalIds: ["flexibility","tone","build_muscle"],        levels: ["intermediate","active"] },

  // ── ROWING ──────────────────────────────────────────────────────
  { id: "row_endur",     emoji: "🚣", name: "Row Endurance",          activityId: "rowing",   type: "Rowing",   duration: "40 min", detail: "6000 m",          difficulty: 3, tags: ["Steady state","Endurance","Low impact"],goalIds: ["endurance","heart"],                       levels: ["intermediate","active"] },
  { id: "row_inter",     emoji: "⚡", name: "Rowing Intervals",       activityId: "rowing",   type: "Rowing",   duration: "30 min", detail: "8 × 500 m",       difficulty: 4, tags: ["Power","VO2 max","Intervals"],         goalIds: ["endurance","performance"],                  levels: ["active","athlete"] },

  // ── GOLF ────────────────────────────────────────────────────────
  { id: "golf_fitness",  emoji: "⛳", name: "Golf Fitness",            activityId: "golf",     type: "Golf",     duration: "40 min", detail: "8 exercises",     difficulty: 2, tags: ["Rotation","Core","Flexibility"],       goalIds: ["flexibility","performance"],                levels: ["beginner","intermediate"] },
  { id: "golf_course",   emoji: "🌳", name: "18-Hole Course Walk",    activityId: "golf",     type: "Golf",     duration: "270 min",detail: "7–8 km walk",    difficulty: 2, tags: ["Walking","Outdoors","Low intensity"],  goalIds: ["consistency","heart","mental"],             levels: ["beginner","intermediate","active"] },

  // ── SKIING ──────────────────────────────────────────────────────
  { id: "ski_cond",      emoji: "🎿", name: "Ski Conditioning",       activityId: "skiing",   type: "Skiing",   duration: "50 min", detail: "9 exercises",     difficulty: 4, tags: ["Legs","Balance","Explosive"],          goalIds: ["performance","endurance"],                  levels: ["intermediate","active","athlete"] },
  { id: "ski_balance",   emoji: "🌨️", name: "Balance & Core for Ski", activityId: "skiing",   type: "Skiing",   duration: "35 min", detail: "8 exercises",     difficulty: 3, tags: ["Balance","Core","Stability"],          goalIds: ["flexibility","performance"],                levels: ["beginner","intermediate"] },
];

export function getWorkoutsForActivities(activityIds: string[]): Workout[] {
  return workoutLibrary.filter((w) => activityIds.includes(w.activityId));
}

export function getRecommended(
  activityIds: string[],
  goalIds: string[],
  level: string,
  limit = 6
): Workout[] {
  const candidates = getWorkoutsForActivities(activityIds.length ? activityIds : workoutLibrary.map((w) => w.activityId));
  const scored = candidates
    .map((w) => {
      let score = 0;
      if (w.levels.includes(level)) score += 3;
      score += w.goalIds.filter((g) => goalIds.includes(g)).length * 2;
      return { w, score };
    })
    .sort((a, b) => b.score - a.score);
  // deduplicate by activityId to ensure variety
  const seen = new Set<string>();
  const result: Workout[] = [];
  for (const { w } of scored) {
    if (!seen.has(w.activityId)) { result.push(w); seen.add(w.activityId); }
    if (result.length >= limit) break;
  }
  return result;
}
