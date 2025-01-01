import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography
} from '@mui/material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false
      }]);
      setNewTask('');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>任务列表</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          size="small"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="添加新任务"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button variant="contained" onClick={addTask}>
          添加
        </Button>
      </Box>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText primary={task.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList; 