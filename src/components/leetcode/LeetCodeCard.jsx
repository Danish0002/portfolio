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
          ?.filter(d => d.rating != null)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 h-64">
        <span className="text-gray-500">Loading…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg m-4">
        <h3 className="text-lg font-semibold">Something went wrong 😓</h3>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4 text-gray-600">No data available for this user.</div>
    );
  }

  const totalSolved = stats.easy + stats.medium + stats.hard;
  const progressWidth = levelCount =>
    totalSolved > 0 ? `${((levelCount / totalSolved) * 100).toFixed(1)}%` : '0%';

  return (
    <motion.div
      className="bg-white text-gray-800 rounded-2xl shadow-xl p-6 max-w-xl w-full flex flex-col justify-between min-h-[480px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <header>
        <h2 className="text-xl font-bold text-gray-900">LeetCode Profile</h2>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </p>
      </header>

      <div className="flex flex-wrap gap-4 flex-grow my-4">
        {/* Solved Problems */}
        <div className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[220px]">
          <p className="text-sm font-semibold text-gray-700">Solved Problems</p>
          <p className="text-3xl font-bold text-emerald-500 my-2">{totalSolved}</p>
          <ul className="space-y-3 text-sm text-gray-600">
            {['easy', 'medium', 'hard'].map(level => (
              <li key={level} className="capitalize">
                <div className="flex justify-between">
                  <span>{level}</span>
                  <span>{stats[level]}</span>
                </div>
                <div className="w-full h-2 bg-gray-300 rounded-full mt-1 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      level === 'easy'
                        ? 'bg-green-500'
                        : level === 'medium'
                        ? 'bg-yellow-400'
                        : 'bg-red-500'
                    }`}
                    style={{ width: progressWidth(stats[level]) }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contest Graph */}
        <div className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[220px] flex flex-col justify-between">
          <p className="text-sm font-semibold text-gray-700 mb-2">Contest Rating Graph</p>
          <div className="flex-grow">
            {contestHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={contestHistory} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#4B5563' }}
                    angle={-25}
                    textAnchor="end"
                    height={40}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#4B5563' }} domain={['auto', 'auto']} width={40} />
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
            ) : (
              <p className="text-center text-gray-500 mt-4">No contest data.</p>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <a
          href={`https://leetcode.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition"
        >
          View LeetCode Profile
        </a>
      </div>
    </motion.div>
  );
}
