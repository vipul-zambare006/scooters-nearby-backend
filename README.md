# Rest api for fetching nearby scooters using Node, ExpressJs and MongoDB:

Steps to run applications:rocket: :

1.  Start node application and create web server at `localhost:3000`

    > npm start

2)  To insert sample locations points of scooters
    call api:

    > `http://localhost:3000/api/create-test-locations`

3)  UI interface to create more locations based on your preference:

    > `http://localhost:3000`
    > ![](add-scooter-ui.png)

4)  API to get nearby-scooters:

    > `http://localhost:3000/api/get-nearby-scooters/:noOfScooters/:latitude/:longitude/:radiusMeters`

         Example: http://localhost:3000/api/get-nearby-scooters/6/1.2765707/103.845848/6000

5)  Any problems, suggestions?
    > vipul.zambare1993@gmail.com
