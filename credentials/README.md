# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP: https://eclipsesakura.online/
2. SSH username: ubuntu
3. SSH password or key (execute the following in terminal and within the correct directory: ssh -i "csc648-team-08.pem" ubuntu@ec2-54-176-10-43.us-west-1.compute.amazonaws.com)
    <br> If a ssh key is used please upload the key to the credentials folder.
5. Database URL or IP and port used.: csc648-team-08-db.c30mm4sa4ezq.us-west-1.rds.amazonaws.com & port 3306
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
6. Database username: admin
7. Database password: q2lfkuUORuEvi5vzNpJs
8. Database name (basically the name that contains all your tables): csc648-team-08-db
9. Instructions on how to use the above information.

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
