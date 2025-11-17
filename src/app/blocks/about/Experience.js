export default (work, education) => {
    const listWork = Array.isArray(work) ? work : [];
    const listEducation = Array.isArray(education) ? education : [];
    return /*html*/ `
        <section class="experience">
            <h2 class="h2">Work Experience</h2>
            <div class="experience__list">
                ${listWork
                    .map((w) => {
                        const highlights = Array.isArray(w.highlights) ? w.highlights : [];
                        return /*html*/`
                        <article class="experience__item">
                            <div class="experience__company"><strong>${w.company}</strong> — ${w.title}</div>
                            <div class="experience__dates">${w.start} — ${w.end}</div>
                            <p class="experience__description">${w.description}</p>
                            <ul class="experience__highlights">
                                ${highlights.map(h => `<li>${h}</li>`).join("")}
                            </ul>
                        </article>
                        `})
                    .join("")}
            </div>
            
            <h2 class="h2">Education</h2>
            <div class="education__list">
                ${listEducation.map(e => /*html*/`
                    <article class="education__item">
                        <div class="education__school"><strong>${e.school}</strong> — ${e.degree}</div>
                        <div class="education__dates">${e.start} — ${e.end}</div>
                    </article>
                `).join("")}
            </div>
        </section>
    `;
};