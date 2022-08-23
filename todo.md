## High Priority

- [ ] the past(already attended) appoimtments are still available in the list to be handled
- [ ] doctor can refer to other doctors/departments [rashid]
- [ ] Update Pharmacist [husain]
  - [ ] allotted if medicine is present in store or not [husain]

## Bugs

- [ ] same patient register creates issues in doctor tab

## Known Bugs

- [ ] doctor can only see the appointments on refresh

## New Requirements (Date: 22/aug/22)

- Analytics

  - [ ] maintain logs (from/by/task)

- Reception

  - [x] patient => name-empId/st.Id.
  - [x] doctor => name-designation
  - [ ] date => constrains -> not before now, default now

- Doctor

  - [ ] \* on mandatory fields
  - [ ] create prescription notifications
  - [ ] pending -> past (bug: now happens on refresh, should be done via sockets)
  - [ ] custom medicine => duration/dosage

- Pharmacy

  - [ ] View Prescription
  - [ ] print -> should be done by pharmacist (not doctor)

- Admin

  - [x] Update profile of users
  - [x] update password of users

- Admin/Co-Admin

  - [ ] Generate reports

- Inventory
  - [ ] no. of strips/bottles, tablets per strips (TPS)
  - [x] manufacturer (optional field)
  - [x] category (optional field)
  - [ ] view more
    - [x] Show Expiry date
    - [ ] group medicines by batch no. and expiry
