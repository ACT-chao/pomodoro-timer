@echo off
chcp 65001
echo 正在准备提交代码到 GitHub...

:: 添加所有更改的文件
git add .

:: 获取提交信息
set /p commit_msg="请输入提交信息 (直接回车默认为 'update'): "
if "%commit_msg%"=="" set commit_msg=update

:: 提交代码
git commit -m "%commit_msg%"

:: 推送到远程仓库
git push origin main

echo 代码已成功推送到 GitHub！
pause 