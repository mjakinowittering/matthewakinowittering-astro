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
// against LinkedIn.
function monthsInclusive(dateFrom: Date, dateTo: Date) {
    return (
        dateTo.getMonth() -
        dateFrom.getMonth() +
        1 +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear())
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

// "2 years 3 months", "2 years" or "5 months", never "0 years 5 months"
export function calcLengthInYearsAndMonths(dateFrom: Date, dateTo: Date) {
    const diffInMonths = monthsInclusive(dateFrom, dateTo);

    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;

    if (years === 0) {
        return m.duration_months({ months });
    }

    if (months === 0) {
        return m.duration_years({ years });
    }

    return m.duration_years_months({
        years: m.duration_years({ years }),
        months: m.duration_months({ months })
    });
}
