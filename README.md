# ReactJS - Tree Topolgy

A simple web page shows the cleaning metrics grouped by accounts.

## Getting Started
Each account are able to group its child accounts in tree topology. An account is defined by the schema:
```
account: {

        id: integer,        // unique identifier for the account

        parent: integer,    // the id of the parent account

        name: string        // the name of the account

    }
```
For the statistical information are based on the cleaning's operating data
```
cleaning: {

        account: integer, // the id of the account the cleaning belongs to

        area: integer,    // the area cleaned, in square meters

        time: integer     // the time the robot spent cleaning, in seconds

    }
```
This simple web page display the accounts in tree topology way:
* Display the accounts tree with show all expanded by default - collapsed including all its child-accounts
* Show the data for each account (including its child-accounts)
  * total area cleaning
  * total time
  * productivity

### Demo
[live demo](https://react-dxm6js.stackblitz.io/)

### Installing

```
npm install
```

### Run the app

```
npm start
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [HTML](https://developer.mozilla.org/kab/docs/Web/HTML)
* [ReactJS](https://reactjs.org/) - The web framework used

## Authors

* **David Li** - *Initial work* - [LYSingD](https://github.com/LYSingD)


