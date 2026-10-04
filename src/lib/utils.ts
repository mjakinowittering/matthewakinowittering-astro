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

export function calcLengthInYears(dateFrom: Date, dateTo: Date) {
    const diffInMonths =
        dateTo.getMonth() -
        dateFrom.getMonth() +
        1 +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear());

    const years = Math.floor(diffInMonths / 12);

    return m.duration_years_plus({ years });
}

export function calcLengthInYearsAndMonths(dateFrom: Date, dateTo: Date) {
    const diffInMonths =
        dateTo.getMonth() -
        dateFrom.getMonth() +
        1 +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear());

    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths - years * 12;

    return months > 0
        ? m.duration_years_months({
              years: m.duration_years({ years }),
              months: m.duration_months({ months })
          })
        : m.duration_years({ years });
}
