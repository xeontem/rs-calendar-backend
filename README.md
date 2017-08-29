## Artsiom Kukharev (xeontem)

### RS-Calendar backend

###API examples:
## ---------------GET methods ---------------------------
## https://damp-earth-84904.herokuapp.com/events
## https://damp-earth-84904.herokuapp.com/events/:id
## https://damp-earth-84904.herokuapp.com/trainers
## https://damp-earth-84904.herokuapp.com/trainers/:id

## ---------------POST methods ---------------------------
## https://damp-earth-84904.herokuapp.com/events with event object in body to store
## https://damp-earth-84904.herokuapp.com/events with {delete: true, id: event.id} in body to delete event
## https://damp-earth-84904.herokuapp.com/events with {login: 'your_login', password: 'your_password'} to login
## https://damp-earth-84904.herokuapp.com/events with {signin: true, login: 'your_login', password: 'your_password', avatar: 'working_url_to_image'} to register
