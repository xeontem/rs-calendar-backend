## Artsiom Kukharev (xeontem)

### RS-Calendar backend

###API examples:
## ---------------GET methods ---------------------------
## https://rs-calendar-events.herokuapp.com/events
## https://rs-calendar-events.herokuapp.com/events/:id
## https://rs-calendar-events.herokuapp.com/trainers
## https://rs-calendar-events.herokuapp.com/trainers/:id

## ---------------POST methods ---------------------------
## https://rs-calendar-events.herokuapp.com/events with event object in body to store
## https://rs-calendar-events.herokuapp.com/events with {delete: true, id: event.id} in body to delete event
## https://rs-calendar-events.herokuapp.com/events with {login: 'your_login', password: 'your_password'} to login
## https://rs-calendar-events.herokuapp.com/events with {signin: true, login: 'your_login', password: 'your_password', avatar: 'working_url_to_image'} to register
