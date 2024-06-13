CREATE DATABASE todos;
CREATE TABLE todo(
    todo_id serial primary key,
    title varchar (255) not null,
    completed boolean default false
);