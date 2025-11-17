import projects from "@/consts/projects";
import websites from "@/consts/websites";
import techs from "@/consts/techs";
import media from "@/consts/media";

function mapLinks(links) {
    function map(link) {
        let href =
        "https://" + (link === "live" ? "" : websites[link]) + links[link];

        if (link === "figma") href = `https://figma.com/community/file/${links[link]}`
        if (link === "github" && links[link].startsWith("/")) href = media.github + links[link]


        const className = link === "cached" ? "button__secondary" : "";
        const name = `${link[0].toUpperCase()}${link.slice(1)}`;

        return /*html*/ `<a href="${href}" class="button ${className}">${name} =></a>`;
    }

    return Object.keys(links).map(map).join("");
}

export default ({ id }, t) => {
    const project = projects.find((project) => project.id === id) || {};
    const { hasImage, images = [], techs: projectTech = [], links = {} } = project;
    const titleText = (t && t[id] && t[id].name) ? t[id].name : id;
    const descriptionText = (t && t[id] && t[id].description) ? t[id].description : "";

    return /*html*/ `
        <div class="project">
            ${
                images.length
                    ? /*html*/ `<div class="project__gallery">` +
                        /* main image */
                        `<a href="/images/projects/${id}/${images[0]}" target="_blank"><img src="/images/projects/${id}/${images[0]}" alt="${titleText}" loading="lazy" class="project__image" onerror="if(!this.dataset.triedmain){this.dataset.triedmain=1;this.src='/images/projects/${images[0]}';}else{this.remove();}"></a>` +
                        /* thumbnails */
                        (images.length > 1
                            ? `<div class="project__thumbs">` + images.slice(1).map(img => `<a href="/images/projects/${id}/${img}" target="_blank"><img src="/images/projects/${id}/${img}" loading="lazy" class="project__thumb" onerror="if(!this.dataset.tried){this.dataset.tried=1;this.src='/images/projects/${img}';}else{this.parentElement.remove();}"></a>`).join("") + `</div>`
                            : ``) +
                        `</div>`
                    : (hasImage ? `<img src="/images/projects/${id}.webp" alt="${titleText}" class="project__image" onerror="if(!this.dataset.triedmain){this.dataset.triedmain=1;this.src='/images/projects/${id}.png';}else{this.remove();}">` : "")
            }
            
            <ul class="project__techs">
                ${projectTech
                    .map(
                        (tech) =>
                            /*html*/ `<li class="project__tech">${techs[tech]}</li>`
                    )
                    .join("")}
            </ul> 

            <div class="project__content">
                <div class="project__name">${titleText}</div>
                <div class="project__description">${descriptionText}</div>
                <div class="project__links">${mapLinks(links)}</div>
            </div>
        </div> 
    `;
};
