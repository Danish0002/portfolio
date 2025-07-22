import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        reputation
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

const CONTEST_QUERY = `
  query userContestRankingInfo($username: String!) {
    userContestRankingHistory(username: $username) {
      contest {
        title
      }
      rating
    }
  }
`;

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

export default function LeetCodeCard({ username = 'Danish00z' }) {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ easy: 0, medium: 0, hard: 0 });
  const [contestHistory, setContestHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [profileRes, contestRes] = await Promise.all([
          fetch('../../api/leetcode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: PROFILE_QUERY, variables: { username } }),
          }),
          fetch('../../api/leetcode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: CONTEST_QUERY, variables: { username } }),
          }),
        ]);

        const profileJson = await profileRes.json();
        const contestJson = await contestRes.json();

        const user = profileJson.data?.matchedUser;
        if (!user) throw new Error('User not found');

        setProfile(user.profile);

        const byDiff = user.submitStatsGlobal.acSubmissionNum.reduce(
          (acc, { difficulty, count }) => {
            acc[difficulty.toLowerCase()] = count;
            return acc;
          },
          {}
        );

        setStats({
          easy: byDiff.easy || 0,
          medium: byDiff.medium || 0,
          hard: byDiff.hard || 0,
        });

        const maxContests = 20;
        const history = contestJson.data?.userContestRankingHistory
          ?.filter(d => d.rating !== null)
          ?.map((entry, i) => ({
            name: `C${i + 1}`,
            rating: Math.round(entry.rating),
          }))
          ?.slice(-maxContests) || [];

        setContestHistory(history);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  const totalSolved = stats.easy + stats.medium + stats.hard;

  if (error) {
    return (
      <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-md">
        <h3 className="text-base font-semibold">Something went wrong 😓</h3>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!profile && !loading) return <div className="p-4">No data</div>;

  return (
    <motion.div
      className="bg-white text-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-xl flex flex-col justify-between"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <header>
        <h2 className="text-xl font-bold text-gray-900 mb-1">LeetCode Profile</h2>
        <p className="text-sm text-gray-500 mb-6">
          {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </p>
      </header>

      <div className="flex flex-wrap justify-between gap-4 flex-grow">
        {/* Solved Problems */}
        <section className="bg-gray-100 rounded-xl p-4 flex-1 min-w-[220px]">
          <p className="text-sm font-semibold text-gray-700 mb-1">Solved Problems</p>
          {loading ? (
            <>
              <SkeletonBox className="h-8 w-24 mb-2" />
              <div className="space-y-4">
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-full" />
              </div>
            </>
          ) : (
            <>
              <p className="text-3xl font-bold text-emerald-500 mb-2">{totalSolved}</p>
              <ul className="text-sm text-gray-600 space-y-2">
                {['easy', 'medium', 'hard'].map(level => (
                  <li key={level} className="capitalize">
                    {level}: {stats[level]}
                    <div className="w-full h-2 bg-gray-300 rounded mt-1">
                      <div
                        className={`h-2 rounded ${
                          level === 'easy'
                            ? 'bg-green-500'
                            : level === 'medium'
                            ? 'bg-yellow-400'
                            : 'bg-red-500'
                        }`}
                        style={{
                          width: `${(stats[level] / totalSolved) * 100 || 0}%`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* Contest Rating Chart */}
        <section className="bg-gray-100 rounded-xl p-4 flex-1 min-w-[220px]">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Contest Rating (Last {contestHistory.length} Contests)
          </p>
          {loading ? (
            <SkeletonBox className="w-full aspect-[4/3]" />
          ) : (
            <div className="w-full aspect-[4/3]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={contestHistory}
                  margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
                >
                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#6B7280' }}
                    angle={-25}
                    textAnchor="end"
                    height={30}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#6B7280' }}
                    domain={['auto', 'auto']}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderColor: '#e5e7eb',
                      fontSize: '0.8rem',
                    }}
                    labelStyle={{ color: '#4B5563' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#facc15"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{
                      r: 5,
                      strokeWidth: 2,
                      fill: '#facc15',
                      stroke: '#fbbf24',
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </div>

      <footer className="flex justify-center mt-6">
        <a
          href={`https://leetcode.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition"
        >
          View LeetCode Profile
        </a>
      </footer>
    </motion.div>
  );
}
