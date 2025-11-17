export default (certs) => {
    // guard against missing data
    const list = Array.isArray(certs) ? certs : [];
    return /*html*/ `
        <section class="certifications">
            <h2 class="h2">Certifications</h2>
            <div class="cert__list">
                ${list.map(c => /*html*/`
                    <article class="cert">
                        <div class="cert__title">${c.title}</div>
                        <div class="cert__meta">${c.issuer} — ${c.year}${c.issued ? ` (${c.issued})` : ''}</div>
                    </article>
                `).join("")}
            </div>
        </section>
    `;
};