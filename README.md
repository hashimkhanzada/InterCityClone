# InterCityClone
A solo project built with ReactJs and .Net 5 Web API.
This web application imitates the design and main features of the intercity website.

### Demo available at
> https://www.hashimkhanzada.com/

## Setup (Windows)

#### Pre-requisites
> [.NET 5.0 SDK](https://dotnet.microsoft.com/download/dotnet/5.0) - comes out of the box with the latest visual studio
> 
> [Node v14.*](https://nodejs.org/en/download/)
> 
> [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


#### Steps
- Clone the repo
- Open the repo folder with the command prompt
- Download dependencies for the client:
```cmd
cd intercity-react-client
InterCityClone-master\intercity-react-client> npm install
```

#### Database setup
The database configuration for local sql has already been set up. The only thing needed is to run `update-database` in the package manager console.

#### Change base URL to localhost
Connect the client to the local server by navigating to 
```
intercity-react-client\src\api\axios.js
```

Change the baseURL on line 3 to `https://localhost:44366/api/`

#### Run client:
```cmd
intercity-react-client> npm start
```

#### Run server (Visual Studio)

Run using IIS Express

![image](https://user-images.githubusercontent.com/74533711/118931598-5611ab00-b99b-11eb-87c8-5193f6df4ccc.png)

This will open up Swagger UI (open API), and your client will be able to make requests successfully.

