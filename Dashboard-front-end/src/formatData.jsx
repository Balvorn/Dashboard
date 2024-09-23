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