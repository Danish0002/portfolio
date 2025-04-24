export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    try {
      // Forward the request to LeetCode GraphQL API
      const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
  
      // Get the JSON data from LeetCode
      const data = await response.json();
  
      // Send the data back to the frontend
      res.status(200).json(data);
    } catch (error) {
      // Handle any errors
      res.status(500).json({ error: 'Failed to fetch from LeetCode' });
    }
  }
  