<script lang="ts">
    import type { CollectionEntry } from 'astro:content'

    import { ExternalLink } from '@lucide/svelte'

    import { format } from 'date-fns'

    import { calcLengthInYearsAndMonths } from '../../../../lib/utils.ts'

    interface Props {
        event: CollectionEntry<'events'>
        organisation: CollectionEntry<'organisations'>
    }

    let { event, organisation }: Props = $props()

    const isActive = (
        event: CollectionEntry<'events'>,
        organisation: CollectionEntry<'organisations'>
    ) => {
        return !event.data?.dateTo && organisation.data.type === 'employer' ? true : false
    }

    const description = (
        event: CollectionEntry<'events'>,
        organisation: CollectionEntry<'organisations'>
    ) => {
        if (organisation.data.type === 'trainer') {
            return format(event.data.dateFrom, 'MMM yyyy')
        }

        if (organisation.data.type === 'employer' || organisation.data.type === 'university') {
            const dateFrom = format(event.data.dateFrom, 'MMM yyyy')
            const dateTo = event.data.dateTo ? format(event.data.dateTo, 'MMM yyyy') : 'Present'
            const duration = calcLengthInYearsAndMonths(
                event.data.dateFrom,
                event.data.dateTo ?? new Date()
            )
            return `${dateFrom} - ${dateTo} · ${duration}`
        }
    }
</script>

<div class="flex">
    <div
        class=":bg-neutral-700 relative w-8 after:absolute after:start-4 after:top-7 after:bottom-2 after:w-px after:bg-gray-300 last:after:hidden"
    >
        <div class="relative z-10 flex size-8 items-center justify-center">
            <div class="relative z-10 flex size-8 items-center justify-center">
                <span class="relative flex size-3">
                    {#if isActive(event, organisation)}
                        <span
                            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-600"
                        ></span>
                    {/if}
                    <span class="relative inline-flex size-3 rounded-full bg-amber-600"></span>
                </span>
            </div>
        </div>
    </div>

    <div class="grow pt-0.5 pb-8">
        <h5 class="flex text-lg font-semibold tracking-tight text-gray-900">
            {#if event.data.uri}
                <a class="space-x-1" href={event.data.uri} target="_blank">
                    <span class="hover:underline">{event.data.title}</span>
                    <ExternalLink class="inline h-4 w-4" />
                </a>
            {:else}
                {event.data.title}
            {/if}
        </h5>
        <p class="mt-2 text-sm text-gray-500">
            {description(event, organisation)}
        </p>
    </div>
</div>
