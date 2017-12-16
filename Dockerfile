FROM node
MAINTAINER qiangyun.wu 842269153@qq.com

RUN npm install cnpm -g --registry=https://registry.npm.taobao.org
# RUN npm install -g yarn --registry=https://registry.npm.taobao.org
# RUN yarn config set registry https://registry.npm.taobao.org

COPY ./src/ /workspace/src/
COPY ./.babelrc /workspace/
COPY ./package.json /workspace/
WORKDIR /workspace/

RUN cnpm i
# RUN ls -la
EXPOSE 3000
CMD ["npm", "start"]
