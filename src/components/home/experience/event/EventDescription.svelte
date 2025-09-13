<script lang="ts">
    import { calcLengthInYearsAndMonths } from '../../../../lib/utils.ts'

    interface Props {
        dateFrom: Date
        dateTo: Date | null | undefined
    }

    let { dateFrom, dateTo }: Props = $props()
</script>

{calcLengthInYearsAndMonths(dateFrom, dateTo ?? new Date())}
