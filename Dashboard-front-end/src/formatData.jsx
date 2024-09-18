export function formatDate(data) {
    data.map((session, i) => session.day = i + 1)
}
