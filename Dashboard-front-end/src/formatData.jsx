export function formatDate(data) {
    data.map((session, i) => session.day = i + 1)
}
export function formatNutrients(data) {

    return Object.fromEntries(Object.entries(data).map(([k, v]) => {

        k = k.slice(0, k.length - 5)
        k += k.endsWith("e") ? "s" : "es"
        k = k[0].toUpperCase() + k.slice(1)

        v = v.toLocaleString('en')
        v += k == "Calories" ? "kCal" : "g"

        return ([k, v])
    }))
}

export function formatDay(data) {
    const days = ["L", "M", "M", "J", "V", "S", "D"]
    data.map((session, i) => session.day = days[i])
}

export function formatPerformance(performance) {
    const frK = ["cardio", "énergie", "endurance", "force", "vitesse", "intensité"]
    const kind = performance.kind
    Object.keys(kind).map((k,i) => kind[k] = frK[i])
    performance.data.map((obj, i) => obj.kind = kind[i+1])
}