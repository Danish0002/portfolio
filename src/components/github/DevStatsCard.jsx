import React, { useEffect, useState } from 'react';
import './DevStatsCard.css';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Github } from 'lucide-react';

const DevStatsCard = ({ username = "Danish0002" }) => {
  const [repos, setRepos] = useState([]);
  const [commitsByDay, setCommitsByDay] = useState(Array(7).fill(0));

  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = GITHUB_TOKEN
    ? {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      }
    : {};

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [repoRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }),
          fetch(`https://api.github.com/users/${username}/events/public`, { headers })
        ]);

        if (!repoRes.ok || !eventsRes.ok) {
          throw new Error(`GitHub API returned status ${repoRes.status} / ${eventsRes.status}`);
        }

        const repoData = await repoRes.json();
        const eventsData = await eventsRes.json();

        if (Array.isArray(repoData)) setRepos(repoData);
        else console.error("Repos data is not an array", repoData);

        if (Array.isArray(eventsData)) {
          const commitEvents = eventsData.filter(e => e.type === 'PushEvent');
          const dayCommitMap = Array(7).fill(0);

          commitEvents.forEach(event => {
            const day = new Date(event.created_at).getDay();
            dayCommitMap[day] += event.payload?.commits?.length || 0;
          });

          setCommitsByDay(dayCommitMap);
        } else {
          console.error("Events data is not an array", eventsData);
        }
      } catch (error) {
        console.error("GitHub API Error:", error);
      }
    };

    fetchGitHubData();
  }, [username]);

  const totalProjects = repos.length;

  const topRepos = Array.isArray(repos)
    ? repos
        .slice()
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 3)
        .map(repo => repo.name)
    : [];

  const totalCommits = commitsByDay.reduce((a, b) => a + b, 0);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const chartData = commitsByDay.map((count, index) => ({
    day: dayNames[index],
    commits: count
  }));

  return (
    <motion.div
      className="dev-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="dev-card-title">GitHub Monthly Activity</h2>
      <p className="dev-card-subtitle">
        {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
      </p>

      <div className="dev-section">
        <div className="dev-box">
          <p className="dev-label">Total Projects</p>
          <p className="dev-value">{totalProjects}</p>
          <ul className="dev-list">
            {topRepos.map((name, index) => (
              <li key={index}>• {name}</li>
            ))}
          </ul>
        </div>

        <div className="dev-box">
          <p className="dev-label">Total Commits</p>
          <p className="dev-value green">{totalCommits}</p>
          <div className="dev-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="day" />
                <Tooltip />
                <Bar dataKey="commits" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="dev-footer center">
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
          <button className="btn github-btn">
            <Github size={16} style={{ marginRight: '8px' }} /> View GitHub Profile
          </button>
        </a>
      </div>
    </motion.div>
  );
};

export default DevStatsCard;
