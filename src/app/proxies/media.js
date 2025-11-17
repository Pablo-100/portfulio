import websites from "../consts/websites"


export default {
    get(target, name) {
        if (name === "emailRaw") 
            return target.email
        
        if (name === "telegram") return `https://${websites.telegram}${target.telegram.id}`
        if (name === "telegramTag") return target.telegram.id

        return `${name === "email" ? "" : "https://"}${websites[name] ?? ""}${target[name]}`
    }
}