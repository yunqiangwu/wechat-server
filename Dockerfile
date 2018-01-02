FROM node
MAINTAINER qiangyun.wu 842269153@qq.com

RUN npm install cnpm -g --registry=https://registry.npm.taobao.org
RUN cnpm i -g npm
# RUN yarn config set registry https://registry.npm.taobao.org

COPY ./src/ /workspace/src/
COPY ./public/ /workspace/public/
COPY ./.babelrc /workspace/
COPY ./package.json /workspace/
WORKDIR /workspace/

RUN cnpm i
# RUN ls -la
EXPOSE 3000
CMD ["npm", "start"]
