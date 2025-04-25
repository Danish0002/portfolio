import React, { useEffect, useState } from 'react';
import './DevStatsCard.css';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell
} from 'recharts';
import { Github } from 'lucide-react';

const DevStatsCard = ({ username = "Danish0002" }) => {
  const [totalRepos, setTotalRepos] = useState(0);
  const [topRepos, setTopRepos] = useState([]);
  const [chartData, setChartData] = useState([]);
  const token = import.meta.env.GITHUB_TOKEN;

  // Compute ISO dates for last 7 days (oldest → newest)
  const dates = React.useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      return d.toISOString().slice(0, 10);
    });
  }, []);

  useEffect(() => {
    if (!token) {
      console.error("Missing VITE_GITHUB_TOKEN");
      return;
    }

    const query = `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          repositories {
            totalCount
          }
          topRepos: repositories(first: 3, orderBy: {field: STARGAZERS, direction: DESC}) {
            nodes { name }
          }
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      login: username,
      from: `${dates[0]}T00:00:00Z`,
      to: `${dates[6]}T23:59:59Z`
    };

    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, variables })
    })
      .then(res => res.json())
      .then(json => {
        const user = json.data.user;
        // total repos
        setTotalRepos(user.repositories.totalCount);
        // top 3 by stars
        setTopRepos(user.topRepos.nodes.map(r => r.name));

        // flatten the weeks → days, filter only our 7 dates
        const days = user.contributionsCollection.contributionCalendar.weeks
          .flatMap(w => w.contributionDays)
          .filter(d => dates.includes(d.date));

        // map into [{date: 'Apr 19', commits: number}, ...]
        const cd = dates.map(d => {
          const day = days.find(x => x.date === d);
          return {
            date: new Date(d).toLocaleDateString("default", {
              month: "short",
              day: "numeric"
            }),
            commits: day ? day.contributionCount : 0
          };
        });

        console.log("weekly chartData:", cd);
        setChartData(cd);
      })
      .catch(err => console.error("GraphQL fetch error:", err));
  }, [username, token, dates]);

  const totalCommits = chartData.reduce((sum, { commits }) => sum + commits, 0);

  return (
    <motion.div
      className="dev-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="dev-card-title">GitHub Weekly Activity</h2>
      <p className="dev-card-subtitle">
        {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
      </p>

      <div className="dev-section">
        <div className="dev-box">
          <p className="dev-label">Total Repositories</p>
          <p className="dev-value">{totalRepos}</p>
          <ul className="dev-list">
            {topRepos.map((name, idx) => (
              <li key={idx}>• {name}</li>
            ))}
          </ul>
        </div>

        <div className="dev-box">
          <p className="dev-label">Commits (Past 7 Days)</p>
          <p className="dev-value green">{totalCommits}</p>
          <div className="dev-chart">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={v => [`${v} commit${v === 1 ? '' : 's'}`, '']}
                  cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                />
                <Bar dataKey="commits" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.commits === 0 ? '#d1d5db' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="dev-footer center">
        <a
          className="btn github-btn"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} style={{ marginRight: '8px' }} />
          View GitHub Profile
        </a>
      </div>
    </motion.div>
  );
};

export default DevStatsCard;
