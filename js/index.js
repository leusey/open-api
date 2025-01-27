document.addEventListener("DOMContentLoaded", () => {
  // DOM Selectors (Getting HTML elements)
  const projectSection = document.getElementById("Projects");
  console.log("projectSection: ", projectSection);

  const projectList = projectSection.querySelector("ul");
  console.log("projectList: ", projectList);

  // Fetch (Getting Projects from Github API)
  fetch("https://api.github.com/users/leusey/repos")
    .then((response) => {
      return response.json();
    })
    .then((repositories) => {
      console.log("repositories: ", repositories);

      // Loop through repositories array and:
      for (let i = 0; i < repositories.length; i++) {
        // - get specific project data out
        const project = repositories[i].name;
        // - create DOM (HTML) elements
        const li = document.createElement("li");
        // - put the data from the project into the DOM element (li)
        li.innerText = project;
        // - add DOM elements to your page
        projectList.appendChild(li);
      }
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = document.createElement("p");
      errorMessage.innerText = error.message;
      errorMessage.classList.add("error");
      projectSection.appendChild(errorMessage);
    });
});
