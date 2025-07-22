import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { Github } from 'lucide-react';

// Simple skeleton loader
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const DevStatsCard = ({ username = "Danish0002" }) => {
  const [totalRepos, setTotalRepos] = useState(0);
  const [topRepos, setTopRepos] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const dates = useMemo(() => {
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
          repositories { totalCount }
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
      to: `${dates[6]}T23:59:59Z`,
    };

    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    })
      .then(res => res.json())
      .then(json => {
        const user = json.data.user;
        setTotalRepos(user.repositories.totalCount);
        setTopRepos(user.topRepos.nodes.map(r => r.name));

        const days = user.contributionsCollection.contributionCalendar.weeks
          .flatMap(w => w.contributionDays)
          .filter(d => dates.includes(d.date));

        const cd = dates.map(d => {
          const day = days.find(x => x.date === d);
          return {
            date: new Date(d).toLocaleDateString("default", {
              month: "short",
              day: "numeric",
            }),
            commits: day ? day.contributionCount : 0,
          };
        });

        setChartData(cd);
        setLoading(false);
      })
      .catch(err => {
        console.error("GraphQL fetch error:", err);
        setLoading(false);
      });
  }, [username, token, dates]);

  const totalCommits = chartData.reduce((sum, { commits }) => sum + commits, 0);

  return (
    <motion.div
      className="bg-white text-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-xl flex flex-col justify-between"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <header>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          GitHub Weekly Activity
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {new Date().toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </header>

      <div className="flex flex-wrap justify-between gap-4 flex-grow">
        <section className="bg-gray-100 rounded-xl p-4 flex-1 min-w-[220px]">
          <p className="text-sm font-semibold text-gray-700 mb-1">Total Repositories</p>
          {loading ? (
            <>
              <SkeletonBox className="h-8 w-20 mb-2" />
              <div className="space-y-1">
                <SkeletonBox className="h-4 w-32" />
                <SkeletonBox className="h-4 w-24" />
                <SkeletonBox className="h-4 w-28" />
              </div>
            </>
          ) : (
            <>
              <p className="text-3xl font-bold mb-2">{totalRepos}</p>
              <ul className="text-sm text-gray-600 list-none space-y-1">
                {topRepos.map((name, idx) => (
                  <li key={idx}>• {name}</li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section className="bg-gray-100 rounded-xl p-4 flex-1 min-w-[220px]">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Commits (Past 7 Days)
          </p>
          {loading ? (
            <>
              <SkeletonBox className="h-8 w-20 mb-2" />
              <SkeletonBox className="w-full aspect-[4/3]" />
            </>
          ) : (
            <>
              <p className="text-3xl font-bold text-emerald-500 mb-2">
                {totalCommits}
              </p>
              <div className="w-full aspect-[4/3]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={v => [`${v} commit${v === 1 ? '' : 's'}`, '']}
                      cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                    />
                    <Bar dataKey="commits" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, i) => (
                        <Cell
                          key={i}
                          fill={entry.commits === 0 ? '#d1d5db' : '#10B981'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </section>
      </div>

      <footer className="flex justify-center mt-6">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 text-white px-5 py-2 rounded-lg flex items-center text-sm font-semibold hover:bg-gray-800 transition"
        >
          <Github size={16} className="mr-2" />
          View GitHub Profile
        </a>
      </footer>
    </motion.div>
  );
};

export default DevStatsCard;
