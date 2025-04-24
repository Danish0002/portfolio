import { useEffect, useState } from 'react';
import './LeetCodeCard.css';
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
          fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: PROFILE_QUERY, variables: { username } }),
          }),
          fetch('/graphql', {
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

  if (loading) return <div className="leetcode-card">Loading…</div>;
  if (error) return (
    <div className="leetcode-card error">
      <h3>Something went wrong 😓</h3>
      <p>{error}</p>
    </div>
  );
  if (!profile) return <div className="leetcode-card">No data</div>;

  const totalSolved = stats.easy + stats.medium + stats.hard;

  return (
    <motion.div
      className="leetcode-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="card-title">LeetCode Profile</h2>
      <p className="card-subtitle">
        {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
      </p>

      <div className="leetcode-section">
        <div className="leetcode-box">
          <p className="card-label">Solved Problems</p>
          <p className="card-value green">{totalSolved}</p>
          <ul className="card-list">
            {['easy', 'medium', 'hard'].map(level => (
              <li key={level} className={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}: {stats[level]}
                <div className="progress-bar">
                  <div
                    className="bar"
                    style={{
                      width: totalSolved > 0 ? `${(stats[level] / totalSolved) * 100}%` : '0%',
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="leetcode-box">
          <p className="card-label">Contest Rating Graph</p>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={contestHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 8 }} angle={-25} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rating" stroke="#FFA116" strokeWidth={1} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <a href={`https://leetcode.com/${username}`} target="_blank" rel="noopener noreferrer">
          <button className="btn">View LeetCode Profile</button>
        </a>
      </div>
    </motion.div>
  );
}
