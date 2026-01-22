FROM nginx:alpine

# 复制静态文件到nginx目录
COPY . /usr/share/nginx/html/

# 复制nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3022

CMD ["nginx", "-g", "daemon off;"]
