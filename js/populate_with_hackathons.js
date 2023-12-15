function create_clickable_icon(link){
    const aElem = document.createElement('a');
    aElem.target = "_blank";
    aElem.rel = "noopener noreferrer";
    const imgElem = document.createElement('img');
    imgElem.classList.add("link-icon");

    if (link.includes("github.com")) {
        imgElem.src = "images/icons/github_icon_white_6.png";
        imgElem.alt = "GitHub Link";
        aElem.classList.add("icon-github");
        aElem.setAttribute('title', "Github link");
    } else if (link.includes("ethglobal.com")) {
        imgElem.src = "images/icons/ethglobal_icon.ico";
        imgElem.alt = "ETHGlobal Link";
        aElem.classList.add("icon-ethglobal");
        aElem.setAttribute('title', "ETHGlobal link");
    } else if (link.includes("devfolio.co")) {
        imgElem.src = "images/icons/devfolio_icon.png";
        imgElem.alt = "Devfolio Link";
        aElem.classList.add("icon-devfolio");
        aElem.setAttribute('title', "Devfolio link");
    } else if (link.includes("taikai.network")) {
        imgElem.src = "images/icons/taikai_icon.ico";
        imgElem.alt = "Taikai Link";
        aElem.classList.add("icon-taikai");
        aElem.setAttribute('title', "Taikai link");
    }

    aElem.href = link;
    aElem.appendChild(imgElem);
    return aElem;
}

function loadAndDisplayHackathonEntries() {
    fetch('data/hackathon_data.json')
        .then(response => response.json())
        .then(data => {
            const fullpageContainer = document.getElementById('commitments');
            data.forEach(entry => {

                const sectionDiv = document.createElement('div');
                sectionDiv.classList.add("section");

                const containerDiv = document.createElement('div');
                containerDiv.classList.add("container");

                const entryDiv = document.createElement('div');
                entryDiv.className = 'hackathon-entry';
                entryDiv.classList.add("fadeInLeft");
                entryDiv.classList.add("wow");
                entryDiv.classList.add("row");
                entryDiv.setAttribute('data-wow-delay', "0.1s");

                const title = document.createElement('h3');
                title.textContent = entry.project_name;

                const date_place = document.createElement('p');
                date_place.textContent = `${entry.display_date} - ${entry.hackathon} `;

                const description = document.createElement('p');
                description.textContent = entry.description;

                if (entry.links && entry.links.length > 0) {
                    entry.links.forEach(link => {
                        const icon = create_clickable_icon(link);
                        date_place.appendChild(icon);
                    });
                }

                entryDiv.appendChild(title);
                entryDiv.appendChild(date_place);
                entryDiv.appendChild(description);

                containerDiv.appendChild(entryDiv);
                sectionDiv.appendChild(containerDiv);
                fullpageContainer.appendChild(sectionDiv);
            });
        })
        .catch(error => console.error('Error loading hackathon data:', error));
}
window.onload = loadAndDisplayHackathonEntries;
