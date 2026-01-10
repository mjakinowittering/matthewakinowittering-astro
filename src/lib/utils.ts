export function calcLengthInYears(dateFrom: Date, dateTo: Date) {
    const diffInMonths =
        dateTo.getMonth() -
        dateFrom.getMonth() +
        1 +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear())

    const years = Math.floor(diffInMonths / 12)

    const yearSuffix = years > 1 ? '+ years' : ' year'

    return `${years}${yearSuffix}`
}

export function calcLengthInYearsAndMonths(dateFrom: Date, dateTo: Date) {
    const diffInMonths =
        dateTo.getMonth() -
        dateFrom.getMonth() +
        1 +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear())

    const years = Math.floor(diffInMonths / 12)
    const months = diffInMonths - years * 12

    const monthSuffix = months > 1 ? 'months' : 'month'
    const yearSuffix = years > 1 ? 'years' : 'year'

    return months > 0 ? `${years} ${yearSuffix} ${months} ${monthSuffix}` : `${years} ${yearSuffix}`
}
