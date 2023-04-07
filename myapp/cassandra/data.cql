-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS ygoprodeck WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- Create a table
CREATE TABLE IF NOT EXISTS ygoprodeck.deck (
userid text PRIMARY KEY,
image_url text,
name text,
last_update_timestamp timestamp
);

-- Insert some data
INSERT INTO ygoprodeck.deck
(userid, image_url,name, last_update_timestamp)
VALUES ('9876', 'https://images.ygoprodeck.com/images/cards/64163367.jpg','Cell Incubator', toTimeStamp(now()));