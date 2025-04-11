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
