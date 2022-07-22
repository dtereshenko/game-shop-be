create table products (
id uuid not null default uuid_generate_v4() primary key,
title text not null,
description text,
price integer
)



create table stocks (
product_id uuid not null references products(id),
count integer
)


create extension if not exists "uuid-ossp";


/*
 * Fulfill the products table with the data
 */
insert into products (title, description, price) values ('The Last of Us', 'Description', 10);
insert into products (title, description, price) values ('The Last of Us Part 2', 'Description', 10);
insert into products (title, description, price) values ('Horizon Zero Dawn', 'Description', 30);
insert into products (title, description, price) values ('Horizon Forbidden West', 'Description', 30);
insert into products (title, description, price) values ('Speed Racing III', 'Description', 12);
insert into products (title, description, price) values ('The God of War', 'Description', 25);
insert into products (title, description, price) values ('Games of Throne', 'Description', 10);
insert into products (title, description, price) values ('Far Cry 3', 'Description', 10);
insert into products (title, description, price) values ('Far Cry 5', 'Description', 30);
insert into products (title, description, price) values ('Far Cry 6', 'Description', 30);


/*
 * Fulfill the stocks table with the data referenced to products
 */
insert into stocks (product_id, count) values ('b2cba874-a24a-4052-8755-b76cc9dabbe4', 10);
insert into stocks (product_id, count) values ('f384da40-ad75-4605-89f0-a2d5457fe912', 10);
insert into stocks (product_id, count) values ('822cfd65-5b2d-4628-a6ba-423a94f82719', 10);
insert into stocks (product_id, count) values ('7503970b-772a-4029-9d9b-352f4e60d9da', 10);
insert into stocks (product_id, count) values ('dff6c172-3f40-46e2-a511-47a1a037a893', 10);
insert into stocks (product_id, count) values ('a29d3ca2-64e7-4685-b3da-5c7d91ca7aaa', 10);
insert into stocks (product_id, count) values ('c40c3641-0a26-4426-b511-b518192ffae2', 10);
insert into stocks (product_id, count) values ('b98c36c5-53be-4cce-9f65-280a1024ffc7', 10);
insert into stocks (product_id, count) values ('8eba5a81-ee1f-472b-b022-a4d668823bba', 10);
insert into stocks (product_id, count) values ('70190b37-e1a6-4d99-b594-093a0a153ba4', 10);



-- get all products
select p.id, p.title, p.description , p.price , s.count  from products p inner join stocks s on s.product_id = p.id;


-- get product by uuid
select p.id, p.title, p.description , p.price , s.count  from products p inner join stocks s on s.product_id = p.id and p.id = 'b2cba874-a24a-4052-8755-b76cc9dabbe4';




