CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes numeric DEFAULT 0,
);

insert into blogs (url, title) values ('url1', 'Relational databases rule the world');
insert into blogs (url, title) values ('url2', 'MongoDB is webscale');
