# portfolio-site

# PPortio

## About

### Background

Full stack website made by extending database-backend MVC web application with react this RESTapi backend website was created. The vision behind this project was to create a simple shared kanban board for the completion of projects.

## ![](assets/images/screenshot-website-preview.png)

## Technologies

- HTML Formatter: used to format HTML pages and ensure reliability and maintainability of code and features
- Figama: used to create the design of the website and constituent pages
- CSS: used to style HTML pages and create responsive and intuitive UX
- HTML: used to create the components that made up the website
- VS Code: IDE used to develop the site
- Git: used for version control of the website and creating a local repo.
- GitHub: used as a remote repo to store the commits of the project in a place that can be shared.
- GitHub Pages: part of github used to host the website file and create a live project
- Django Rest Framework: used to create api endpoints for backend
- Djago Rest Framework Simple JWT: used to generate JWT tokens for user authentication and login
- Djoser: used to manage authentication backend and management of JWT extension
- Django Cors Headers: used to enable local calls between ui and api
- Pillow: used to allow images to be supported on site
- React: used to create UI and pages
- React Router Dom : used to limit calls to the server and for general navigation in single page application
- Axios - used for calles to server
- Material UI - used to generate consistan themed componants
- PostsgreSQL: used for the database
- Psycopg2: used to interact with database in django
- postman: used to test api enpoints and outputs from requests
- pytest: used to run automated tests in python
- pytest-django: to test django behaviours

## Design

### Wireframes

- Prelimanry wireframes were completed for the UI of the website however following an agile approach a greater focus was put towards development of features and how the could evolve. additionally as the site is similar to trello and other board sites it was decided to spend more time on features to enable greater UX and by levraging designs users are experienced with I was able to optimise sprint time.

- Below are the wire frames for the site:
  ![](assets/images/screenshot-website-wireframe.png)
  ![](assets/images/screenshot-website-desktop-only-wireframe.png)
  ![](assets/images/screenshot-hm-pg-wireframe.png)

### Agile

- A kanban sprint approach was used for the managment of the projects to ensure key features would be developed within the timeline of the project. Sprints for the project were 1 week long.

- Below are screeenshots of the kanban board
  ![](pportui\src\assets\Screenshot-kan.png)

- The font was also selected to stay uniform with the theme as such the default material ui theme was used.

### Images

- Images used in the site are royalty free or have been shared under the open source licence full references and credits below.

### Layout

- The layout of the website uses card components to assist with creating a streamline UX
- The theme of the website components was created with reference to the [Material Design 3](https://m3.material.io) guidelines.

---

## Features

### Navigation

- Navbar

  ![](assets/images/screenshot-header.png)

  - The main navcomponant is the side drawbar used to log out and return home but when considering the user flow diagram for site usage and site map the Nav bar resulted in redundancies as users interact with posts and projects directly.

### Pages

All pages are fully responsive on all devices down to a minimum screen width of 320px

- The main page is the projects grid from here the user can view all projects created
- To access the site Auth must be completed first via signing up

  ![](assets/images/screenshot-home-pg.png)

- given the design of the site most of the pages are used to employ CRUD functiuonality

---

## Testing &amp; Validation

- The website was tested in Chrome, Mozilla and Opera browser. All features are supported and page maintained functionality.
- The website was tested on both desktop and mobile devices. The page is responsive to a screen width of 320px
- Dev tools used to emulate all devices from desktop to small mobile range to secure responsiveness.
- The project was tested continiusly duriung development manually the inbult linters in both django and react.
- Automated tests were established to ensure basica functionality of the site such as the CRUD operations and user authentication.

  ![](pportui\src\assets\back_end_testing.png)

- [HTML Validator from w3 schools](https://validator.w3.org) was used to validate formatting of HTML pages. SUCCESS on all pages
- EsLint returned valid for all pages

---

## Bugs

- Serializers

- UseParams

- nested routs

- ContextProvider

- styling

## acing the other html document in the same level as the index.html file and assets folder.

## Deployment

- The project was developed in VS Code to gain experience developing code in a commonly found IDE.
- I created all the basic folders and files I needed for both back and frontend
- project was deployed to heroku due to ease of integration with postgres using [] integration

---

## Credits

### Persons

- Reuben Ferrante - for constructive feedback and insight on resources to develop the project
- Pexel Contributors Kim Cruz et al - for royalty free images used in the site
- Unsplash Contributors Amit Ranjan et al - for royalty free images used in the site
- CI community - for support throughout the project

### Media

https://www.pexels.com/photo/blue-and-red-galaxy-artwork-1629236/ - default project bg
Photo by <a href="https://unsplash.com/@higorrss?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Higor Hanschen</a> on <a href="https://unsplash.com/photos/DomqHKN2Xik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
naruto

Photo by <a href="https://unsplash.com/@martenbjork?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marten Bjork</a> on <a href="https://unsplash.com/photos/rH8O0FHFpfw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
sign in image

https://www.pexels.com/photo/purple-bokeh-220072/

Photo by <a href="https://unsplash.com/@brookecagle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Brooke Cagle</a> on <a href="https://unsplash.com/photos/g1Kr4Ozfoac?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

make project

### Technology

Technologies used during the project can be found here:

- [Django](https://convertio.co/)
- [Django Rest Framework](https://www.canva.com/)
- [React Router DOM v6](https://www.figma.com/)
- [React Hook Forms](https://github.com/)
- [Djoser](https://developer.mozilla.org)
- [Simple JWT](https://fontawesome.com)
- [Axios](https://fontawesome.com)

---

## Licences &amp; Copyright

All resources used in this project are under free use policies.
The use of the resources in this project do not infract on the fair uses or terms of use of these resources
