FROM node:8.11.2
RUN npm rebuild
RUN mkdir /var/www
WORKDIR /var/www
ADD package.json /var/www/package.json
# RUN npm i yarn
ADD start.sh /var/www
ENTRYPOINT ["/bin/bash", "start.sh"]