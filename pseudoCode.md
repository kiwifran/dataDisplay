##Pseudo code and thoughts about displaying the data

1.optional-use users' input to search for property information, both the address and cityState string/zipcode are required for api call ⭕

-   handle errors for user's input with sweet alert(now it's only checking if users submit empty input) ⭕
-   more information for what to type in the search bar(how to address the space between the city and the state??)
-   may make the form into a separate component and refactor the state management with redux
-   may use third part library to help autocomplete users' input
    2.make the first api call to get basic information and store the data array in the state⭕

-   use proxy to get around cors ⭕
-   json is not available, so need to parse the xml file to json ⭕
-   error handling with sweet alert ⭕
-   can provide different notifications according to different error codes

3.display the properties as markers on a map showing basic information (it's more intuitive to see the position in a map)⭕

-   better ui for markers and info popup on the map
-   may add error handling for problems in loading maps
-   possibility to add tabindex for accessibility?
    =>find a way to choose a better location to set as the center for the map, now the app is using the location of the first property in the data array as the center.

4.make second api call when use click on the link from the popup to get details⭕

-   use proxy and parse xml to json⭕
-   error handling⭕

5.display the information( routing or modal?)-routing⭕

-   refactor with useContext to pass values, e.g.the info object for details component
-   if using routing, can use local storage to retrieve the the former location and status of the map; and if it takes some time to load the map again, add a preloader

6.testing with testing-library/react

-   how to test the map??
