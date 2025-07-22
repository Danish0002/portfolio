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
        const contestHistory = contestJson.data?.userContestRankingHistory
          ?.filter(d => d.rating !== null)
          ?.map((entry, index) => ({
            name: `C${index + 1}`,
            rating: Math.round(entry.rating),
          }))
          ?.slice(-maxContests) || [];

        setContestHistory(contestHistory);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  if (error)
    return (
      <div className="text-red-500 p-4">
        <h3 className="text-lg font-semibold">Something went wrong </h3>
        <p>{error}</p>
      </div>
    );
  if (!profile && !loading) return <div className="p-4">No data</div>;

  const totalSolved = stats.easy + stats.medium + stats.hard;

  return (
    <motion.div
      className="bg-white text-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-xl flex flex-col justify-between h-[480px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-1">LeetCode Profile</h2>
      <p className="text-sm text-gray-500 mb-6">
        {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
      </p>

      <div className="flex flex-wrap justify-between gap-4 flex-grow">
        {/* Solved Problems Box */}
        <div className="bg-gray-100 rounded-xl p-4 flex-1 min-w-[220px]">
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
                        style={{ width: `${(stats[level] / totalSolved) * 100 || 0}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Contest Rating Chart Box */}
        <div className="bg-gray-100 rounded-xl p-4 flex-1 min-w-[220px] flex flex-col justify-between">
          <p className="text-sm font-semibold text-gray-700 mb-2">Contest Rating Graph</p>
          {loading ? (
            <SkeletonBox className="w-full h-40" />
          ) : (
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={contestHistory}
                  margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
                >
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#4B5563' }}
                    angle={-25}
                    textAnchor="end"
                    height={40}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#4B5563' }}
                    domain={['auto', 'auto']}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#d1d5db', fontSize: '0.8rem' }}
                    labelStyle={{ color: '#6b7280' }}
                    cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#FFA116"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5, strokeWidth: 2, fill: '#FACC15', stroke: '#FBBF24' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <a
          href={`https://leetcode.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition"
        >
          View LeetCode Profile
        </a>
      </div>
    </motion.div>
  );
}
