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
