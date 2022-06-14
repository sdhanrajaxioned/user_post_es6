const submitBtn = document.querySelector('.submit-btn'),
  userInput = document.querySelector('.post-number'),
  errorMsg = document.querySelector('.error-msg'),
  postForm = document.querySelector('.post-form');
  postContainer = document.createElement('div');
  postList = document.createElement('ul');

let posts = [],
  photos = [];

//dynamically adding post container and post List
postForm.insertAdjacentElement('afterend',postContainer);
postContainer.appendChild(postList);


submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  setTimeout(displayPosts, 100);
  setTimeout(displayPhotos, 150);
});

//function which returns nth fibonnaci number
const fibonacci = (n) => {
  let current = 1;
  let previous = 0;

  if(n <= 1) return 1

  while(n>1){
      current += previous
      previous = current - previous
      n-=1
  }
  return current
}

//function to get posts from API
const getPosts = () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => json.filter((post) => posts.push(post)));
}

getPosts();

//function to get images from API
const getPhotos = () => {
  fetch('https://jsonplaceholder.typicode.com/photos')
  .then((response) => response.json())
  .then((json) => json.filter((photo) => photos.push(photo.url)));
}
getPhotos();

//function to display posts
const displayPosts = () => {
  postList.innerHTML = '';
  let filteredArr = posts.slice(0,fibonacci(userInput.value));
  filteredArr.forEach((post) => {
    const li = document.createElement('li');
    li.setAttribute('data-id', post.id)
    li.innerHTML += `
    <h1 class="post-title">${post.title}</h1>
    <p class="post-desc">${post.body}</p>
    <div class="photo-container"><div>`
    postList.appendChild(li);
  })
}

//function to display images
const displayPhotos = () => {
  const randomImage = (photos) => photos[Math.floor(Math.random()*photos.length)]
  const li = document.querySelectorAll('ul li');
  li.forEach((li) => {
    let id = li.dataset.id,
      photoContainer = li.querySelector('.photo-container');
    //check if the number is even
    if(id % 2 == 0) {
      photoContainer.innerHTML += `
      <img src="${randomImage(photos)}" alt="Placeholder img">
      <img src="${randomImage(photos)}" alt="Placeholder img">
      <img src="${randomImage(photos)}" alt="Placeholder img">
      `
    }
    // if the number is odd
    else {
      photoContainer.innerHTML += `
      <img src="${randomImage(photos)}" alt="Placeholder img">
      <img src="${randomImage(photos)}" alt="Placeholder img">
      `
    }
  })
}