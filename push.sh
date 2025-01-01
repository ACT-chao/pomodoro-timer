#!/bin/bash

echo "正在准备提交代码到 GitHub..."

# 添加所有更改的文件
git add .

# 获取提交信息
read -p "请输入提交信息 (直接回车默认为 'update'): " commit_msg
commit_msg=${commit_msg:-update}

# 提交代码
git commit -m "$commit_msg"

# 推送到远程仓库
git push origin main

echo "代码已成功推送到 GitHub！" 