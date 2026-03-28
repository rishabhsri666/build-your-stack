// src/services/aiService.js

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function analyzeStackWithAI(prompt) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',  // best free model on Groq
      temperature: 0.7,
      max_tokens: 1500,
      messages: [
        {
          role: 'system',
          content: 'You are a senior software architect. Always respond with valid JSON only. No markdown, no explanation outside the JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      err?.error?.message ?? `Groq API error: ${response.status}`
    )
  }

  const data = await response.json()

  const raw = data?.choices?.[0]?.message?.content ?? ''

  if (!raw) throw new Error('Groq returned an empty response. Try again.')

  const clean = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()

  try {
    return JSON.parse(clean)
  } catch {
    throw new Error('AI returned invalid JSON. Try again.')
  }
}