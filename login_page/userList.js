
class User {
  
    constructor(address, phoneNumber, lastName, firstName) {
  
      this.address = address
      this.phoneNumber = phoneNumber
      this.lastName = lastName
      this.firstName = firstName
      this.movieList = []
    }
  }
  
  class Movie {
  
    constructor(movieName, movieID){
      this.movieName = movieName
      this.movieID = movieID
    }
  }