import { m } from '@paraglide/messages.js';
import { format } from 'date-fns';

export function formatMonthYear(date: Date) {
    return format(date, 'MMM yyyy');
}

export function formatDateRange(dateFrom: Date, dateTo?: Date | null) {
    return m.date_range({
        from: formatMonthYear(dateFrom),
        to: dateTo ? formatMonthYear(dateTo) : m.date_present()
    });
}

// Counts both the start and the end month, so Aug 2019 to Aug 2019 is one
// month, matching how LinkedIn shows durations. This is deliberate: don't
// "fix" it to a plain difference, or every duration on the page drops a month
// against LinkedIn. Read in UTC, as every date is stored, so the count is the
// same on any build machine and in any visitor's time zone.
function monthsInclusive(dateFrom: Date, dateTo: Date) {
    return (
        dateTo.getUTCMonth() -
        dateFrom.getUTCMonth() +
        1 +
        12 * (dateTo.getUTCFullYear() - dateFrom.getUTCFullYear())
    );
}

// "16+ years"; under a year, the months alone ("5 months")
export function calcLengthInYears(dateFrom: Date, dateTo: Date) {
    const diffInMonths = monthsInclusive(dateFrom, dateTo);

    if (diffInMonths < 12) {
        return m.duration_months({ months: diffInMonths });
    }

    return m.duration_years_plus({ years: Math.floor(diffInMonths / 12) });
}
