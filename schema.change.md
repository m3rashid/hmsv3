S.NO EMP ID EMP NAME EMP FATHER'S NAME DESIGNATION MARITAL STATUS GENDER BLOOD GROUP D.O.B FDR NO D.O.R DEPARTMENT ADDESS CONTACT NUMBER

S.NO EMP ID EMP NAME PENSIONER NAME PENSIONER RELATION EMP FATHER'S NAME DESIGNATION MARITAL STATUS GENDER BLOOD GROUP D.O.B FDR NO D.O.R DEPARTMENT ADDESS CONTACT NUMBER

S.NO EMP ID EMP NAME FAMILY PENSIONER NAME PENSIONER RELATION EMP FATHER'S NAME DESIGNATION FAMILY PENSIONER MARITAL STATUS FAMILY PENSIONER GENDER EMPLOYEE BLOOD GROUP FAMILY PENSIONER D.O.B FDR NO EMPLOYEE D.O.R DEPARTMENT ADDESS CONTACT NUMBER

S.No EMP ID EMP NAME EMPLOYEE DESIGNATION FAMILY MEMBER NAME RELATIONSHIP FAMILY MEMBER MARITAL STATUS FAMILY MEMBER GENDER FAMILY MEMBER DOB DEPENDENT STATUS FDR EMP D.O.R ADDESS CONTACT NUMBER

## User Table

- jamiaId <!-- employee ID for employee and student Id fro student -->
- name
- father
- type <!-- EMPLOYEE, STUDENT, PENSIONER, FAMILY_PENSIONER,DEPENDENT -->
- relationWithType <!-- Relation of current user with type -->
- nameOfType <!-- in case of pensioner, it is n, or (family member name in case of family member) -->
- designation
- maritalStatus <!-- of current user -->
- gender
- dob
- bloodGroup <!-- A+ B+ O+ AB- AB+ A- B- O- -->
- fdrNo
- dor
- department
- address
- contact

## Ye dekho

- ID : INT
- EMP_ID : INT
- Employee Name
- Type : ENUM
- Relation : String
- Gender : ENUM
- Blood Group : ENUM
- DOB : Date
- DOR : Date
- isDeleted : BOOL
- Designation : String
- Contact : String
- FDR : INT
- User_Data : JSON
<!-- - PENSIONER_NAME : String
- PENSIONER_RELATION
- EMP_FATHER_NAME
- MARITAL_STATUS
- DEPARTMENT
- FAMILY_PENSIONER_NAME
- FAMILY_PENSIONER_MARITAL_STATUS
- FAMILY_PENSIONER_GENDER
- FAMILY_MEMBER_NAME
- RELATIONSHIP
  as -->

### LOGIC FOR DATA MIGRATION

<br />

<b>EMPLOPYEES DATA UPDATION</b>

<b>INPUT</b> : Employees Data in Excel Sheets

<b>OUTPUT</b> : Updated employees data

1. Convert the Excel sheet into json `employees.json`
2. Iterate over the employees database,
   - If the employee is present in the `employees.json`,
       <!-- - update the `isActive` field to `true` in database -->
     - remove those employees from the `employees.json`
     <!-- - else update the `isActive` field in the database to `false` -->
3. Iterate over the entries in `employees.json`
   - add the data to the database
     - check for field maps and put the data to desired place

<br />

<br />

<b>STUDENT DATA UPDATION</b>

<b>INPUT</b> : Students Data in Excel Sheets

<b>OUTPUT</b> : Cleaned up database with the entries only in excel sheet

1. Convert the Excel sheet into json `students.json`
2. Iterate over student database,
   - If student not present in the `students.json`,
     - remove it from the database
     - remove it from `students.json`
3. Iterate over the entries in `students.json`
   - Add the student data to the database
     - Check for field maps and put the data to desired place
