# jquery_home_automation
A simple jquery application for implementing home automation by means for a centralized control panel. Currently, the 
application is designed for a single bed/bath apartment, with controllable components like lights, temperature and curtains. 
However, the application can be easily extended to add more rooms and components. In order to add more components, modify
the [json file](data/settings.json) by providing the details of the new component as per following structure:
```
//Adding a TV in the living room 
 "living":{
        "label":"Living Room",
        "curtains":{
                "label" : "Curtains",
                "type":"checkbox",
                "val": true
            },
        "lights" : {
                "label" : "Lights",
                "type":"checkbox",
                "val": true
            },
         "TV" : {
                "label" : "TV",
                 "type":"checkbox",
                  "val": true
            }
    }
```

The added component will be dynamically added to the control panel. Currently the only supported operation is on/off, 
by the means of the checkbox for the components, except for temperature which supports a number as value. 

### Pre-requisites.
In order to run the applications you will need the below tools:

* [Java 1.8](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

Once you have installed Java 1.8, you can use the project [Java Based Web File Server](https://github.com/1010sachin/multithreaded-file-server)
to run a simple web server that can run the Jquery_home_automation on a web browser.

For convenience, a jar file for the web server is provided [here](resources/multithreaded-server-1.0-SNAPSHOT-jar-with-dependencies.jar)

### Run the application
* Checkout the source code from github (or unzip the jquery_home_automation.zip). 
* From the project source directory, i.e. jquery_home_automation/ execute the below steps:

*Step 1: Start the web server*
```
$ java -jar ./resources/multithreaded-server-1.0-SNAPSHOT-jar-with-dependencies.jar 8090 . 1

```
In the above command we start the web server by providing it with the jar file and 3 parameters:
1. the port where the server would run.
2. '.' that indicates the program to list the contents of the current directory i.e the contents under the jquery_home_automation
directory. 
3. A non zero number of threads that the java program uses to run the web server.

*Step 2: Run the jquey appliction*

Once the web server is up adn running, open a web browser of your choice and go to the link, http://localhost:8090

You will see a list of the contents of the jquery_home_automation directory as:
![](images/DirectoryListings.png?raw=true)

Click on the file index.html, from the above listings and that should render the html as seen below:

![](images/home_automation_screen.png?raw=true)