import routes from "@/consts/routes";
import MediaIcon from "./MediaIcon";
import me from "@/consts/me";

const paths = ["/", "/projects", "/about-me"]

export default (t) => {
    return /*html*/ `
        <header class="header">
            <input class="hamburger" type="checkbox" aria-label="Menu" />

            <div class="media-header">
                <span class="media-header__line"></span>
                <div class="media-header__links">
                    ${Object.values(me.contact?.social ?? {})
                        .filter(s => s.navbar)
                        .map(s => /*html*/ `<a href="${s.url}" class="media"><img src="/images/icons/${s.icon}.svg" alt="${s.name}" class="media__icon"/></a>`)
                        .join("")}
                </div>
            </div>


            <div class="container">

                <div class="header__inner">
                    <a class="logo" href="/">
                        <img class="logo__img" src="/images/logo.svg" alt="Mustapha logo">
                        <span class="logo__name">Mustapha Amine</span>
                    </a>
                    <div class="header__links">
                        ${paths
                            .map(
                                (path) => /*html*/ `
                                <a href="${path}" class="header__link ${
                                    window.location.pathname === path
                                        ? "header__link_active"
                                        : ""
                                }">${t[routes[path].name]}</a>
                            `
                            )
                            .join("")}
                    </div>
                    <div class="dropdown">
                        <span class="dropdown__label">en</span>

                        <div class="dropdown__list">
                            <div class="dropdown__option">en</div>
                            <div class="dropdown__option">fr</div>
                        </div>
                    </div>

                </div>
            </div>
            

        </header>
    `;
};
