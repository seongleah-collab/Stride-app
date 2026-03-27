import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const goalLabels: Record<string, string> = {
  lose_weight:  "lose weight",
  build_muscle: "build muscle",
  endurance:    "boost endurance",
  performance:  "improve performance",
  flexibility:  "improve flexibility & mobility",
  event:        "train for an event",
  mental:       "improve mental wellness",
  heart:        "improve heart health",
  consistency:  "stay consistent",
  rehab:        "recover from injury",
  tone:         "tone up",
  energy:       "get more energy",
};

const activityLabels: Record<string, string> = {
  running: "Running", cycling: "Cycling", swimming: "Swimming",
  weights: "Weight Training", hiit: "HIIT", yoga: "Yoga",
  boxing: "Boxing", hiking: "Hiking", dance: "Dance",
  basketball: "Basketball", soccer: "Soccer", tennis: "Tennis",
  crossfit: "CrossFit", climbing: "Rock Climbing", pilates: "Pilates",
  rowing: "Rowing", golf: "Golf", skiing: "Skiing",
};

const levelDescriptions: Record<string, string> = {
  beginner:     "just starting out — brand new to working out",
  intermediate: "has some experience and works out occasionally",
  active:       "fairly active and goes to the gym regularly",
  athlete:      "a dedicated athlete doing high-performance training",
};

const genderPronouns: Record<string, string> = {
  man:          "he/him",
  woman:        "she/her",
  nonbinary:    "they/them",
  prefer_not:   "",
};

const durationLabels: Record<string, string> = {
  "15-30": "15–30 minutes",
  "30-45": "30–45 minutes",
  "45-60": "45–60 minutes",
  "60-90": "60–90 minutes",
  "90+":   "90+ minutes",
};

const timeLabels: Record<string, string> = {
  early:     "early morning (5–8am)",
  morning:   "morning (8–11am)",
  afternoon: "afternoon (11am–3pm)",
  evening:   "evening (3–7pm)",
  night:     "night (7pm+)",
  any:       "any time of day",
};

export async function POST(req: NextRequest) {
  const { messages, context } = await req.json();

  const name        = context.name        ?? "";
  const age         = context.age         ?? null;
  const gender      = context.gender      ?? "";
  const goals       = context.goals       ?? [];
  const activities  = context.activities  ?? [];
  const level       = context.level       ?? "";
  const days        = context.days        ?? null;
  const duration    = context.duration    ?? "";
  const time        = context.time        ?? "";

  const firstName   = name || "this person";
  const goalsText   = goals.map((g: string) => goalLabels[g] ?? g).join(", ") || null;
  const actsText    = activities.map((a: string) => activityLabels[a] ?? a).join(", ") || null;
  const levelText   = levelDescriptions[level] ?? null;
  const pronounText = genderPronouns[gender] ?? "";
  const daysText    = days ? `${days} day${days !== 1 ? "s" : ""} per week` : null;
  const durText     = durationLabels[duration] ?? null;
  const timeText    = timeLabels[time] ?? null;

  // Build profile section only from what we actually know
  const profileLines: string[] = [];
  if (name)        profileLines.push(`- Name: ${name} (use their first name, "${firstName}", naturally in conversation — like a real coach would, not on every message)`);
  if (age)         profileLines.push(`- Age: ${age} years old`);
  if (gender && gender !== "prefer_not") profileLines.push(`- Gender: ${gender}${pronounText ? ` (${pronounText})` : ""}`);
  if (levelText)   profileLines.push(`- Experience level: ${levelText}`);
  if (goalsText)   profileLines.push(`- Goals: ${goalsText}`);
  if (actsText)    profileLines.push(`- Favourite workouts: ${actsText}`);
  if (daysText)    profileLines.push(`- Trains: ${daysText}${durText ? `, ${durText} per session` : ""}`);
  if (timeText)    profileLines.push(`- Preferred training time: ${timeText}`);

  const profileSection = profileLines.length > 0
    ? `Here's what you know about ${firstName}:\n${profileLines.join("\n")}`
    : `You don't have detailed profile information for this user yet — give general helpful advice and encourage them to complete their profile.`;

  // Age-specific coaching notes
  let ageNote = "";
  if (age) {
    if (age < 20)       ageNote = `At ${age}, focus on building solid movement fundamentals and habits over raw intensity. Recovery is fast at this age but injury risk from overtraining is real.`;
    else if (age < 30)  ageNote = `At ${age}, this is a prime training window — the body recovers quickly and adapts well. Push hard but build smart habits now that will last.`;
    else if (age < 40)  ageNote = `At ${age}, recovery starts to matter more. Prioritize sleep, mobility work, and progressive overload over just grinding. Results still come fast with smart training.`;
    else if (age < 50)  ageNote = `At ${age}, strength training becomes even more important for maintaining muscle mass and bone density. Mobility and recovery are key pillars. Progress is absolutely still possible.`;
    else                ageNote = `At ${age}, consistency beats intensity. Focus on sustainable training, joint health, and adequate recovery. Strength and fitness absolutely improve at any age with the right approach.`;
  }

  const systemPrompt = `You are Stride AI — a personal fitness coach inside the Stride app. You're direct, warm, and knowledgeable — like a great coach who actually knows the person they're working with.

${profileSection}

${ageNote ? `Coaching context for their age:\n${ageNote}\n` : ""}
How to coach ${firstName}:
- Address them by their first name occasionally — naturally, not on every single message. Use it when it feels genuine, like "That's a solid approach, ${firstName}" or starting a response with their name when giving important advice.
- Give advice that's actually specific to their situation. If they ask for a workout plan, build it around their preferred activities (${actsText ?? "not specified"}), their schedule (${daysText ?? "not specified"}), and their level. Don't give generic advice.
- Reference their specific goals (${goalsText ?? "not specified"}) when motivating or advising them.
- Factor in their training frequency and session length when recommending recovery, volume, or intensity.
- If they ask something that doesn't align with their goals, gently point that out.

Tone:
- Conversational and real — not robotic, not overly enthusiastic
- Encouraging but honest — if something won't work for them, say so kindly
- Concise — short paragraphs and bullet points, never long walls of text
- No markdown headers (##). Use **bold** sparingly for key points only.

You can help with workout plans, nutrition, recovery, goal setting, event prep, motivation, and any fitness question.`;

  const stream = await client.messages.stream({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
