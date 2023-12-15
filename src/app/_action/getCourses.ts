import { Course } from "@/types"

export default async function getCourses() {
  const courses: Array<Course> = [
    {
      id: "P6gTAB0dohA",
      title: "Civil 3D Basic Training",
      url: "https://youtu.be/P6gTAB0dohA",
      materials: [
        {
          url: "https://globalkomatsu.box.com/s/2066c5i19tns117d5vkndgpehgpd9vl7",
        },
      ],
    },
    {
      id: "21uLZk-t-jM",
      title: "Part 1 - About Feature Line",
      url: "https://youtu.be/21uLZk-t-jM",
      materials: [
        {
          url: "https://globalkomatsu.box.com/s/f46kdyym7rgwrlok4fop2064941jvwkn",
        },
      ],
    },
    {
      id: "wasK4iW051I",
      title: "Part 2 - About Road Assembly and Sub-assembly",
      url: "https://youtu.be/wasK4iW051I",
      materials: [
        {
          url: "https://globalkomatsu.box.com/s/0p7upoch69624kg6fwf030joej8vdv16",
        },
      ],
    },
    {
      id: "VTm5I_46jqM",
      title: "Part 3 - About Corridors",
      url: "https://youtu.be/VTm5I_46jqM",
      materials: [
        {
          url: "https://globalkomatsu.box.com/s/1hzrwtvw7eymof0s43xwtb1ev8fkd879",
        },
      ],
    },
    {
      id: "2RLunaf-Wko",
      title: "Part 4 - Explode",
      url: "https://youtu.be/2RLunaf-Wko",
      materials: [
        {
          url: "https://globalkomatsu.box.com/s/g9994okjasv6t5uddgueuvj3q96050ai",
        },
      ],
    },
    {
      id: "Ra3OJYW1LWA",
      title: "Part 5 - Cleaning up drawing",
      url: "https://youtu.be/Ra3OJYW1LWA",
      materials: [
        {
          url: "https://globalkomatsu.box.com/s/uqf0nun2wjteffjn39mrodarrmgbtt4k",
        },
      ],
    },
    {
      id: "tdVZs4M5dS8",
      title: "Part 6 - TIN Surface",
      url: "https://youtu.be/tdVZs4M5dS8",
      materials: [
        {
          url: "https://globalkomatsu.box.com/s/njvy5kvu996vsoq79qco1z0w5h2eodfa",
        },
      ],
    },
  ]
  return courses
}
