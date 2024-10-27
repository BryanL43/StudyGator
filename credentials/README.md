# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP: https://eclipsesakura.online/
2. SSH username: ubuntu
3. SSH password or key. Navigate to where the downloaded **.pem** file is located and execute the following in Powershell (or any other command terminal):</br>
```ssh -i "csc648-team-08.pem" ubuntu@ec2-54-176-10-43.us-west-1.compute.amazonaws.com```
4. Database URL or IP & port: ```csc648-team-08.c30mm4sa4ezq.us-west-1.rds.amazonaws.com``` & port ```3306``` (port 2000 for reverse proxy Nginx)
5. Database username: **admin**
6. Database password: **q2lfkuUORuEvi5vzNpJs**
7. Database name: **data-schema**
8. Instructions on how to use the above information: <br/>
#### Accessing EC2 instance video guide:
https://drive.google.com/file/d/1D4-oZ-_tHVFaECOflHlswmfQO6uSlZyZ/view?usp=sharing
#### Accessing database guide:
https://drive.google.com/file/d/1m1BZJ2BB5vBWfMk0qYIQ7dpuCbS9M0pU/view?usp=sharing</br>
</br>
[+] "Connection Name" should be ```csc648-team-08```</br>
[+] Ensure you have the correct MySQL Workbench (the installer for my version):</br>
https://drive.google.com/file/d/1fA7WWk-6qkbBf7hsCbGVKYMn73sOeMjk/view?usp=sharing

</br></br></br>
# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
