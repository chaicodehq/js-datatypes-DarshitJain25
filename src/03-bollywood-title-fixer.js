/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {
  // Your code here
  if (typeof title !== "string") return "";
  let trimmedTitle = title.trim();
  if (trimmedTitle === "") return "";

  trimmedTitle = trimmedTitle.replace(/\s+/g, " ");
  const titleArray = trimmedTitle.split(" ");
  let index = 0;
  const modified = titleArray.map((it) => {
    if (
      index !== 0 &&
      (it === "ka" ||
        it === "ki" ||
        it === "ke" ||
        it === "se" ||
        it === "aur" ||
        it === "ya" ||
        it === "the" ||
        it === "of" ||
        it === "in" ||
        it === "a" ||
        it === "an")
    ) {
      it = it.toLowerCase();
    } else {
      it = it.charAt(0).toUpperCase() + it.slice(1).toLowerCase();
    }
    index++;
    return it;
  });
  return `${modified.join(" ")}`;
}
