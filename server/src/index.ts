// server/src/index.ts
import express from 'express';
import { Group } from './types';

const app = express();
const port = 3000;

// Sample data
const groups: Group[] = [
  {
    label: 'Group 1',
    pictures: [
      { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
      { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
      // Add more pictures as needed
    ],
  },
  {
    label: 'Group 2',
    pictures: [
      { src: 'https://via.placeholder.com/200', caption: 'Caption 3' },
      { src: 'https://via.placeholder.com/200', caption: 'Caption 4' },
      // Add more pictures as needed
    ],
  },
];

app.use(express.json());

app.get('/api/groups', (req, res) => {
  res.json(groups);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
