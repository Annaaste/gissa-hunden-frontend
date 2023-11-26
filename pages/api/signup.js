import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method not allowed
  }

  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/signup', req.body);
    const token = response.data.token;
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Signup failed' });
  }
}