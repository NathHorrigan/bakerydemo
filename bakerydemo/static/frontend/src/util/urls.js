export const baseUrl = (process.env.GATSBY_WAGTAIL_URL) ? (process.env.GATSBY_WAGTAIL_URL) : 'http://localhost:8000'

export const getMediaUrl = url => (process.env.GATSBY_WAGTAIL_URL) ? url : `${baseUrl}${url}`

export function parseDate(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date(date);
    const day = d.getDay();
    const year = d.getFullYear();
    const month = monthNames[d.getMonth()];
    return `${month} ${day}, ${year}`
}
