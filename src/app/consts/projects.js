/**
 * @type {import("../../types/Project").Project[]}
 */
const projects = [
    {
        id: "VOC---Vulnerability-Intelligence-Dashboard",
        links: {
            github: "Pablo-100/VOC---Vulnerability-Intelligence-Dashboard"
        },
        techs: ["python", "node", "chartjs"],
        hasImage: true,
        // add an 'images' array to use multiple images / gallery
        // place image files in src/assets/images/projects/VOC---Vulnerability-Intelligence-Dashboard/
        // e.g. src/assets/images/projects/VOC---Vulnerability-Intelligence-Dashboard/1.webp
        images: ["VOCVulnerability-Intelligence Dashboard.png", "1.webp", "2.webp"],
    },
    {
        id: "task_manegemnt_sys",
        links: {
            github: "Pablo-100/task_manegemnt_sys"
        },
        images: ["task_manegemnt_sys.png"],
        techs: ["php", "mysql", "html", "css", "js"],
        hasImage: true,
    },
    {
        id: "synf_project",
        links: {
            github: "Pablo-100/synf_project"
        },
        images: ["synf_project.png"],
        techs: ["php", "symfony", "twig"],
        hasImage: true,
    },
    {
        id: "LunaChat---Chatbot",
        links: {
            github: "Pablo-100/LunaChat---Chatbot"
        },
        images: ["Luna chat bot.png"],
        techs: ["javascript", "node", "python"],
        hasImage: true
    },
    {
        id: "Plane_Management_Sys",
        links: {
            github: "Pablo-100/Plane_Management_Sys"
        },
        images: ["Plane_Management_Sys.png"],
        techs: ["java"],
        hasImage: true,
    },
];

export default projects;
