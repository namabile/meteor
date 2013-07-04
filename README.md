My Meteor Projects
========================

This repository contains the code for my Meteor projects. It also contains basic configuation files to set up a Vagrant development environment.

Note on Mongo
---------------
I'm using [MongoHQ] (http://www.mongohq.com "Mongo HQ") to host my development databases since Meteor has problems setting up the DB in an NFS shared folder.

To have Meteor connect to the MongoHQ database, set the ```MONGO_URL``` environment variable to the appropriate MongoHQ URI.

Microscope
---------------
Contains the code following along with the [Discover Meteor] (http://www.discovermeteor.com/  "Discover Meteor") book. The official repo for the book is [here] (https://github.com/SachaG/Microscope "Microscope repo").
