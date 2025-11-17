import MediaIcon from "./MediaIcon";
import media from "@/consts/media";
import me from "@/consts/me";

export default (t) => {
    return /*html*/ `
        <footer class="footer">
            <div class="container">
                <div class="footer__inner">
                    <div class="footer__info">
                            <div class="footer__header">
                            <div class="logo">
                                <img src="/images/logo.svg" alt="logo" class="logo__img">
                                <div class="logo__name">Mustapha Amine</div>
                            </div>
                                <a class="footer__email" href="${me.contact?.social?.email?.url ?? media.email}">${me.contact?.email ?? media.emailRaw}</a>
                        </div>

                        <p class="footer__description">${t.description}</p>
                    </div>
                    <div class="footer__media">
                        <div class="footer__title">${t.media}</div>
                        <div class="footer__list">
                            ${Object.values(me.contact?.social ?? {})
                                .filter(s => s.navbar)
                                .map(s => /*html*/ `<a href="${s.url}" class="media"><img src="/images/icons/${s.icon}.svg" alt="${s.name}" class="media__icon"/></a>`)
                                .join("")}
                        </div>
                    </div>
                </div>
                <div class="footer__copyright">© ${t.copyright}</div>
            </div>

        </footer>
    `;
};
