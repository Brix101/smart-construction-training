import { Course } from "@/types"

export default async function getCourses() {
  const courses: Array<Course> = [
    {
      id: "P6gTAB0dohA",
      title: "Civil 3D Basic Training",
      url: "https://youtu.be/P6gTAB0dohA",
    },
    {
      id: "21uLZk-t-jM",
      title: "Part 1 - About Feature Line",
      url: "https://youtu.be/21uLZk-t-jM",
    },
    {
      id: "VTm5I_46jqM",
      title: "Part 2 - About Road Assembly and Sub-assembly",
      url: "https://youtu.be/VTm5I_46jqM",
    },
    {
      id: "VTm5I_46jqM",
      title: "Part 3 - About Corridors",
      url: "https://youtu.be/VTm5I_46jqM",
    },
    {
      id: "2RLunaf-Wko",
      title: "Part 4 - Explode",
      url: "https://youtu.be/2RLunaf-Wko",
    },
    {
      id: "Ra3OJYW1LWA",
      title: "Part 5 - Cleaning up drawing",
      url: "https://youtu.be/Ra3OJYW1LWA",
    },
    {
      id: "tdVZs4M5dS8",
      title: "Part 6 - TIN Surface",
      url: "https://youtu.be/tdVZs4M5dS8",
    },
  ]
  return courses
}
