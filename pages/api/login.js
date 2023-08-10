import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method not allowed
  }

  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/signin', req.body);
    const token = response.data.token; // Assuming your server returns the JWT
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Login failed' });
  }
}