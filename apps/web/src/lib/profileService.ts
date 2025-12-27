import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export interface OnboardingData {
    profession: string;
    name: string;
    bio: string;
    experience: string;
    skills: string;
    goal: string;
    interests: string[];
}

export interface GeneratedProfile {
    summary: string;
    personalizedGreeting: string;
    suggestedTopics: string[];
    careerPathAdvice: string;
    mindsetQuote: string;
}

export async function generateProfile(data: OnboardingData): Promise<GeneratedProfile> {
    if (!genAI) {
        // Return high-quality mock if no API key
        return mockGenerateProfile(data);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
      Based on the following user onboarding data for a note-taking and mind-mapping app called "Neuro Notes", 
      generate a personalized profile.
      
      User Data:
      - Name: ${data.name}
      - Profession: ${data.profession}
      - Bio: ${data.bio}
      - Experience: ${data.experience}
      - Skills: ${data.skills}
      - Goal: ${data.goal}
      - Interests: ${data.interests.join(", ")}
      
      Please provide the output in JSON format with the following keys:
      - summary: A 2-sentence professional summary.
      - personalizedGreeting: A friendly, personalized welcome message.
      - suggestedTopics: A list of 5 specific topics they should explore in the app.
      - careerPathAdvice: A short piece of advice (30-50 words) based on their background and goals.
      - mindsetQuote: An inspiring quote that fits their profile.
      
      Respond only with the JSON.
    `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return JSON.parse(text.replace(/```json|```/g, "").trim());
    } catch (error) {
        console.error("Gemini generation failed, falling back to mock:", error);
        return mockGenerateProfile(data);
    }
}

function mockGenerateProfile(data: OnboardingData): GeneratedProfile {
    return {
        summary: `${data.name} is a ${data.profession} focused on ${data.goal}. With experience in ${data.experience}, they bring a unique perspective to ${data.interests[0] || 'their field'}.`,
        personalizedGreeting: `Welcome, ${data.name.split(' ')[0]}! We've prepared your neural workspace to align with your background in ${data.profession}.`,
        suggestedTopics: [
            ...data.interests,
            "Self-Directed Learning",
            "System Thinking",
            "Knowledge Synthesis",
            "Creative Problem Solving"
        ].slice(0, 5),
        careerPathAdvice: `Given your ${data.experience} and skills in ${data.skills}, you are well-positioned to bridge the gap between ${data.interests[0] || 'theory'} and practice. Focus on deepening your expertise in ${data.interests[1] || 'emerging trends'} while leveraging your unique background.`,
        mindsetQuote: "The beauty of a living mind map is that it grows exactly as you do—organically, limitlessly."
    };
}
