$(document).ready(function (){
  // currentData = []
});

  const searchBox = document.getElementById('repo-search')
  const searchText = document.getElementById('repo-search-text')
  const resultsDiv = document.getElementById('results')

  searchBox.addEventListener("submit", () => {
    event.preventDefault()

    const search = searchText.value
    currentData = []
    document.getElementById("results").innerHTML = ""

   let url = `https://api.github.com/search/repositories?q=user:${search}`;

    $.get(url)
      .done(function(data) {
        let thisData = data.items
        // console.log(thisData[0].owner.login) == username
        for (let i = 0; i < thisData.length; i++) {
          let newItem = new Data(thisData[i])
          newItem.render()
        }
      });
  })

  resultsDiv.addEventListener("click", (event) => {
    if (event.target.id === 'commits-link') {

      let usernameWanted = event.target.parentNode.parentNode.dataset.user
      let titleWanted = event.target.parentNode.parentNode.dataset.title

      let dataWanted = currentData.find(function(data) {
       return data.name === titleWanted
      })
      let url = `https://api.github.com/repos/${usernameWanted}/${titleWanted}/commits`
      $.get(url)
      .done(function(data) {
        let thisData = data
        for (let i = 0; i < thisData.length; i++) {
          let newCommit = new Commit(thisData[i])
          newCommit.render()
        }
      });
      // data[0].commit.message = message
      // data[0].html_url = url
      // data[0].sha = numbers
      // data[0].author.login = username
      // data[0].author.avatar_url = pic
      // dataWanted.renderCommits(usernameWanted, titleWanted)
    }
  })

class Data {

  constructor(data) {
    this.name = data.name
    this.url = data.html_url
    this.description = data.description
    this.username = data.owner.login
    currentData.push(this)
  }

  render() {
    document.getElementById("results").innerHTML +=
      `
      <ul data-user="${this.username}" data-title="${this.name}">
      <h3>Title: ${this.name}</h3>
      <li>Description: ${this.description}</li>
      <li><a href="${this.url}" target="_blank">Check it out on GitHub</a></li>
      <li><a href="#"  id="commits-link">See Commits for Repository</a></li>
      </ul>
      <br>
      `
  }
}

class Commit {
  constructor(data) {
    this.message = data.commit.message
    this.url = data.html_url
    this.sha = data.sha
    this.username = data.author.login
    this.img = data.author.avatar_url
    // debugger
  }

  render() {
    // console.log("hi")
    document.getElementById("details").innerHTML +=
    `
      <ul data-user="${this.username}">
      <h5>Message: ${this.message}</h5>
      <li>Author: ${this.username}</li>
      <li><a href="${this.url}" target="_blank">Check it out on GitHub</a></li>
      <li><img src="${this.img}"></li>
      </ul>
      <br>
      `
  }
}



