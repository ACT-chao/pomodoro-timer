```markdown
# 番茄钟计时器

一个使用 React 和 Material-UI 构建的简洁番茄工作法计时器应用。

## 功能特点

- ⏰ 25分钟工作时间 + 5分钟休息时间
- 🎯 简洁直观的圆形进度条显示
- ⏯️ 开始/暂停功能
- 🔄 重置当前时间段
- 📊 记录已完成的工作时间段数量
- 🎨 清新现代的界面设计

## 技术栈

- React
- Material-UI (MUI)
- Vite

## 安装步骤

1. 克隆项目到本地
```bash
git clone [项目地址]
```

2. 进入项目目录
```bash
cd pomodoro-timer
```

3. 安装依赖
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

4. 启动开发服务器
```bash
npm run dev
```

5. 在浏览器中打开 `http://localhost:5173` 查看应用

## 项目结构

```
pomodoro-timer/
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── main.jsx         # 应用入口
│   └── index.css        # 全局样式
├── index.html
└── package.json
```

## 自定义配置

可以在 `App.jsx` 中修改以下常量来调整时间设置：

```javascript
const WORK_TIME = 25 * 60;  // 工作时间（秒）
const BREAK_TIME = 5 * 60;  // 休息时间（秒）
```

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

MIT

---

如有任何问题或建议，欢迎提出 Issue 或联系作者。
```
