function create_clickable_icon(link){
    const aElem = document.createElement('a');
    aElem.target = "_blank";
    aElem.rel = "noopener noreferrer";
    const imgElem = document.createElement('img');
    imgElem.classList.add("link-icon");

    if (link.includes("github.com")) {
        imgElem.src = "images/icons/github_icon_white_9.ico";
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
    } else if (link.includes("youtube.com") || link.includes("youtu.be")) {
        imgElem.src = "images/icons/youtube_icon_2.png";
        imgElem.alt = "Youtube Link";
        aElem.classList.add("icon-youtube");
        aElem.setAttribute('title', "Youtube link");
    }
    aElem.href = link;
    aElem.appendChild(imgElem);
    return aElem;
}

function toggleArrow(dateElement) {
    if (dateElement.textContent.startsWith('>')) {
        dateElement.textContent = "v" + dateElement.textContent.substring(1);
    } else {
        dateElement.textContent = ">" + dateElement.textContent.substring(1);
    }
}

function toggleAccordionContent(headerElement) {
    toggleArrow(headerElement);
    var content = headerElement.nextElementSibling;

    if(content.style.maxHeight){
        content.style.transition = 'max-height 0.1s ease-out';
        content.style.maxHeight = null;
    } else {
        content.style.transition = 'max-height 1s ease-out';
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    content.classList.toggle('show-content');
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
                date_place.textContent = `> \u00A0\u00A0\u00A0\u00A0${entry.display_date} - ${entry.hackathon} `;
                date_place.classList.add("accordion-header");
                date_place.setAttribute('onclick', "toggleAccordionContent(this)");

                const description = document.createElement('p');
                description.textContent = entry.description;

                if (entry.links && entry.links.length > 0) {
                    entry.links.forEach(link => {
                        const icon = create_clickable_icon(link);
                        title.appendChild(icon);
                    });
                }
                const description_and_prizes_div = document.createElement('div');
                description_and_prizes_div.classList.add("accordion-content");
                description_and_prizes_div.appendChild(description);

                entryDiv.appendChild(title);
                entryDiv.appendChild(date_place);
                entryDiv.appendChild(description_and_prizes_div);

                const prizes_and_bounties = entry.prizes.concat(entry.bounties);
                if (prizes_and_bounties.length > 0) {
                    const prizes_and_bounties_html = document.createElement('p');
                    prizes_and_bounties_html.textContent = '🏆: ' + prizes_and_bounties.join('\u00A0\u00A0 • \u00A0\u00A0');
                    entryDiv.appendChild(prizes_and_bounties_html);
                }


                containerDiv.appendChild(entryDiv);
                sectionDiv.appendChild(containerDiv);


                if (entry.is_initially_expanded) {
                    setTimeout(() => {
                      toggleAccordionContent(date_place);
                    }, 0);
                }

                fullpageContainer.appendChild(sectionDiv);
            });
        })
        .catch(error => console.error('Error loading hackathon data:', error));
}
window.onload = loadAndDisplayHackathonEntries;
