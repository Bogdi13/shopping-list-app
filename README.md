[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/hfszLgOz)

**Individual Project Details**
Due: April 15th.
Details:
    *An essey of at least 500 words on a topic selected from the 'Essays Titles' file from Teams.*
    *A simple RESTful web service. A client and server that will implement the CRUD operations.*
    Expected outcome:
        *The source code should be hosted in the individual github classroom repository.*
        At least the following requirements should be met:
            *The server should be able to receive HTTP requests from clients using the RESTful API.*
            *The server should be able to respond to these requests with the appropriate HTTP status codes (e.g. 200 OK, 404 Not Found, etc.) and a response body in JSON format.*
            *The server should have a database or other data storage mechanism to persist data sent by clients.*
            *The server should implement CRUD operations (Create, Read, Update, Delete) for the data stored in the database.*
            *The server should handle concurrent requests from multiple clients.*
            *The server should validate incoming requests to ensure that they conform to the expected format and that the data being sent is valid.*
            *The client should be able to send requests to the server to create, read, update, and delete data using HTTP methods (e.g. POST, GET, PUT, DELETE).*
            *The client should be able to receive responses from the server in JSON format.*
            *The client should display the data received from the server in a user-friendly way.*
            *The client should provide a way for the user to input data and send requests to the server.*

Frontend: Angular with Typescript
    Prerun: npm init to init npm
            npm install to install node_modules
    Run: ng serve
    Default path: http://localhost:4200/


Backend: FastAPI with Python
    Prerun: ./env/Scripts/activate to activate the virtual environment
    Run: uvicorn --reload main:app to run the server using uvicorn
    Default path: http://127.0.0.1:8000
    Swagger doc: http://localhost:8000/docs

