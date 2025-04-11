


// 🔢 Problem 1: Sort Jobs by Applied Date (latest first or oldest first)
export function sortJobsByDate(jobs, order = "latest") {
    return [...jobs].sort((a, b) => {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);
      return order === "latest" ? dateB - dateA : dateA - dateB;
    });
  }
  
  
  
  // 🔁 Problem 2: Status Frequency Counter


export default function getStatusCounts(jobs) {
    const counts = {};
    for (const job of jobs) {
      const status = job.status;
      if (status) {
        counts[status] = (counts[status] || 0) + 1;
      }
    }
    return counts;
  }
  
// 🔍 Problem 3: Detect Duplicate Applications (by company + role, case-insensitive)


export default function detectDuplicateApplications(jobs) {
  const seen = new Set();

  for (const job of jobs) {
    const key = `${job.company?.toLowerCase().trim()}|${job.role
      ?.toLowerCase()
      .trim()}`;
    if (seen.has(key)) {
      return true;
    }
    seen.add(key);
  }

  return false;
}



  