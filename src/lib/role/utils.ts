export function calcLengthOfService(dateFrom: Date, dateTo: Date) {
    const diffInMonths =
        dateTo.getMonth() -
        dateFrom.getMonth() +
        1 +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear())

    const years = Math.floor(diffInMonths / 12)
    const months = diffInMonths - years * 12

    const monthSuffix = months > 1 ? 'mos' : 'mo'
    const yearSuffix = years > 1 ? 'yrs' : 'yr'

    return months > 0 ? `${years} ${yearSuffix} ${months} ${monthSuffix}` : `${years} ${yearSuffix}`
}
