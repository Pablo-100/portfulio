import skills from "@/consts/skills";
import techs from "@/consts/techs";

export default ({ id }, t) => {
    return /*html*/ `
        <div class="skill-block">
            <div class="skill-block__name">${t && t[id] ? t[id] : (id[0].toUpperCase() + id.slice(1))}</div>
            <ul class="skill-block__list">
                ${(skills[id].map((techIndex) => techs[techIndex] ?? techIndex))
                    .map(
                        (tech) =>
                            /*html*/ `<li class="skill-block__skill">${tech}</li>`
                    )
                    .join("")}
            </ul>
        </div>
    `;
};
