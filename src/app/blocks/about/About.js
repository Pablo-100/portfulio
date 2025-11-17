export default (t) => {
    return /*html*/`
        <section class="about">
            <div class="about__illustrations">
                <picture>
                    <source srcset="/images/about--me.png" type="image/webp">
                    <img src="/images/about--me.png" alt="About image" class="about__image" loading="lazy" decoding="async">
                </picture>
            </div>
            <div class="about__text">
                ${Array.isArray(t.description) ? t.description.map(text => /*html*/`
                    <p class="about__description">${text}</p>
                `).join("") : ""}
            </div>
        </section>
    `
}