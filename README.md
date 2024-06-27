# <Name of Software Application>
## CS 465 Project Software Design Document
### Version 1.0

---

## Table of Contents
1. [Document Revision History](#document-revision-history)
2. [Instructions](#instructions)
3. [Executive Summary](#executive-summary)
4. [Design Constraints](#design-constraints)
5. [System Architecture View](#system-architecture-view)
6. [Component Diagram](#component-diagram)
7. [Sequence Diagram](#sequence-diagram)
8. [Class Diagram](#class-diagram)
9. [API Endpoints](#api-endpoints)
10. [The User Interface](#the-user-interface)

---

## Document Revision History
| Version | Date     | Author          | Comments                                                      |
|---------|----------|-----------------|---------------------------------------------------------------|
| 1.0     | 05/26/24 | Anthony Fillmore| Initial updates, executive summary, design constraints, and system architecture overview. |

---

## Instructions
Fill in all bracketed information on page one (the cover page), in the Document Revision History table, and below each header. Under each header, remove the bracketed prompt and write your own paragraph response covering the indicated information.

---

## Executive Summary
The Travlr Getaways application will use the MEAN stack to ensure we build in modularity, scalability, and long-term maintainability. We can facilitate agile development of our product while building a high-performance, modern web application.

The MEAN stack will be leveraged as follows: The Mongo database component will provide a flexible database solution that is easily scalable. The Database’s role will be to store our application's stateful data and provide support for things like role-based access controls of the system. Node.js and Express will handle our back-end server functionality and provide an interface for API management. Angular will create a client interface that will provide our users with a dynamic and responsive experience aimed at the best possible user experience.

The customer-facing side of our application will allow our customers to create accounts, search for travel packages, book reservations, and view the details of booked trips.

The Administrator SPA (single-page application) will allow system administrators an interface to manage our application components. The SPA will provide ways to manage customer data, vacation packages, prices, trip information, and adding/removing packages.

---

## Design Constraints
Three design constraints have been identified for this project – The need for application scalability, project resource limitations, and guest data security concerns.

The requirement of having a scalable application means we need to design our application and stack in a way that makes it easy to scale up. We may run the risk of poor application performance as we tune and scale our application to meet ever-changing user needs and requirements.

Project resource limitations could present themselves in several forms – from lack of engineering resources to a lack of physical resources (compute) could present several problems to our project. A lack of engineering resources will slow our project down, limiting the number of features we can deliver and extending the project timeline, running the risk of missing deadlines. A lack of compute resources can present additional impacts – scalability testing is impossible if we can’t scale up our resources. We also run risks of not having enough resources to complete project activities like lifecycle management, testing, and adding new features.

Guest data security presents another constraint as we need to build security into our application design and project lifecycle. Storing guest data makes a target of malicious actors and any breach of this data will cause a loss of customer confidence. Having a heavy security focus will limit the number of additional features we present upon initial release as we will need to prioritize security above function.

---

## System Architecture View
The System Architecture View is a breakdown of the below Component diagram and consists of client-side components (Angular), server-side components (Node/Express.js), and a MongoDB database.

The general communication pattern of our application is that our client side sends a request to the server side, which processes the request and uses the database to get and set stateful data from our database. The client side manages the user interface (web browser) and handles all client-side logic. The client session is managed within this component and QOL components like graphic libraries are included to optimize client-side performance.

The server-side handles the API requests that come from the client side, executing business logic based on user actions. The server-side is also responsible for interacting with our database, enforcing RBAC, and maintaining server-side sessions.

Our Database component manages our application's stateful data – including things like user data, travel package information, pricing, booking information, and transactions. The Database interacts with our server-side components to handle queries for information and to update information when necessary.

---

## Component Diagram
[Component Diagram Placeholder]

<Describe the overall system architecture of the web application by referring to the component diagram above. Identify the significant components that will be used and their relationships to one another.>

---

## Sequence Diagram
[Sequence Diagram Placeholder]

The sequence diagram visualizes the flow of logic in the Travlr Getaways web application. It starts when a user initiates a request on the client-side using Angular. The browser redirects the request to the Angular controller, which then calls a service to retrieve the requested data. The HTTP client sends a request to the server-side Express route. The route then passes the request to the controller, which processes the request and calls the Mongoose model to interact with the MongoDB database. The database processes the request and returns the data to the model. The data is then returned to the controller, which sends it back to the HTTP client. Finally, the HTTP client updates the view in the browser to display the retrieved data to the user.

---

## Class Diagram
[Class Diagram Placeholder]

**Booking Main**  
This class manages various booking types in the travel application. It includes methods to book packages, flights, hotels, and cruises. Each method takes an Itinerary object as input and returns the corresponding booking information.

*Methods:*
- BookPackage(Itinerary): Itinerary
- BookFlight(Itinerary): FlightInfo
- BookHotel(Itinerary): HotelInfo
- BookCruise(Itinerary): CruiseInfo

**TripInfo**  
The TripInfo class represents the details of the trip. It includes attributes for starting dates, returning dates, origin, and destination locations.

*Attributes:*
- starting_date: int
- returning_date: int
- origin: string
- destination: string

**FlightInfo**  
This class represents flight information for a travel itinerary, including details like the seat class and price.

*Attributes:*
- name: string
- seatclass: string
- price: float

**HotelInfo**  
The HotelInfo class contains information about hotel bookings, including the hotel's star rating, location, number of rooms requested, and price.

*Attributes:*
- name: string
- star: int
- location: string
- roomsrequested: int
- price: float

**CruiseInfo**  
This class encapsulates information about a cruise booking, including the cabin type and price.

*Attributes:*
- name: string
- cabintype: string
- price: float

**TravellerInfo**  
This class represents information about a traveler, including their membership number, frequent airline, and membership status. It includes methods to get and validate points based on the traveler's membership information.

*Attributes:*
- membernumber: int
- frequent_airline: string
- memberstatus: int
- memberclub: string

*Methods:*
- creditpoints(Itinerary): bool
- getpoints(membernum: int, frequent_airline: string): int
- validate(membernum: int, frequent_airline: string): bool

**Membership_Admin Class**  
The Membership_Admin class manages administrative functions related to traveler memberships. It handles the validation, points management, and status updates of members within our travel application.

*Attributes:*
- membernumber: int
- frequent_airline: string
- memberstatus: int
- memberclub: string

*Methods:*
- creditpoints(Itinerary): bool
- getpoints(membernum: int, frequent_airline: string): int
- validate(membernum: int, frequent_airline: string): bool

---

## API Endpoints
| Method | Purpose                    | URL                     | Notes                                                                  |
|--------|----------------------------|-------------------------|------------------------------------------------------------------------|
| GET    | Retrieve list of trips     | /api/trips              | Returns all active trips                                               |
| GET    | Retrieve single trip by code| /api/trips/{objectId}   | Returns single trip instance, identified by the trip ID passed on the request URL |
| POST   | Create a new trip          | /api/trips              | Returns created trip object                                            |
| PUT    | Update an existing trip    | /api/trips/{objectId}   | Returns updated trip object                                            |

---

## The User Interface
Screen shot of a unique trip added by me:
![Unique Trip](path/to/unique_trip_screenshot.png)

Screen shot of the edit screen:
![Edit Screen](path/to/edit_screen_screenshot.png)

Screen shot of the updated screen:
![Updated Screen](path/to/updated_screen_screenshot.png)

---

## Angular Project Structure and Testing
The Angular project structure is modular, focusing on component-based architecture, which complements a streamlined, server-centric structure of an Express project. Angular projects include directories for components, services, and modules, enhancing maintainability and scalability. Express projects center around routes, controllers, and models for server-side logic. SPAs built with Angular provide responsive user experiences that are dynamic and seamless compared to traditional web applications. Testing involves unit, integration, and end-to-end tests to ensure application functionality.
