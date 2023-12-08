type Course = {
  id: Number
  title: string
  url: string
}

export async function GET() {
  const courses: Array<Course> = [
    {
      id: 1,
      title: "Civil 3D Basic Training",
      url: "https://youtu.be/P6gTAB0dohA",
    },
    {
      id: 2,
      title: "Part 1 - About Feature Line",
      url: "https://youtu.be/21uLZk-t-jM",
    },
    {
      id: 3,
      title: "Part 2 - About Road Assembly and Sub-assembly",
      url: "https://youtu.be/VTm5I_46jqM",
    },
    {
      id: 4,
      title: "Part 3 - About Corridors",
      url: "https://youtu.be/VTm5I_46jqM",
    },
    {
      id: 5,
      title: "Part 4 - Explode",
      url: "https://youtu.be/2RLunaf-Wko",
    },
    {
      id: 6,
      title: "Part 5 - Cleaning up drawing",
      url: "https://youtu.be/2RLunaf-Wko",
    },
    {
      id: 6,
      title: "Part 5 - Cleaning up drawing",
      url: "https://youtu.be/tdVZs4M5dS8",
    },
  ]

  return Response.json({ courses })
}
