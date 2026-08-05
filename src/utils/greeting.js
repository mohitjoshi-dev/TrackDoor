export function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      text: "Good Morning",
      emoji: "🌅",
      description:
        "Start your day by keeping your finances on track.",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      text: "Good Afternoon",
      emoji: "☀️",
      description:
        "Keep an eye on your spending throughout the day.",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      text: "Good Evening",
      emoji: "🌇",
      description:
        "Review today's expenses and plan for tomorrow.",
    };
  }

  return {
    text: "Good Night",
    emoji: "🌙",
    description:
      "Wrap up your day with a quick financial check-in.",
  };
}