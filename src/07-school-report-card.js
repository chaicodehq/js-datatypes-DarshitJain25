/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here
  if (!student || typeof student !== "object") return null;
  if (typeof student.name !== "string" || student.name === "" || !student.name)
    return null;
  if (
    !student.marks ||
    typeof student.marks !== "object" ||
    Object.keys(student.marks).length === 0
  )
    return null;
  const score = Object.values(student.marks);
  if (score.some((ele) => typeof ele !== "number" || ele < 0 || ele > 100))
    return null;
  const totalMarks = Object.values(score).reduce((sum, it) => sum + it, 0);

  const percentage = parseFloat(
    ((totalMarks / (score.length * 100)) * 100).toFixed(2),
  );

  const subWithMarks = Object.entries(student.marks);

  const minimumMarks = Math.min(...score);
  const maximumMarks = Math.max(...score);
  // const highestSubjectWithMarks = subWithMarks.filter((it) =>
  //   it.includes(Math.max(...score)),
  // ); // Here ,using Math.max(...score) inside filter makes it run for each element iteration again and again
  const highestSubjectWithMarks = subWithMarks.filter((it) =>
    it.includes(maximumMarks),
  ); // Here ,using Math.max(...score) inside filter makes it run for each element iteration again and again
  const highestSubject = highestSubjectWithMarks[0]?.[0]; // check for empty array returned by filter

  // const lowestSubjectWithMarks = subWithMarks.filter((it) =>
  //   it.includes(Math.min(...score)),
  // ); // Here ,using Math.min(...score) inside filter makes it run for each element iteration again and again

  const lowestSubjectWithMarks = subWithMarks.filter((it) =>
    it.includes(minimumMarks),
  );
  const lowestSubject = lowestSubjectWithMarks[0]?.[0]; // check for empty returned by filter
  const passedSubjects = subWithMarks
    .filter((x) => x[1] >= 40)
    .map((i) => i[0]);
  const failedSubjects = subWithMarks.filter((x) => x[1] < 40).map((i) => i[0]);
  const subjectCount = score.length;

  const grading = [
    { requiredPercentage: 90, grade: "A+" },
    { requiredPercentage: 80, grade: "A" },
    { requiredPercentage: 70, grade: "B" },
    { requiredPercentage: 60, grade: "C" },
    { requiredPercentage: 40, grade: "D" },
    { requiredPercentage: 0, grade: "F" },
  ];

  const grades = grading.find((x) => percentage >= x.requiredPercentage).grade;

  return {
    name: student.name,
    totalMarks: totalMarks,
    percentage: percentage,
    grade: grades,
    highestSubject: highestSubject,
    lowestSubject: lowestSubject,
    passedSubjects: passedSubjects,
    failedSubjects: failedSubjects,
    subjectCount: subjectCount,
  };
}
