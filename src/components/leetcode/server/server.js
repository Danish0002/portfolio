const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/leetcode', async (req, res) => {
  const { username } = req.body;

  try {
    const response = await axios.post(
      'https://leetcode.com/graphql',
      {
        operationName: 'userProfileCalendar',
        variables: { username },
        query: `
          query userProfileCalendar($username: String!) {
            matchedUser(username: $username) {
              userCalendar {
                activeYears
                submissionCalendar
              }
            }
          }
        `
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from LeetCode' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});


