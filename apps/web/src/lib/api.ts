const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export type MapNode = {
  id: string;
  label: string;
  score: number;
  radius: number;
};

export type MapResponse = {
  nodes: MapNode[];
  edges: unknown[];
};

export async function fetchMap(): Promise<MapResponse> {
  const res = await fetch(`${API_URL}/map`);
  if (!res.ok) {
    throw new Error('Failed to load map');
  }
  return res.json();
}

export type CreateNoteInput = {
  topicName: string;
  title?: string;
  content: string;
};

export async function createNote(input: CreateNoteInput) {
  const res = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody?.message || 'Failed to create note');
  }

  return res.json();
}

export async function fetchRecentNotes() {
  const res = await fetch(`${API_URL}/notes`);
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

export async function updateOnboardingState(data: { step: number; profession?: string; goal?: string; interests?: string[] }) {
  const res = await fetch(`${API_URL}/onboarding/state`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update onboarding');
  return res.json();
}

export async function completeOnboarding() {
  const res = await fetch(`${API_URL}/onboarding/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to complete onboarding');
  return res.json();
}

