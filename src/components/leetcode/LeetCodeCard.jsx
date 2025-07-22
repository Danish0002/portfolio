import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import axios from "axios";

// Placeholder skeleton loader
const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Framer motion animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const LeetCodeCard = () => {
  const [userData, setUserData] = useState(null);
  const [contestHistory, setContestHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = "Danish00z"; 

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const response = await axios.post("https://leetcode.com/graphql", {
          query: `
            query getUserProfile($username: String!) {
              allQuestionsCount {
                difficulty
                count
              }
              matchedUser(username: $username) {
                username
                profile {
                  ranking
                }
                submitStatsGlobal {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
              userContestRankingHistory(username: $username) {
                contest {
                  title
                }
                rating
              }
            }
          `,
          variables: { username },
        });

        const data = response.data.data;

        const stats = data.matchedUser.submitStatsGlobal.acSubmissionNum;
        const getCount = (diff) => stats.find((q) => q.difficulty === diff)?.count || 0;

        setUserData({
          ranking: data.matchedUser.profile.ranking || "N/A",
          totalSolved: getCount("All"),
          easySolved: getCount("Easy"),
          mediumSolved: getCount("Medium"),
          hardSolved: getCount("Hard"),
        });

        const history = data.userContestRankingHistory.map((entry, i) => ({
          name: entry.contest.title || `Contest ${i + 1}`,
          rating: entry.rating,
        }));

        setContestHistory(history);
        setLoading(false);
      } catch (error) {
        console.error("LeetCode API error:", error);
        setLoading(false);
      }
    };

    fetchLeetCodeData();
  }, []);

  if (!userData) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-[400px] aspect-[4/5] rounded-2xl bg-white shadow-lg overflow-hidden flex flex-col justify-between p-4"
      >
        <SkeletonBox className="w-full h-full" />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full max-w-[400px] aspect-[4/5] rounded-2xl bg-white shadow-lg overflow-hidden flex flex-col justify-between p-4"
    >
      {/* Header and Stats */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">LeetCode Stats</h2>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <div>
            <p className="font-medium">Ranking</p>
            <p>{userData.ranking}</p>
          </div>
          <div>
            <p className="font-medium">Total Solved</p>
            <p>{userData.totalSolved}</p>
          </div>
          <div>
            <p className="font-medium">Easy</p>
            <p>{userData.easySolved}</p>
          </div>
          <div>
            <p className="font-medium">Medium</p>
            <p>{userData.mediumSolved}</p>
          </div>
          <div>
            <p className="font-medium">Hard</p>
            <p>{userData.hardSolved}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4 h-[40%] min-h-[140px]">
        <p className="text-sm font-semibold text-gray-700 mb-2">Contest Rating Graph</p>
        {loading ? (
          <SkeletonBox className="w-full h-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={contestHistory}
              margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
            >
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#4B5563" }}
                angle={-25}
                textAnchor="end"
                height={40}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#4B5563" }}
                domain={["auto", "auto"]}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderColor: "#d1d5db",
                  fontSize: "0.8rem",
                }}
                labelStyle={{ color: "#6b7280" }}
                cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#FFA116"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                  fill: "#FACC15",
                  stroke: "#FBBF24",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default LeetCodeCard;
