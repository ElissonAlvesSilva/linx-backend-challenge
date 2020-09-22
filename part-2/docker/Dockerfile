FROM ruby:2.6.4-alpine3.9

RUN apk update && apk upgrade && apk add curl wget bash

RUN apk add ruby ruby-bundler

RUN rm -rf /var/cache/apk/*

RUN mkdir /usr/app

WORKDIR /usr/app/

COPY Gemfile /usr/app/

RUN gem install bundler

RUN bundle install

ADD url-aggregator-api.rb /usr/app

EXPOSE 4567

CMD ["bundle", "exec", "ruby", "url-aggregator-api.rb"]
