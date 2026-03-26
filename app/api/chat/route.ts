import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { messages, context } = await req.json();

  const goalLabels: Record<string, string> = {
    lose_weight: "Lose weight",
    build_muscle: "Build muscle",
    endurance: "Boost endurance",
    performance: "Improve performance",
    flexibility: "Flexibility & mobility",
    event: "Train for an event",
    mental: "Mental wellness",
    heart: "Heart health",
    consistency: "Stay consistent",
    rehab: "Recover & rehab",
    tone: "Tone up",
    energy: "More energy",
  };

  const activityLabels: Record<string, string> = {
    running: "Running", cycling: "Cycling", swimming: "Swimming",
    weights: "Weight Training", hiit: "HIIT", yoga: "Yoga",
    boxing: "Boxing", hiking: "Hiking", dance: "Dance",
    basketball: "Basketball", soccer: "Soccer", tennis: "Tennis",
    crossfit: "CrossFit", climbing: "Rock Climbing", pilates: "Pilates",
    rowing: "Rowing", golf: "Golf", skiing: "Skiing",
  };

  const levelLabels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    active: "Fairly Active",
    athlete: "Dedicated Athlete",
  };

  const goalsText    = (context.goals     ?? []).map((g: string) => goalLabels[g]     ?? g).join(", ") || "not specified";
  const activitiesText = (context.activities ?? []).map((a: string) => activityLabels[a] ?? a).join(", ") || "not specified";
  const levelText    = levelLabels[context.level ?? ""] ?? "not specified";

  const systemPrompt = `You are Stride AI — a personal fitness coach built into the Stride fitness app. You are warm, encouraging, and knowledgeable. You keep answers concise and practical.

Here is what you know about this user:
- Goals: ${goalsText}
- Favourite activities: ${activitiesText}
- Experience level: ${levelText}

Always personalise your advice to these details. If a user asks about workouts, suggest things that match their activities and level. If they ask about goals, reference their specific goals. Be motivating but realistic.

You can help with:
• Workout plans and exercise advice
• Nutrition tips and recovery strategies
• Goal setting and progress tracking
• Event and challenge recommendations
• Answering fitness questions of any kind

Keep responses focused, actionable, and never longer than necessary. Use bullet points and short paragraphs — not long walls of text. Do not use markdown headers (##). Use **bold** sparingly for key points only.`;

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
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
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
