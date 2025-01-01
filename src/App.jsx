import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './theme';
import TaskList from './components/TaskList';
import Statistics from './components/Statistics';
import { initializeNotifications, sendNotification } from './utils/notifications';

// 常量定义
const DEFAULT_SETTINGS = {
  workTime: 25,
  breakTime: 5,
  longBreakTime: 15,
  sessionsBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  notifications: true
};

// 样式组件
const TimerContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  maxWidth: '400px',
  width: '100%',
}));

// 设置对话框组件
const SettingsDialog = ({ open, onClose, settings, onSave }) => {
  const [tempSettings, setTempSettings] = useState(settings);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>设置</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="工作时长（分钟）"
            type="number"
            value={tempSettings.workTime}
            onChange={(e) => setTempSettings({
              ...tempSettings,
              workTime: Math.max(1, parseInt(e.target.value) || 1)
            })}
          />
          <TextField
            label="休息时长（分钟）"
            type="number"
            value={tempSettings.breakTime}
            onChange={(e) => setTempSettings({
              ...tempSettings,
              breakTime: Math.max(1, parseInt(e.target.value) || 1)
            })}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={() => {
          onSave(tempSettings);
          onClose();
        }}>保存</Button>
      </DialogActions>
    </Dialog>
  );
};

function App() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [timeLeft, setTimeLeft] = useState(settings.workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const [openSettings, setOpenSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    initializeNotifications();
    // 从 localStorage 加载设置
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // 保存设置到 localStorage
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(isWorking ? settings.workTime * 60 : settings.breakTime * 60);
  };

  const handleTimerEnd = () => {
    setIsActive(false);
    if (isWorking) {
      setCompletedCount((prev) => prev + 1);
    }
    setIsWorking(!isWorking);
    setTimeLeft(isWorking ? settings.breakTime * 60 : settings.workTime * 60);
    sendNotification(
      isWorking ? "休息时间到！" : "工作时间到！",
      {
        body: isWorking ? "该休息一下了" : "开始新的工作吧",
        icon: "/icon.png"
      }
    );
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p: 3,
        minHeight: '100vh'
      }}>
        <TimerContainer>
          <Typography variant="h4" gutterBottom>
            {isWorking ? '工作时间' : '休息时间'}
          </Typography>
          <CircularProgress
            variant="determinate"
            value={(timeLeft / (isWorking ? settings.workTime * 60 : settings.breakTime * 60)) * 100}
            size={200}
            thickness={2}
            sx={{ mb: 4 }}
          />
          <Typography variant="h2" gutterBottom>
            {formatTime(timeLeft)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
            <Button
              variant="contained"
              onClick={handleStartPause}
            >
              {isActive ? '暂停' : '开始'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
            >
              重置
            </Button>
          </Box>
          <Typography variant="subtitle1">
            已完成: {completedCount} 个番茄钟
          </Typography>
        </TimerContainer>

        <Box sx={{ mt: 4, width: '100%', maxWidth: '400px' }}>
          <TaskList />
        </Box>

        <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          <IconButton 
            onClick={() => setOpenSettings(true)}
            color="primary"
          >
            <SettingsIcon />
          </IconButton>
        </Box>

        <SettingsDialog 
          open={openSettings}
          onClose={() => setOpenSettings(false)}
          settings={settings}
          onSave={setSettings}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
