#                                                                              COVID-19 Hospital API


This API is designed to facilitate the testing, quarantine, and well-being management of COVID-19 patients in a hospital allocated by the government. It provides endpoints for doctors and patients to perform various operations.

- [Installation](#installation)

  
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rajan624/hospital_api
   cd hospital1_api
   npm install  //install dependecies
   nodemon index.js   //start the server



# Table of Contents


                                                      Authentication
/doctors/register


/doctors/login



                                                        Patients


/patients/register


/patients/:id/create_report


/patients/:id/all_reports


                                                         Reports


/reports/:status


                                                         Authentication

# /doctors/register


Register a doctor in the system.

Request:

POST     /doctors/register



Request Body:
{      
"name":"doctor_name",
    "email": "doctor_username",
    "password": "doctor_password"
}



Response:

200 OK: Doctor registration successful.

400 Bad Request: Invalid request body or missing parameters.


# /doctors/login


Authenticate a doctor and obtain a JSON Web Token (JWT) for subsequent API calls.

Request:
POST /doctors/login



Request Body:
{
    "email": "doctor_eamil",
    "password": "doctor_password"
}
Response:

200 OK: Doctor login successful. Returns a JWT for authentication.


401 Unauthorized: Invalid credentials.


                                                                Patients
# /patients/register


Register a patient in the system.


Request:
POST /patients/register


Request Body:
{
    "phoneNumber": "patient_phone_number",
    "name":"patient_name"
}




Response:
200 OK: Patient registration successful. Returns the patient information.


400 Bad Request: Invalid request body or missing parameters.


# /patients/:id/create_report


Create a report for a patient after a checkup.



Request:
POST /patients/:id/create_report



Request Parameters:

:id (string): Unique identifier of the patient.



Request Body:
{
    "status": "Positive-Admit",
    "date": "YYYY-MM-DD",
}



Response:

200 OK: Report creation successful.


400 Bad Request: Invalid request body or missing parameters.


404 Not Found: Patient not found.


# /patients/:id/all_reports


Get all the reports of a patient, sorted from oldest to latest.

Request:
GET /patients/:id/all_reports



Request Parameters:
:id (string): Unique identifier of the patient.



Response:
200 OK: Returns a list of all the reports for the patient.


404 Not Found: Patient not found.


                                                        Reports

                                                        
# /reports/:status


Get all the reports of all the patients filtered by a specific status.

Request:
GET /reports/:status


Request Parameters:
:status (string): Status to filter the reports. Can be one of: Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit.


Response:
200 OK: Returns a list of all the reports with the specified status.


400 Bad Request: Invalid status value.      


Please note that this API documentation assumes the usage of JSON for request and response bodies. Proper authentication and error handling mechanisms should be implemented for a production-ready API.
