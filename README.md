# Mio-Pharma-Technical-Challenge

The objective of this technical challenge is to build a server that would 
answer our API calls throught URLs.
It provide the external interface as required. 

Below you will find the steps to make this server work on a local environment.

I - GET THE CODE LOCALY
1-Fork this repository
2-Copy the link of the forked repository

II - INITIAL SET UP
1 - Open your terminal and run the following commands:
mkdir technical-challenge
cd technical-challenge

III - clone the repository 
Once you are in the folder technical-challenge, you will need to clone the repo
To do so, you just need to paste the link of the forked repository that you just copied on step I
Like so, in your terminal: 
git clone <link of the repository>

Now you should have the foler of the repository in your local environment.

IV - Make the server works
Enter the following comands :
cd Mio-Pharma-Technical-Challenge

Now let's install the dependencies we will need to make our project work

Create a .env file on the root of the folder, and add the information received by email.

In your terminal, write the following command:

npm install 

You should now have a file named package-lock.json and a node_modules folder
You can now run the server by writing the following command:
npm run dev

If everything went fine, you should see these informations in the terminal:
Server listening on port http://localhost:5005
Connected to Mongo! Database name: <the name of the database>

----------------------------------------------------------------------------------

Below you can find the different requests you can make

GET 
/warehouses
--> return all the warehouses if no parameters is passed. 
Otherwise, it returns the filtered warehouses in function of the parameters you have put.
The different parameters, all optional:
page_no (default 0)
page_size
has_del_data (default 1)
start_date (default 1970-01-01)
end_date (default date.now())
date_type (default 1)

/warehouses/:code
--> returns the warehouse that has the same code as mentionned in the request parameter. 

POST
/warehouses
Create a new Warehouse.
These are the parameters you can pass to the body (req.body):
warehouse_code (required and unique)
warehouse_name
type_code
contact_name
contact_phone
contact_mobile
province
city
district
address
note

/deliveries
Create a new delivery.
These are the parameters you can pass to the body (req.body):
code
warehouseId (the Id of the warehouse you want to link this delivery to)
express_name
express_code
mail_no

PUT
/warehouses/:warehousesId
Modify the warehouse. You must mention the ID of the warehouse you want to modify, not its code. 
The body parameters are the same than the ones in the POST method

You can run this different calls from POSTman, I would share the collection with you

